const WEST_TEAMS = [
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
  "Utah Jazz"
];

const EAST_TEAMS = [
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
  "Washington Wizards"
];

const TEAM_STATS = {
  "Atlanta Hawks": { W_PCT: 0.510, PTS: 118.3, REB: 44.7, AST: 25.8 },
  "Boston Celtics": { W_PCT: 0.670, PTS: 120.1, REB: 45.6, AST: 29.4 },
  "Brooklyn Nets": { W_PCT: 0.420, PTS: 112.6, REB: 42.5, AST: 24.1 },
  "Charlotte Hornets": { W_PCT: 0.460, PTS: 106.6, REB: 43.2, AST: 23.2 },
  "Chicago Bulls": { W_PCT: 0.480, PTS: 112.3, REB: 42.8, AST: 24.5 },
  "Cleveland Cavaliers": { W_PCT: 0.600, PTS: 112.6, REB: 42.9, AST: 25.0 },
  "Dallas Mavericks": { W_PCT: 0.610, PTS: 117.9, REB: 45.2, AST: 24.7 },
  "Denver Nuggets": { W_PCT: 0.680, PTS: 114.9, REB: 44.8, AST: 28.8 },
  "Detroit Pistons": { W_PCT: 0.440, PTS: 109.1, REB: 43.5, AST: 23.7 },
  "Golden State Warriors": { W_PCT: 0.560, PTS: 117.8, REB: 46.1, AST: 27.1 },
  "Houston Rockets": { W_PCT: 0.590, PTS: 112.4, REB: 45.7, AST: 24.8 },
  "Indiana Pacers": { W_PCT: 0.580, PTS: 123.3, REB: 40.7, AST: 29.1 },
  "LA Clippers": { W_PCT: 0.540, PTS: 115.6, REB: 44.2, AST: 25.8 },
  "Los Angeles Lakers": { W_PCT: 0.580, PTS: 118.0, REB: 45.5, AST: 25.7 },
  "Memphis Grizzlies": { W_PCT: 0.570, PTS: 105.9, REB: 52.4, AST: 25.6 },
  "Miami Heat": { W_PCT: 0.520, PTS: 110.1, REB: 42.4, AST: 24.4 },
  "Milwaukee Bucks": { W_PCT: 0.650, PTS: 119.0, REB: 48.8, AST: 25.3 },
  "Minnesota Timberwolves": { W_PCT: 0.620, PTS: 113.7, REB: 46.3, AST: 27.3 },
  "New Orleans Pelicans": { W_PCT: 0.500, PTS: 115.6, REB: 44.9, AST: 24.9 },
  "New York Knicks": { W_PCT: 0.610, PTS: 112.8, REB: 48.1, AST: 25.5 },
  "Oklahoma City Thunder": { W_PCT: 0.660, PTS: 120.1, REB: 42.5, AST: 29.1 },
  "Orlando Magic": { W_PCT: 0.520, PTS: 108.8, REB: 45.0, AST: 22.9 },
  "Philadelphia 76ers": { W_PCT: 0.550, PTS: 114.6, REB: 43.6, AST: 25.7 },
  "Phoenix Suns": { W_PCT: 0.560, PTS: 116.2, REB: 42.8, AST: 26.2 },
  "Portland Trail Blazers": { W_PCT: 0.470, PTS: 106.4, REB: 43.9, AST: 21.7 },
  "Sacramento Kings": { W_PCT: 0.530, PTS: 116.6, REB: 43.5, AST: 27.2 },
  "San Antonio Spurs": { W_PCT: 0.460, PTS: 112.1, REB: 45.0, AST: 22.8 },
  "Toronto Raptors": { W_PCT: 0.490, PTS: 112.7, REB: 44.3, AST: 23.6 },
  "Utah Jazz": { W_PCT: 0.430, PTS: 115.6, REB: 39.8, AST: 24.1 },
  "Washington Wizards": { W_PCT: 0.410, PTS: 114.2, REB: 41.8, AST: 23.1 }
};

