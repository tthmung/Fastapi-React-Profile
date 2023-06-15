from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import dotenv_values
from pathlib import Path
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer


env = dotenv_values(".env")

# Mongo DB connection
client = MongoClient(env["DATABASE_URL"], server_api=ServerApi('1'))
experience_collection = client["FARM_Profile"]["Experiences"]
project_collection = client["FARM_Profile"]["Projects"]


# Allowed origins
origins = [
    env["CLIENT_ORIGIN"]
]

# Login
SECRET_KEY = env["SECRET_KEY"]
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/admin/token")


# Media (Upload)
root = f"{Path().absolute().parent}/uploads/"
