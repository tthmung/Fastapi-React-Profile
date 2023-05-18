from fastapi import APIRouter
from fastapi.responses import Response, JSONResponse
from fastapi import  Body, status
from fastapi.encoders import jsonable_encoder
from bson.json_util import dumps
from typing import List
from models.project import ProjectModel
from backend.main import project_collection

router = APIRouter(
    prefix="/api/projects",
    tags=["projects"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_description="List of project", response_model=List[ProjectModel])
async def getProject():
    try:
        project = project_collection.find()
        list_proj = list(project)
        json_data = dumps(list_proj)
        return JSONResponse(status_code=status.HTTP_200_OK, content=json_data)
    except Exception as e:
        print(e)
        return Response(status_code=status.HTTP_400_BAD_REQUEST)

@router.post("/new", response_description="Add new project", response_model=ProjectModel)
async def createProject(project: ProjectModel = Body(...)):
    try:
        project_body = jsonable_encoder(project)
        new_project = await project_collection.insert_one(project_body)
        created_project = await project_collection.find_one({"_id", new_project.inserted_id})
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_project)
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=e)


@router.put("/update", response_description="Update project", response_model=ProjectModel)
async def updateProject():
    return

@router.delete("/delete", response_description="delete project", response_model=ProjectModel)
async def deleteProject():
    return
