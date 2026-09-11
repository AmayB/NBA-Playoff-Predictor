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
def predict_winner(team1, team2):
    stats1 = get_team_stats(team1)
    stats2 = get_team_stats(team2)

    if stats1 is None or stats2 is None:
        return None

    score1 = 0
    score2 = 0

    # Win percentage
    if stats1["W_PCT"] > stats2["W_PCT"]:
        score1 += 3
    else:
        score2 += 3

    # Points per game
    if stats1["PTS"] > stats2["PTS"]:
        score1 += 2
    else:
        score2 += 2

    # Rebounds
    if stats1["REB"] > stats2["REB"]:
        score1 += 1
    else:
        score2 += 1

    # Assists
    if stats1["AST"] > stats2["AST"]:
        score1 += 1
    else:
        score2 += 1

    if score1 > score2:
        winner = team1
    else:
        winner = team2

    return {
        "winner": winner,
        "team1_score": score1,
        "team2_score": score2
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