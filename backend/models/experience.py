from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from bson import ObjectId
from models.objectID import PyObjectId

class ExperienceModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    company: str = Field(...)
    position: str = Field(...)
    startDate: datetime = datetime.now()
    endDate: Optional[datetime] = None
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
                "startDate": "2021-08-01T00:00:00",
                "endDate": "2021-08-01T00:00:00",
                "description": "I work as software developer",
                "img": "123456789.png"
            }
        }