const teamLogos = {
  "Atlanta Hawks": "atlanta-hawks.png",
  "Boston Celtics": "boston-celtics.png",
  "Brooklyn Nets": "brooklyn-nets.png",
  "Charlotte Hornets": "charlotte-hornets.png",
  "Chicago Bulls": "chicago-bulls.png",
  "Cleveland Cavaliers": "cleveland-cavaliers.png",
  "Dallas Mavericks": "dallas-mavericks.png",
  "Denver Nuggets": "denver-nuggets.png",
  "Detroit Pistons": "detroit-pistons.png",
  "Golden State Warriors": "golden-state-warriors.png",
  "Houston Rockets": "houston-rockets.png",
  "Indiana Pacers": "indiana-pacers.png",
  "LA Clippers": "la-clippers.png",
  "Los Angeles Lakers": "los-angeles-lakers.png",
  "Memphis Grizzlies": "memphis-grizzlies.png",
  "Miami Heat": "miami-heat.png",
  "Milwaukee Bucks": "milwaukee-bucks.png",
  "Minnesota Timberwolves": "minnesota-timberwolves.png",
  "New Orleans Pelicans": "new-orleans-pelicans.png",
  "New York Knicks": "new-york-knicks.png",
  "Oklahoma City Thunder": "oklahoma-city-thunder.png",
  "Orlando Magic": "orlando-magic.png",
  "Philadelphia 76ers": "philadelphia-76ers.png",
  "Phoenix Suns": "phoenix-suns.png",
  "Portland Trail Blazers": "portland-trail-blazers.png",
  "Sacramento Kings": "sacramento-kings.png",
  "San Antonio Spurs": "san-antonio-spurs.png",
  "Toronto Raptors": "toronto-raptors.png",
  "Utah Jazz": "utah-jazz.png",
  "Washington Wizards": "washington-wizards.png"
};

function getTeamLogoUrl(teamName) {
  return teamLogos[teamName] ? `./frontend/assets/${teamLogos[teamName]}` : "";
}

function fillDropdowns(dropdowns, teams) {
  dropdowns.forEach((dropdown) => {
    dropdown.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Choose team";
    dropdown.appendChild(defaultOption);

    teams.forEach((team) => {
      const option = document.createElement("option");
      option.value = team;
      option.textContent = team;
      dropdown.appendChild(option);
    });
  });
}

function addTeamLogos() {
  document.querySelectorAll(".team").forEach((dropdown) => {
    const wrapper = document.createElement("div");
    const logo = document.createElement("img");
    const button = document.createElement("button");
    const options = document.createElement("div");

    wrapper.className = "team-select custom-select";
    logo.className = "team-logo";
    logo.alt = "";
    logo.hidden = true;
    button.className = "team-trigger";
    button.type = "button";
    button.textContent = "Choose team";
    options.className = "team-options";

    dropdown.parentNode.insertBefore(wrapper, dropdown);
    wrapper.append(logo, button, options, dropdown);
    dropdown.classList.add("team-native");

    Array.from(dropdown.options).forEach((option) => {
      const optionButton = document.createElement("button");
      const optionLogo = document.createElement("img");

      optionButton.className = "team-option";
      optionButton.type = "button";
      optionButton.dataset.value = option.value;
      optionLogo.className = "team-option-logo";
      optionLogo.alt = "";
      optionLogo.hidden = !teamLogos[option.value];

      if (teamLogos[option.value]) {
        optionLogo.src = getTeamLogoUrl(option.value);
      }

      optionButton.append(optionLogo, document.createTextNode(option.textContent));
      options.appendChild(optionButton);

      optionButton.addEventListener("click", () => {
        dropdown.value = option.value;
        dropdown.dispatchEvent(new Event("change", { bubbles: true }));
        wrapper.classList.remove("open");
      });
    });

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      document.querySelectorAll(".custom-select.open").forEach((select) => {
        if (select !== wrapper) {
          select.classList.remove("open");
        }
      });
      wrapper.classList.toggle("open");
    });
  });

  document.querySelectorAll(".conference").forEach(refreshTeamOptions);

  document.addEventListener("click", () => {
    document.querySelectorAll(".custom-select.open").forEach((select) => {
      select.classList.remove("open");
    });
  });
}

