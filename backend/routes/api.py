from fastapi import APIRouter
from routers import projects, experiences, files, email, login

router = APIRouter()
router.include_router(projects.router)
router.include_router(experiences.router)
router.include_router(files.router)
router.include_router(email.router)
router.include_router(login.router)
