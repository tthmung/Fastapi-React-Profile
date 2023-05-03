import os
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from typing import Optional

class ExperienceModel(BaseModel):
    title: str
    startDate: datetime
    endDate: Optional[datetime]
    description: str
    img: str

class ProjectModel(BaseModel):
    title: str
    startDate: datetime
    description: str
    img: str
