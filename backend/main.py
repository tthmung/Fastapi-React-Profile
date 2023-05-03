from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/experience")
async def experience():
    return {""}

@app.get("/project")
async def project():
    return {""}


@app.post("/login")
async def login():
    return

@app.post("/new/experience")
async def createExperience():
    return

@app.post("/new/project")
async def createProject():
    return

@app.put("/update/experience")
async def updateExperience():
    return

@app.put("/update/project")
async def updateProject():
    return


if __name__ == "__main__":
    import uvicorn

    # For development only
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")