function refreshTeamOptions(conference) {
  if (!conference) return;

  const selectedTeams = new Set(
    Array.from(conference.querySelectorAll(".team"))
      .map((dropdown) => dropdown.value)
      .filter(Boolean)
  );

  conference.querySelectorAll(".custom-select").forEach((wrapper) => {
    wrapper.querySelectorAll(".team-option").forEach((option) => {
      const isSelected = option.dataset.value && selectedTeams.has(option.dataset.value);
      option.hidden = isSelected;
      option.style.display = isSelected ? "none" : "";
    });
  });
}

function updateTeamLogo(dropdown) {
  const logo = dropdown.parentNode.querySelector(".team-logo");
  const trigger = dropdown.parentNode.querySelector(".team-trigger");
  const logoName = teamLogos[dropdown.value];

  if (!logo || !trigger) return;

  logo.hidden = !logoName;
  logo.src = getTeamLogoUrl(dropdown.value);
  logo.alt = logoName ? `${dropdown.value} logo` : "";
  trigger.textContent = dropdown.value || "Choose team";
}

function checkDuplicateTeams(changedDropdown) {
  if (changedDropdown.value === "") return;

  const matchup = changedDropdown.closest(".matchup");
  if (!matchup) return;

  const dropdowns = matchup.querySelectorAll(".team");
  let count = 0;

  dropdowns.forEach((dropdown) => {
    if (dropdown.value === changedDropdown.value) count += 1;
  });

  if (count > 1) {
    alert(`${changedDropdown.value} is already selected in this matchup.`);
    changedDropdown.value = "";
  }
}

function predictMatchup(team1, team2) {
  if (!team1 || !team2) return null;

  const stats1 = TEAM_STATS[team1];
  const stats2 = TEAM_STATS[team2];

  if (!stats1 || !stats2) return null;

  let score1 = 0;
  let score2 = 0;

  if (stats1.W_PCT > stats2.W_PCT) score1 += 3;
  else score2 += 3;

  if (stats1.PTS > stats2.PTS) score1 += 2;
  else score2 += 2;

  if (stats1.REB > stats2.REB) score1 += 1;
  else score2 += 1;

  if (stats1.AST > stats2.AST) score1 += 1;
  else score2 += 1;

  if (score1 > score2) return team1;
  if (score2 > score1) return team2;

  return stats1.W_PCT >= stats2.W_PCT ? team1 : team2;
}

async function predictRound1() {
  const westTeams = document.querySelectorAll(".west-team");
  const eastTeams = document.querySelectorAll(".east-team");
  const westWinners = document.querySelectorAll(".west-winner");
  const eastWinners = document.querySelectorAll(".east-winner");

  const westWinnerTeams = [];
  const eastWinnerTeams = [];

  for (let i = 0; i < westTeams.length; i += 2) {
    const team1 = westTeams[i].value;
    const team2 = westTeams[i + 1].value;

    if (!team1 || !team2) {
      alert("Please choose both teams for every Western Conference matchup.");
      return null;
    }

    const winner = predictMatchup(team1, team2);
    westWinners[i / 2].textContent = winner || "Error";
    westWinnerTeams.push(winner);
  }

  for (let i = 0; i < eastTeams.length; i += 2) {
    const team1 = eastTeams[i].value;
    const team2 = eastTeams[i + 1].value;

    if (!team1 || !team2) {
      alert("Please choose both teams for every Eastern Conference matchup.");
      return null;
    }

    const winner = predictMatchup(team1, team2);
    eastWinners[i / 2].textContent = winner || "Error";
    eastWinnerTeams.push(winner);
  }

  return { west: westWinnerTeams, east: eastWinnerTeams };
}

