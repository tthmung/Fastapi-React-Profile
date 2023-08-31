from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import dotenv_values
from pathlib import Path
from passlib.context import CryptContext
import certifi


env = dotenv_values(".env")

# Mongo DB connection
#This config is not recommended for actual real solution this is just portfolio for demonstration only so no real threats
client = MongoClient(env["DATABASE_URL"], server_api=ServerApi("1"), tlsCAFile=certifi.where())
experience_collection = client["FARM_Profile"]["Experiences"]
project_collection = client["FARM_Profile"]["Projects"]


# Allowed origins
origins = ["http://localhost:3000", "https://tthmung.com", "https://www.tthmung.com"]

# Login
SECRET_KEY = env["SECRET_KEY"]
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Admin
admin_user = env["ADMIN_USER"]
admin_pass = pwd_context.encrypt(env["ADMIN_PASSWORD"])

# Media (Upload)
root = f"{Path().absolute()}/media/"

# Production
secure = True if env["IS_PRODUCTION"] == "True" else False
