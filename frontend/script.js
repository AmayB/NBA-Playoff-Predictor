async function loadTeams() {
    try {
        const westResponse = await fetch("/teams/west");
        const eastResponse = await fetch("/teams/east");

        const westTeams = await westResponse.json();
        const eastTeams = await eastResponse.json();

        const westDropdowns = document.querySelectorAll(".west-team");
        const eastDropdowns = document.querySelectorAll(".east-team");

        fillDropdowns(westDropdowns, westTeams);
        fillDropdowns(eastDropdowns, eastTeams);
        addTeamLogos();

        document.querySelectorAll(".team").forEach(dropdown => {
            dropdown.addEventListener("change", function () {
                checkDuplicateTeams(this);
                updateTeamLogo(this);
                refreshTeamOptions(this.closest(".conference"));
            });
        });
    } catch (error) {
        console.error("Could not load NBA teams:", error);
    }
}

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

function addTeamLogos() {
    document.querySelectorAll(".team").forEach(dropdown => {
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

        Array.from(dropdown.options).forEach(option => {
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

        button.addEventListener("click", event => {
            event.stopPropagation();
            document.querySelectorAll(".custom-select.open").forEach(select => {
                if (select !== wrapper) {
                    select.classList.remove("open");
                }
            });
            wrapper.classList.toggle("open");
        });
    });

    document.querySelectorAll(".conference").forEach(refreshTeamOptions);

    document.addEventListener("click", () => {
        document.querySelectorAll(".custom-select.open").forEach(select => {
            select.classList.remove("open");
        });
    });
}

function refreshTeamOptions(conference) {
    if (!conference) {
        return;
    }

    const selectedTeams = new Set(
        Array.from(conference.querySelectorAll(".team"))
            .map(dropdown => dropdown.value)
            .filter(Boolean)
    );

    conference.querySelectorAll(".custom-select").forEach(wrapper => {
        wrapper.querySelectorAll(".team-option").forEach(option => {
            const isSelected =
                option.dataset.value &&
                selectedTeams.has(option.dataset.value);

            option.hidden = isSelected;
            option.style.display = isSelected ? "none" : "";
        });
    });
}

function getTeamLogoUrl(teamName) {
    return teamLogos[teamName]
        ? `/frontend/assets/${teamLogos[teamName]}`
        : "";
}

function updateTeamLogo(dropdown) {
    const logo = dropdown.parentNode.querySelector(".team-logo");
    const trigger = dropdown.parentNode.querySelector(".team-trigger");
    const logoName = teamLogos[dropdown.value];

    if (!logo || !trigger) {
        return;
    }

    logo.hidden = !logoName;
    logo.src = getTeamLogoUrl(dropdown.value);
    logo.alt = logoName
        ? `${dropdown.value} logo`
        : "";
    trigger.textContent = dropdown.value || "Choose team";
}

function fillDropdowns(dropdowns, teams) {
    dropdowns.forEach(dropdown => {
        dropdown.innerHTML = "";

        const defaultOption = document.createElement("option");

        defaultOption.value = "";
        defaultOption.textContent = "Choose team";

        dropdown.appendChild(defaultOption);

        teams.forEach(team => {
            const option = document.createElement("option");

            option.value = team;
            option.textContent = team;

            dropdown.appendChild(option);
        });
    });
}

function checkDuplicateTeams(changedDropdown) {
    if (changedDropdown.value === "") {
        return;
    }

    const matchup = changedDropdown.closest(".matchup");

    if (!matchup) {
        return;
    }

    const dropdowns = matchup.querySelectorAll(".team");

    let count = 0;

    dropdowns.forEach(dropdown => {
        if (dropdown.value === changedDropdown.value) {
            count++;
        }
    });

    if (count > 1) {
        alert(
            changedDropdown.value +
            " is already selected in this matchup."
        );

        changedDropdown.value = "";
    }
}

async function predictMatchup(team1, team2) {
    if (!team1 || !team2) {
        return null;
    }

    try {
        const response = await fetch(
            `/predict?team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}`
        );

        if (!response.ok) {
            console.error(
                "Prediction request failed:",
                response.status
            );

            return null;
        }

        const result = await response.json();

        if (result.error) {
            console.error(
                "Backend prediction error:",
                result.error
            );

            return null;
        }

        return result.winner;
    } catch (error) {
        console.error(
            "Prediction error:",
            error
        );

        return null;
    }
}

async function predictRound1() {
    const westTeams =
        document.querySelectorAll(".west-team");

    const eastTeams =
        document.querySelectorAll(".east-team");

    const westWinners =
        document.querySelectorAll(".west-winner");

    const eastWinners =
        document.querySelectorAll(".east-winner");

    const westWinnerTeams = [];
    const eastWinnerTeams = [];

    for (let i = 0; i < westTeams.length; i += 2) {
        const team1 = westTeams[i].value;
        const team2 = westTeams[i + 1].value;

        if (!team1 || !team2) {
            alert(
                "Please choose both teams for every Western Conference matchup."
            );

            return null;
        }

        const winner =
            await predictMatchup(team1, team2);

        westWinners[i / 2].textContent =
            winner || "Error";

        westWinnerTeams.push(winner);
    }

    for (let i = 0; i < eastTeams.length; i += 2) {
        const team1 = eastTeams[i].value;
        const team2 = eastTeams[i + 1].value;

        if (!team1 || !team2) {
            alert(
                "Please choose both teams for every Eastern Conference matchup."
            );

            return null;
        }

        const winner =
            await predictMatchup(team1, team2);

        eastWinners[i / 2].textContent =
            winner || "Error";

        eastWinnerTeams.push(winner);
    }

    return {
        west: westWinnerTeams,
        east: eastWinnerTeams
    };
}

async function predictRound2(round1Winners) {
    const westRound2Boxes =
        document.querySelectorAll(".west-round2");

    const eastRound2Boxes =
        document.querySelectorAll(".east-round2");

    const westRound2Winners =
        document.querySelectorAll(".west-round2-winner");

    const eastRound2Winners =
        document.querySelectorAll(".east-round2-winner");

    const westWinners = [];
    const eastWinners = [];

    for (let i = 0; i < 4; i += 2) {
        westRound2Boxes[i].textContent =
            round1Winners.west[i];

        westRound2Boxes[i + 1].textContent =
            round1Winners.west[i + 1];

        const winner =
            await predictMatchup(
                round1Winners.west[i],
                round1Winners.west[i + 1]
            );

        westRound2Winners[i / 2].textContent =
            winner || "Error";

        westWinners.push(winner);
    }

    for (let i = 0; i < 4; i += 2) {
        eastRound2Boxes[i].textContent =
            round1Winners.east[i];

        eastRound2Boxes[i + 1].textContent =
            round1Winners.east[i + 1];

        const winner =
            await predictMatchup(
                round1Winners.east[i],
                round1Winners.east[i + 1]
            );

        eastRound2Winners[i / 2].textContent =
            winner || "Error";

        eastWinners.push(winner);
    }

    return {
        west: westWinners,
        east: eastWinners
    };
}

async function predictConferenceFinals(round2Winners) {
    const westBoxes =
        document.querySelectorAll(".west-conf-finals");

    const eastBoxes =
        document.querySelectorAll(".east-conf-finals");

    const westWinnerBox =
        document.querySelector(".west-conf-final-winner");

    const eastWinnerBox =
        document.querySelector(".east-conf-final-winner");

    westBoxes[0].textContent =
        round2Winners.west[0];

    westBoxes[1].textContent =
        round2Winners.west[1];

    const westChampion =
        await predictMatchup(
            round2Winners.west[0],
            round2Winners.west[1]
        );

    westWinnerBox.textContent =
        westChampion || "Error";

    eastBoxes[0].textContent =
        round2Winners.east[0];

    eastBoxes[1].textContent =
        round2Winners.east[1];

    const eastChampion =
        await predictMatchup(
            round2Winners.east[0],
            round2Winners.east[1]
        );

    eastWinnerBox.textContent =
        eastChampion || "Error";

    return {
        west: westChampion,
        east: eastChampion
    };
}

async function predictFinals(conferenceChampions) {
    const westBox =
        document.getElementById("west-finals-team");

    const eastBox =
        document.getElementById("east-finals-team");

    const championBox =
        document.getElementById("nba-champion");

    westBox.textContent =
        conferenceChampions.west;

    eastBox.textContent =
        conferenceChampions.east;

    const champion =
        await predictMatchup(
            conferenceChampions.west,
            conferenceChampions.east
        );

    championBox.textContent =
        champion
            ? champion + " Wins NBA Championship"
            : "Prediction Error";
}

async function predictPlayoffs() {
    const button =
        document.getElementById("predictButton");

    button.disabled = true;
    button.textContent = "Predicting...";

    try {
        const round1 =
            await predictRound1();

        if (!round1) {
            return;
        }

        const round2 =
            await predictRound2(round1);

        const conferenceChampions =
            await predictConferenceFinals(round2);

        await predictFinals(
            conferenceChampions
        );
    } catch (error) {
        console.error(
            "Playoff prediction error:",
            error
        );

        alert(
            "Something went wrong while predicting the playoffs."
        );
    } finally {
        button.disabled = false;
        button.textContent = "Predict Playoffs";
    }
}

document
    .getElementById("predictButton")
    .addEventListener(
        "click",
        predictPlayoffs
    );

loadTeams();