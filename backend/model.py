import os
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from typing import Optional
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

class ExperienceModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    company: str = Field(...)
    position: str = Field(...)
    startDate: datetime
    endDate: Optional[datetime]
    description: str = Field(...)
    img: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "company": "CompanyName",
                "position": "Software Developer",
                "startDate": "Feb 2023",
                "endDate": "Null",
                "description": "I work as software developer",
                "img": "123456789.png"
            }
        }

class ProjectModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: str = Field(...)
    startDate: datetime # This is for ordering
    description: str = Field(...)
    img: str = Field(...)
    link: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "title": "PorjectTitle",
                "startDate": "Feb 2023",
                "description": "I work as software developer",
                "img": "123456789.png",
                "link": "https://localhost"
            }
        }
