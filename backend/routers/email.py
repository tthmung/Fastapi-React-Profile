from fastapi import APIRouter
from starlette.responses import JSONResponse
from fastapi import status
from smtplib import SMTP_SSL
from email.mime.text import MIMEText

from config import env
from models.email import EmailBody

router = APIRouter(
    prefix="/api/email",
    tags=["email"],
    responses={404: {"description": "Not found"}}
)

@router.post("/send")
async def send_contact(body: EmailBody) -> JSONResponse:

    try:
        message = f'EMAIL: {body.email}\nNAME: {body.name}\nMESSAGE: {body.message}'
        msg = MIMEText(message, "plain")
        msg['Subject'] = "tthmung contact"
        msg['From'] = env["MAIL_USER"]
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

