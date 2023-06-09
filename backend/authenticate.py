from fastapi import HTTPException, status, Request
from jose import jwt

from models.token import TokenData

from config import SECRET_KEY, ALGORITHM, pwd_context, admin_user, admin_pass


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


async def get_current_user(request: Request):
    access_token = request.cookies.get("access_token")
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except Exception:
        raise credentials_exception
    user = get_admin(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user
