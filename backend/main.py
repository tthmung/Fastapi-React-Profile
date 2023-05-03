from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import dotenv_values

env = dotenv_values(".env")

client = MongoClient(env["URI"], server_api=ServerApi('1'))
experience_collection = client["FARM_Profile"]["Experiences"]
project_collection = client["FARM_Profile"]["Projects"]

app = FastAPI()

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

@app.get("/")
async def root():
    try:
        client.admin.command('ping')
        return {"message": "Pinged your deployment. You successfully connected to MongoDB!"}
    except Exception as e:
        return {"message": e}



@app.get("/experience")
async def experience():
    return {""}

@app.get("/project")
async def project():
    return {""}


@app.post("/login")
async def login():
    return

@app.post("/new/experience")
async def createExperience():
    return

@app.post("/new/project")
async def createProject():
    return

@app.put("/update/experience")
async def updateExperience():
    return

@app.put("/update/project")
async def updateProject():
    return
