from pydantic import BaseModel, Field
from datetime import datetime
from bson import ObjectId
from models.objectID import PyObjectId
from typing import Union



# Project model for adding
class ProjectModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: str = Field(...)
    orderDate: datetime = datetime.now()  # This is for ordering
    description: str = Field(...)
    img: str = Field(...)
    link: Union[str, None] = None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "title": "PorjectTitle",
                "orderDate": "2021-08-01T00:00:00",
                "description": "I work as software developer",
                "img": "123456789.png",
                "link": "https://localhost",
            }
        }


# project model for updating
class UpdateProjectModel(BaseModel):
    title: str = Field(...)
    orderDate: datetime = datetime.now()  # This is for ordering
    description: str = Field(...)
    img: str = Field(...)
    link: Union[str, None] = None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "title": "title",
                "orderDate": "2021-08-01T00:00:00",
                "description": "I work as software developer",
                "img": "123.png",
                "link": "https://localhost",
            }
        }
