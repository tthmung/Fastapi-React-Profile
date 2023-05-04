from fastapi import FastAPI, Body, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import Response, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import dotenv_values
from model import *

env = dotenv_values(".env")

client = MongoClient(env["URI"], server_api=ServerApi('1'))
experience_collection = client["FARM_Profile"]["Experiences"]
project_collection = client["FARM_Profile"]["Projects"]

app = FastAPI(docs_url="/api/docs", openapi_url="/api")

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/test")
async def root():
    try:
        client.admin.command('ping')
        return {"message": "Pinged your deployment. You successfully connected to MongoDB!"}
    except Exception as e:
        return {"message": e}



@app.get("/api/experience")
async def experience():
    return {""}

@app.get("/api/project")
async def project():
    return {""}


@app.post("/api/login")
async def login():
    return

@app.post("/api/new/experience", response_description="add new experience", response_model=ExperienceModel)
async def createExperience(experience: ExperienceModel = Body(...)):
    experience = jsonable_encoder(experience)
    new_experience = await experience_collection.insert_one(experience)
    created_experience = await experience_collection.find_one({"_id": new_experience.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_experience)

@app.post("/api/new/project", response_description="add new project", response_model=ProjectModel)
async def createProject():
    return

@app.put("/api/update/experience")
async def updateExperience():
    return

@app.put("/api/update/project")
async def updateProject():
    return
