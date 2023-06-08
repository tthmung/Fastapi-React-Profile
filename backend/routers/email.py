from fastapi import APIRouter
from starlette.responses import JSONResponse
from fastapi_mail import FastMail, MessageSchema, MessageType
from fastapi import status
from smtplib import SMTP_SSL
from email.mime.text import MIMEText
from pydantic import BaseModel

from config import mail_conf, env
from models.email import *

router = APIRouter(
    prefix="/api/email",
    tags=["email"],
    responses={404: {"description": "Not found"}}
)

class EmailBody(BaseModel):
    subject: str
    message: str


@router.post("/")
async def simple_send(body: EmailBody) -> JSONResponse:

    try:
        msg = MIMEText(body.message, "plain")
        msg['Subject'] = body.subject
        msg['From'] = f'Denolyrics <{env["MAIL_USER"]}>'
        msg['To'] = env["MAIL_USER"]

        port = 465  # For SSL

        # Connect to the email server
        server = SMTP_SSL("smtp.gmail.com", port)
        server.login(env["MAIL_USER"], env["MAIL_PASSWORD"])

        # Send the email
        server.send_message(msg)
        server.quit()
        return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "email has been sent"})

    except Exception as e:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"Error": e})

