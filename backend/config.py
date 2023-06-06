from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import dotenv_values
from pathlib import Path

env = dotenv_values(".env")

# Mongo DB connection
client = MongoClient(env["DATABASE_URL"], server_api=ServerApi('1'))
experience_collection = client["FARM_Profile"]["Experiences"]
project_collection = client["FARM_Profile"]["Projects"]


# Allowed origins
origins = [
    env["CLIENT_ORIGIN"]
]


# Media (Upload)
root = f"{Path().absolute().parent}/uploads/"
