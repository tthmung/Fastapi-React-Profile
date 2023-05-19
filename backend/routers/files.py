from fastapi import APIRouter, UploadFile, File
from fastapi.responses import Response, JSONResponse
from fastapi import  Body, status
from fastapi.encoders import jsonable_encoder
from bson.json_util import dumps
from datetime import datetime
from config import root
import os

router = APIRouter(
    prefix="/api/files",
    tags=["files"],
    responses={404: {"description": "Not found"}},
)

@router.post("/upload", response_description="Upload a image file")
async def upload_file(file: UploadFile, id: str | None = None):

    try:
        new_filename = generate_new_name(file)
        file_location = f"{root}{id}/{new_filename}"

        # if directory don't exist create a new directory
        os.makedirs(os.path.dirname(file_location), exist_ok=True)

        with open(file_location, "wb") as f:
            f.write(await file.read())

        return JSONResponse(status_code=status.HTTP_201_CREATED, content=new_filename)
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=e)


@router.put("/update", response_description="Update a image file by deleting and reuploading")
async def update_file(file: UploadFile, id: str | None = None, curr_file: str | None = None):
    try:
        # delete existing file first
        os.remove(f"{root}/{id}/{curr_file}")

        new_filename = generate_new_name(file)
        file_location = f"{root}{id}/{new_filename}"

        with open(file_location, "wb") as f:
            f.write(await file.read())

        return JSONResponse(status_code=status.HTTP_202_ACCEPTED, content=new_filename)
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=e)

@router.delete("/delete", response_description="delete a file")
async def delete_file(id: str | None = None, filename: str | None = None):
    try:
        file_location = f"{root}/{id}/{filename}"
        os.remove(file_location)

        # if directory is empty remove it
        if not os.listdir(f"{root}/{id}"):
            os.rmdir(f"{root}/{id}")

        return JSONResponse(status_code=status.HTTP_200_OK, content="File deleted successfully")
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=e)

# Generate a new file name to avoid duplication
def generate_new_name(file: UploadFile):
    # generate a timestamp for unique file name
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    file_extension = os.path.splitext(file.filename)[1]
    new_filename = f"{timestamp}{file_extension}"
    return new_filename
