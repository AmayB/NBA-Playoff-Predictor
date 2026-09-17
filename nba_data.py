import requests

API_URL = "https://site.api.espn.com/apis/v2/sports/basketball/nba/standings"

def get_team_stats(team_name):
    response = requests.get(
        API_URL,
        params={
            "region": "us",
            "lang": "en",
            "contentorigin": "espn",
            "season": "2026"
        },
        timeout=15
    )

    response.raise_for_status()

    data = response.json()

    name_fixes = {
        "Los Angeles Clippers": "LA Clippers"
    }

    search_name = name_fixes.get(team_name, team_name)

    for conference in data.get("children", []):
        for entry in conference.get("standings", {}).get("entries", []):
            team = entry.get("team", {})

            if team.get("displayName") == search_name:
                stats = {}

                for stat in entry.get("stats", []):
                    stats[stat["name"]] = stat.get("value")

                return {
                    "W_PCT": float(stats.get("winPercent", 0)),
                    "W": float(stats.get("wins", 0)),
                    "L": float(stats.get("losses", 0))
                }

    return None


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

    # Wins
    if stats1["W"] > stats2["W"]:
        score1 += 2
    else:
        score2 += 2

    # Losses
    if stats1["L"] < stats2["L"]:
        score1 += 1
    else:
        score2 += 1

    # Tiebreaker
    if score1 > score2:
        winner = team1
    elif score2 > score1:
        winner = team2
    else:
        if stats1["W_PCT"] >= stats2["W_PCT"]:
            winner = team1
        else:
            winner = team2

    return {
        "winner": winner,
        "team1_score": score1,
        "team2_score": score2
    }
