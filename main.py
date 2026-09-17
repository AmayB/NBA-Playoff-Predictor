```python
from functools import lru_cache

from nba_api.stats.endpoints import leaguedashteamstats


SEASON = "2025-26"
SEASON_TYPE = "Regular Season"


@lru_cache(maxsize=1)
def get_team_stats():
    """
    Download the NBA team statistics once and cache the result.

    This function is intentionally NOT called when this file is imported.
    That prevents the FastAPI server from failing to start if stats.nba.com
    is temporarily unavailable.
    """

    stats = leaguedashteamstats.LeagueDashTeamStats(
        season=SEASON,
        season_type_all_star=SEASON_TYPE,
        timeout=120
    )

    return stats.get_data_frames()[0]


def get_team(team_name):
    """
    Find a team in the NBA statistics dataframe.
    """

    data = get_team_stats()

    team = data[data["TEAM_NAME"] == team_name]

    if team.empty:
        return None

    return team.iloc[0]


def calculate_team_score(team):
    """
    Calculate a simple overall team score.

    The score uses several regular-season statistics:
    - Win percentage
    - Points
    - Plus/minus
    - Field-goal percentage
    - Three-point percentage
    - Rebounds
    - Assists
    - Steals
    - Blocks

    Higher score = stronger statistical profile.
    """

    score = (
        float(team["W_PCT"]) * 100
        + float(team["PTS"]) * 0.10
        + float(team["PLUS_MINUS"]) * 0.10
        + float(team["FG_PCT"]) * 100
        + float(team["FG3_PCT"]) * 50
        + float(team["REB"]) * 0.05
        + float(team["AST"]) * 0.05
        + float(team["STL"]) * 0.10
        + float(team["BLK"]) * 0.10
    )

    return score


def predict_winner(team1, team2):
    """
    Compare two NBA teams and return the team with the higher
    statistical score.
    """

    try:
        team1_data = get_team(team1)
        team2_data = get_team(team2)

        if team1_data is None or team2_data is None:
            return None

        team1_score = calculate_team_score(team1_data)
        team2_score = calculate_team_score(team2_data)

        if team1_score >= team2_score:
            winner = team1
        else:
            winner = team2

        return {
            "winner": winner,
            "team1": team1,
            "team2": team2,
            "team1_score": round(team1_score, 2),
            "team2_score": round(team2_score, 2)
        }

    except Exception as error:
        print(f"Prediction error: {error}")
        return None
```