async function predictRound2(round1Winners) {
  const westRound2Boxes = document.querySelectorAll(".west-round2");
  const eastRound2Boxes = document.querySelectorAll(".east-round2");
  const westRound2Winners = document.querySelectorAll(".west-round2-winner");
  const eastRound2Winners = document.querySelectorAll(".east-round2-winner");

  const westWinners = [];
  const eastWinners = [];

  for (let i = 0; i < 4; i += 2) {
    westRound2Boxes[i].textContent = round1Winners.west[i];
    westRound2Boxes[i + 1].textContent = round1Winners.west[i + 1];

    const winner = predictMatchup(round1Winners.west[i], round1Winners.west[i + 1]);
    westRound2Winners[i / 2].textContent = winner || "Error";
    westWinners.push(winner);
  }

  for (let i = 0; i < 4; i += 2) {
    eastRound2Boxes[i].textContent = round1Winners.east[i];
    eastRound2Boxes[i + 1].textContent = round1Winners.east[i + 1];

    const winner = predictMatchup(round1Winners.east[i], round1Winners.east[i + 1]);
    eastRound2Winners[i / 2].textContent = winner || "Error";
    eastWinners.push(winner);
  }

  return { west: westWinners, east: eastWinners };
}

async function predictConferenceFinals(round2Winners) {
  const westBoxes = document.querySelectorAll(".west-conf-finals");
  const eastBoxes = document.querySelectorAll(".east-conf-finals");
  const westWinnerBox = document.querySelector(".west-conf-final-winner");
  const eastWinnerBox = document.querySelector(".east-conf-final-winner");

  westBoxes[0].textContent = round2Winners.west[0];
  westBoxes[1].textContent = round2Winners.west[1];
  const westChampion = predictMatchup(round2Winners.west[0], round2Winners.west[1]);
  westWinnerBox.textContent = westChampion || "Error";

  eastBoxes[0].textContent = round2Winners.east[0];
  eastBoxes[1].textContent = round2Winners.east[1];
  const eastChampion = predictMatchup(round2Winners.east[0], round2Winners.east[1]);
  eastWinnerBox.textContent = eastChampion || "Error";

  return { west: westChampion, east: eastChampion };
}

async function predictFinals(conferenceChampions) {
  const westBox = document.getElementById("west-finals-team");
  const eastBox = document.getElementById("east-finals-team");
  const championBox = document.getElementById("nba-champion");

  westBox.textContent = conferenceChampions.west;
  eastBox.textContent = conferenceChampions.east;

  const champion = predictMatchup(conferenceChampions.west, conferenceChampions.east);
  championBox.textContent = champion ? `${champion} Wins NBA Championship` : "Prediction Error";
}

async function predictPlayoffs() {
  const button = document.getElementById("predictButton");
  button.disabled = true;
  button.textContent = "Predicting...";

  try {
    const round1 = await predictRound1();
    if (!round1) return;

    const round2 = await predictRound2(round1);
    const conferenceChampions = await predictConferenceFinals(round2);
    await predictFinals(conferenceChampions);
  } catch (error) {
    console.error("Playoff prediction error:", error);
    alert("Something went wrong while predicting the playoffs.");
  } finally {
    button.disabled = false;
    button.textContent = "Predict Playoffs";
  }
}

function initializeStaticApp() {
  const westDropdowns = document.querySelectorAll(".west-team");
  const eastDropdowns = document.querySelectorAll(".east-team");

  fillDropdowns(westDropdowns, WEST_TEAMS);
  fillDropdowns(eastDropdowns, EAST_TEAMS);
  addTeamLogos();

  document.querySelectorAll(".team").forEach((dropdown) => {
    dropdown.addEventListener("change", function () {
      checkDuplicateTeams(this);
      updateTeamLogo(this);
      refreshTeamOptions(this.closest(".conference"));
    });
  });

  document.getElementById("predictButton").addEventListener("click", predictPlayoffs);
}

initializeStaticApp();
