from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from nba_data import predict_winner


app = FastAPI()


WEST_TEAMS = {
    "Dallas Mavericks",
    "Denver Nuggets",
    "Golden State Warriors",
    "Houston Rockets",
    "LA Clippers",
    "Los Angeles Lakers",
    "Memphis Grizzlies",
    "Minnesota Timberwolves",
    "New Orleans Pelicans",
    "Oklahoma City Thunder",
    "Phoenix Suns",
    "Portland Trail Blazers",
    "Sacramento Kings",
    "San Antonio Spurs",
    "Utah Jazz",
}


EAST_TEAMS = {
    "Atlanta Hawks",
    "Boston Celtics",
    "Brooklyn Nets",
    "Charlotte Hornets",
    "Chicago Bulls",
    "Cleveland Cavaliers",
    "Detroit Pistons",
    "Indiana Pacers",
    "Miami Heat",
    "Milwaukee Bucks",
    "New York Knicks",
    "Orlando Magic",
    "Philadelphia 76ers",
    "Toronto Raptors",
    "Washington Wizards",
}


@app.get("/")
def home():
    return FileResponse("index.html")


@app.get("/style.css")
def get_css():
    return FileResponse("style.css", media_type="text/css")


@app.get("/script.js")
def get_javascript():
    return FileResponse("script.js", media_type="application/javascript")


@app.get("/teams/west")
def get_west_teams():
    return sorted(WEST_TEAMS)


@app.get("/teams/east")
def get_east_teams():
    return sorted(EAST_TEAMS)


@app.post("/predict")
def predict(team1: str, team2: str):
    prediction = predict_winner(team1, team2)

    if prediction is None:
        return {
            "error": "One or both teams were not found."
        }

    return prediction