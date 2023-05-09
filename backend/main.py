from fastapi import FastAPI, Body, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import Response, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import dotenv_values
from typing import List
from bson.json_util import dumps
from model import *

env = dotenv_values(".env")

client = MongoClient(env["URI"], server_api=ServerApi('1'))
experience_collection = client["FARM_Profile"]["Experiences"]
project_collection = client["FARM_Profile"]["Projects"]

app = FastAPI(docs_url="/api/docs", openapi_url="/api", version="0.1.0", debug=True)

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/experience", response_description="List of experiences", response_model=List[ExperienceModel])
async def getExperience():
    try:
        experience = experience_collection.find()
        list_exp = list(experience)
        json_data = dumps(list_exp)
        return JSONResponse(status_code=status.HTTP_200_OK, content=json_data)
    except Exception as e:
        return Response(status_code=status.HTTP_400_BAD_REQUEST)

@app.get("/api/project", response_description="List of project", response_model=List[ProjectModel])
async def getProject():
    try:
        project = project_collection.find()
        list_proj = list(project)
        json_data = dumps(list_proj)
        return JSONResponse(status_code=status.HTTP_200_OK, content=json_data)
    except Exception as e:
        return Response(status_code=status.HTTP_400_BAD_REQUEST)


@app.post("/api/login")
async def login():
    return

@app.post("/api/new/experience", response_description="Add new experience", response_model=ExperienceModel)
async def createExperience(experience: ExperienceModel = Body(...)):
    try:
        experience_body = jsonable_encoder(experience)
        new_experience = await experience_collection.insert_one(experience_body)
        created_experience = await experience_collection.find_one({"_id": new_experience.inserted_id})
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_experience)
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=e)

@app.post("/api/new/project", response_description="Add new project", response_model=ProjectModel)
async def createProject(project: ProjectModel = Body(...)):
    try:
        project_body = jsonable_encoder(project)
        new_project = await project_collection.insert_one(project_body)
        created_project = await project_collection.find_one({"_id", new_project.inserted_id})
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_project)
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=e)

@app.put("/api/update/experience", response_description="Update experience", response_model=ExperienceModel)
async def updateExperience():
    return

@app.put("/api/update/project", response_description="Update project", response_model=ProjectModel)
async def updateProject():
    return
