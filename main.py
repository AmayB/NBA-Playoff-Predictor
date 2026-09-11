from fastapi import FastAPI
from fastapi.responses import FileResponse
from nba_api.stats.static import teams
from fastapi.staticfiles import StaticFiles

from nba_data import predict_winner

app = FastAPI()
app.mount("/frontend", StaticFiles(directory="frontend"), name="frontend")

@app.get("/")
def home():
    return FileResponse("frontend/index.html")


@app.get("/teams")
def get_teams():
    nba_teams = teams.get_teams()

    team_names = []

    for team in nba_teams:
        team_names.append(team["full_name"])

    return team_names


@app.get("/predict")
def predict(team1: str, team2: str):
    prediction = predict_winner(team1, team2)

    if prediction is None:
        return {"error": "One or both teams were not found."}

    return prediction