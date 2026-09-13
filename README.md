# NBA Playoff Predictor

NBA playoff predictor that lets you choose the Round 1 matchups and predicts the rest of the playoffs.

# How it works:
1. Choose the teams for each Round 1 matchup.
2. Click **Predict Playoffs**.
3. The program predicts the winners for each round.
4. At the end, it predicts the NBA Champion. 🏆

## Built With

- Python
- FastAPI
- HTML
- CSS
- JavaScript
- nba_api

## How To Run

Clone the repository:

    git clone https://github.com/AmayB/NBA-Playoff-Predictor.git

Go into the project folder:

    cd NBA-Playoff-Predictor

Install the required packages:

    pip install fastapi uvicorn nba_api

Start the backend:

    uvicorn main:app --reload

Then open this in your browser:

    http://127.0.0.1:8000

## Project Structure

    nba-playoff-predictor/
    ├── main.py
    ├── nba_data.py
    └── frontend/
        ├── index.html
        ├── style.css
        └── script.js

## Created By

Amay Bhardwaj
