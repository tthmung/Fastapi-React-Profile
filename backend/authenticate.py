from typing import Annotated

from fastapi import Depends, HTTPException, status
from jose import JWTError, jwt

from models.token import TokenData

from config import (
    SECRET_KEY,
    ALGORITHM,
    pwd_context,
    oauth2_scheme,
    admin_user,
    admin_pass
)

def verify_password(plain_password):
    return pwd_context.verify(plain_password, admin_pass)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_admin(username: str):
    return username if username == admin_user else None


def authenticate_user(username: str, password: str):
    user = get_admin(username)
    if not user:
        return False
    if not verify_password(password):
        return False
    return user


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_admin(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user
