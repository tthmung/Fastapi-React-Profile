from fastapi import APIRouter
from routers import projects, experiences, files, email

router = APIRouter()
router.include_router(projects.router)
router.include_router(experiences.router)
router.include_router(files.router)
router.include_router(email.router)
