async function loadTeams() {

    try {

        const westResponse = await fetch("/teams/west");
        const eastResponse = await fetch("/teams/east");

        const westTeams = await westResponse.json();
        const eastTeams = await eastResponse.json();


        const westDropdowns =
            document.querySelectorAll(".west-team");

        const eastDropdowns =
            document.querySelectorAll(".east-team");


        fillDropdowns(westDropdowns, westTeams);
        fillDropdowns(eastDropdowns, eastTeams);

        document.querySelectorAll(".team").forEach(dropdown => {

            dropdown.addEventListener("change", function () {

                checkDuplicateTeams(this);

            });

        });


    } catch (error) {

        console.error("Could not load NBA teams:", error);

    }
}

function fillDropdowns(dropdowns, teams) {

    dropdowns.forEach(dropdown => {

        dropdown.innerHTML = "";

        const defaultOption =
            document.createElement("option");

        defaultOption.value = "";

        defaultOption.textContent =
            "Choose team";

        dropdown.appendChild(defaultOption);


        teams.forEach(team => {

            const option =
                document.createElement("option");

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


    const dropdowns =
        document.querySelectorAll(".team");


    let count = 0;


    dropdowns.forEach(dropdown => {

        if (dropdown.value === changedDropdown.value) {
            count++;
        }

    });


    if (count > 1) {

        alert(
            changedDropdown.value +
            " is already selected in another matchup."
        );

        changedDropdown.value = "";

    }
}

async function predictMatchup(team1, team2) {

    if (!team1 || !team2) {
        return null;
    }


    try {

        const response = await fetch("/predict", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                team1: team1,
                team2: team2

            })

        });


        if (!response.ok) {

            console.error(
                "Prediction request failed:",
                response.status
            );

            return null;
        }


        const result = await response.json();

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
            ? "🏆 " + champion
            : "Prediction Error";
}

async function predictPlayoffs() {

    const button =
        document.getElementById("predictButton");


    button.disabled = true;

    button.textContent =
        "Predicting...";


    try {

        // Round 1

        const round1 =
            await predictRound1();


        if (!round1) {
            return;
        }


        // Round 2

        const round2 =
            await predictRound2(round1);


        // Conference Finals

        const conferenceChampions =
            await predictConferenceFinals(round2);


        // NBA Finals

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

        button.textContent =
            "Predict Playoffs";
    }
}

document
    .getElementById("predictButton")
    .addEventListener(
        "click",
        predictPlayoffs
    );

loadTeams();