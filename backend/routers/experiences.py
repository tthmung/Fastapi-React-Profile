from fastapi import APIRouter
from fastapi.responses import Response, JSONResponse
from fastapi import  Body, status
from fastapi.encoders import jsonable_encoder
from bson.json_util import dumps
from typing import List
from models.experience import ExperienceModel
from config import experience_collection

router = APIRouter(
    prefix="/api/experiences",
    tags=["experiences"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_description="List of experiences", response_model=List[ExperienceModel])
async def read_experiences():
    try:
        experience = experience_collection.find()
        list_exp = list(experience)
        json_data = dumps(list_exp)
        return JSONResponse(status_code=status.HTTP_200_OK, content=json_data)
    except Exception as e:
        return Response(status_code=status.HTTP_400_BAD_REQUEST)



@router.post("/new", response_description="Add new experience", response_model=ExperienceModel)
async def create_experience(experience: ExperienceModel = Body(...)):
    try:
        experience_body = jsonable_encoder(experience)
        new_experience = await experience_collection.insert_one(experience_body)
        created_experience = await experience_collection.find_one({"_id": new_experience.inserted_id})
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_experience)
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=e)

@router.put("/update", response_description="Update experience", response_model=ExperienceModel)
async def update_Experience(id: str | None = None, experience: ExperienceModel = Body(...)):
    try:
        experience_body = jsonable_encoder(experience)
        filter = {"_id": id}
        update = {"$set": {key: value for key, value in experience_body.items() if key != "_id"}}
        experience_collection.update_one(filter=filter, update=update)
        return JSONResponse(status_code=status.HTTP_202_ACCEPTED, content="success")
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=e)

@router.delete("/delete", response_description="delete experience", response_model=ExperienceModel)
async def delete_experience(id: str | None = None):
    try:
        deleted_experience = experience_collection.delete_one({"_id": id})
        return JSONResponse(status_code=status.HTTP_202_ACCEPTED, content=deleted_experience.acknowledged)
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=e)
