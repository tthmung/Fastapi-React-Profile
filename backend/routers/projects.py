from fastapi import APIRouter
from fastapi.responses import Response, JSONResponse
from fastapi import Body, status
from fastapi.encoders import jsonable_encoder
from bson.json_util import dumps
from typing import List
from models.project import *
from config import project_collection

router = APIRouter(
    prefix="/api/projects",
    tags=["projects"],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_description="List of project", response_model=List[ProjectModel])
async def read_projects():
    try:
        project = project_collection.find()
        list_proj = list(project)
        json_data = dumps(list_proj)
        return JSONResponse(status_code=status.HTTP_200_OK, content=json_data)
    except Exception as e:
        print(e)
        return Response(status_code=status.HTTP_400_BAD_REQUEST, content=e)

@router.post("/new", response_description="Add new project", response_model=ProjectModel)
async def create_projects(project: ProjectModel = Body(...)):
    try:
        project_body = jsonable_encoder(project)
        new_project = project_collection.insert_one(project_body)
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=new_project.inserted_id)
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=e)


@router.put("/update", response_description="Update project", response_model=UpdateProjectModel)
async def update_projects(id: str | None = None, project: UpdateProjectModel = Body(...)):
    try:
        project_body = jsonable_encoder(project)
        filter = {"_id": id}
        # Update body contain "_id" so filter that out
        update = {"$set": project_body}
        project_collection.update_one(filter=filter, update=update)
        return JSONResponse(status_code=status.HTTP_202_ACCEPTED, content="success")
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=e)

@router.delete("/delete", response_description="delete project", response_model=ProjectModel)
async def delete_projects(id: str | None = None):
    try:
        deleted_project = project_collection.delete_one({"_id": id})
        return JSONResponse(status_code=status.HTTP_202_ACCEPTED, content=deleted_project.acknowledged)
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=e)
