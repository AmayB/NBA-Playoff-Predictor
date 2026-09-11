from nba_api.stats.endpoints import leaguedashteamstats


# Get NBA team statistics
stats = leaguedashteamstats.LeagueDashTeamStats(
    season="2025-26",
    season_type_all_star="Regular Season"
)

data = stats.get_data_frames()[0]


# Find a team's statistics
def get_team_stats(team_name):
    name_fixes = {
        "Los Angeles Clippers": "LA Clippers",
        "Los Angeles Lakers": "Los Angeles Lakers",
        "New York Knicks": "New York Knicks",
        "Golden State Warriors": "Golden State Warriors",
        "Oklahoma City Thunder": "Oklahoma City Thunder",
    }

    api_name = name_fixes.get(team_name, team_name)

    team_row = data[data["TEAM_NAME"] == api_name]

    if team_row.empty:
        return None

    return team_row.iloc[0]


# Predict which team is stronger
def predict_winner(team1_name, team2_name):
    team1 = get_team_stats(team1_name)
    team2 = get_team_stats(team2_name)

    if team1 is None or team2 is None:
        return None

    team1_score = (
        (team1["W_PCT"] * 100 * 0.60)
        + (team1["PLUS_MINUS"] * 0.40)
    )

    team2_score = (
        (team2["W_PCT"] * 100 * 0.60)
        + (team2["PLUS_MINUS"] * 0.40)
    )

    total_score = team1_score + team2_score

    team1_probability = team1_score / total_score
    team2_probability = team2_score / total_score

    if team1_score > team2_score:
        winner = team1["TEAM_NAME"]
    else:
        winner = team2["TEAM_NAME"]

    return {
        "winner": winner,
        "team1_probability": team1_probability,
        "team2_probability": team2_probability
    }


# Test the predictor
prediction = predict_winner(
    "Boston Celtics",
    "Golden State Warriors"
)

print("Predicted Winner:", prediction["winner"])
print(
    "Celtics Probability:",
    round(prediction["team1_probability"] * 100, 1),
    "%"
)
print(
    "Warriors Probability:",
    round(prediction["team2_probability"] * 100, 1),
    "%"
)