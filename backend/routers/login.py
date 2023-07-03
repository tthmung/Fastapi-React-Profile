from datetime import datetime, timedelta
from typing import Annotated

from fastapi import Depends, HTTPException, status, APIRouter
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt

from models.token import Token
from models.user import User
from authenticate import *

from config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES, secure

router = APIRouter(
    prefix="/api/admin", tags=["admin"], responses={404: {"description": "Not found"}}
)


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@router.post("/login", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user}, expires_delta=access_token_expires
    )
    response = JSONResponse(status_code=status.HTTP_200_OK, content="authenticated")
    response.set_cookie(
        key="access_token", value=f"{access_token}", httponly=True, secure=secure
    )  # set HttpOnly cookie in response
    return response


@router.get("/", response_model=User)
async def check_admin(current_user: Annotated[User, Depends(get_current_user)]):
    return JSONResponse(status_code=status.HTTP_200_OK, content=current_user)


@router.get("/logout")
async def log_out(current_user: User = Depends(get_current_user)):
    response = JSONResponse(status_code=status.HTTP_200_OK, content="Logged out successfully")
    response.delete_cookie(key="access_token")
    return response
