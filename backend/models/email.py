from pydantic import BaseModel

class EmailBody(BaseModel):
    email: str
    name: str
    message: str
