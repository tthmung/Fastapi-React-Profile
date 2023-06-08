from pydantic import BaseModel, EmailStr
from typing import List

class EmailSchema(BaseModel):
    name: str
    email: List[EmailStr]
    description: str
