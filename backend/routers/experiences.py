from fastapi import APIRouter, Depends, Body, status
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder
from bson.json_util import dumps
from typing import List

from models.experience import *
from models.user import User
from config import experience_collection
from authenticate import get_current_user

router = APIRouter(
    prefix="/api/experiences",
    tags=["experiences"],
    responses={404: {"description": "Not found"}},
)


@router.get(
    "/",
    response_description="List of experiences",
    response_model=List[ExperienceModel],
)
async def read_experiences():
    try:
        experience = experience_collection.find().sort("startDate", -1)
        list_exp = list(experience)
        json_data = dumps(list_exp)
        return JSONResponse(status_code=status.HTTP_200_OK, content=json_data)
    except Exception as e:
        return Response(status_code=status.HTTP_400_BAD_REQUEST, content=e)


@router.post(
    "/new", response_description="Add new experience", response_model=ExperienceModel
)
async def create_experience(current_user: User = Depends(get_current_user), experience: ExperienceModel = Body(...)):
    try:
        experience_body = jsonable_encoder(experience)
        new_experience = experience_collection.insert_one(experience_body)
        return JSONResponse(
            status_code=status.HTTP_201_CREATED, content=new_experience.inserted_id
        )
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=e)


@router.put(
    "/update",
    response_description="Update experience",
    response_model=UpdateExperienceModel,
)
async def update_Experience(
    current_user: User = Depends(get_current_user), id: str | None = None, experience: UpdateExperienceModel = Body(...)
):
    try:
        experience_body = jsonable_encoder(experience)
        filter = {"_id": id}
        # Experience body contain "_id" so filter that out
        update = {"$set": experience_body}
        experience_collection.update_one(filter=filter, update=update)
        return JSONResponse(status_code=status.HTTP_202_ACCEPTED, content="success")
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=e)


@router.delete(
    "/delete", response_description="delete experience", response_model=ExperienceModel
)
async def delete_experience(current_user: User = Depends(get_current_user), id: str | None = None):
    try:
        deleted_experience = experience_collection.delete_one({"_id": id})
        return JSONResponse(
            status_code=status.HTTP_202_ACCEPTED,
            content=deleted_experience.acknowledged,
        )
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=e)
