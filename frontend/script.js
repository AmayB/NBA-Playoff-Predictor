async function loadTeams() {
    const westResponse = await fetch("/teams/west");
    const eastResponse = await fetch("/teams/east");

    const westTeams = await westResponse.json();
    const eastTeams = await eastResponse.json();

    const westDropdowns = document.querySelectorAll(".west-team");
    const eastDropdowns = document.querySelectorAll(".east-team");

    fillDropdowns(westDropdowns, westTeams);
    fillDropdowns(eastDropdowns, eastTeams);
}


function fillDropdowns(dropdowns, teams) {
    for (const dropdown of dropdowns) {
        dropdown.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Choose team";

        dropdown.appendChild(defaultOption);

        for (const team of teams) {
            const option = document.createElement("option");

            option.value = team;
            option.textContent = team;

            dropdown.appendChild(option);
        }
    }
}


async function getPrediction(team1, team2) {
    const response = await fetch(
        `/predict?team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}`
    );

    return await response.json();
}


async function predictRound(dropdownClass, winnerClass) {
    const dropdowns = document.querySelectorAll(dropdownClass);
    const winners = document.querySelectorAll(winnerClass);

    for (let i = 0; i < dropdowns.length; i += 2) {

        const team1 = dropdowns[i].value;
        const team2 = dropdowns[i + 1].value;

        if (!team1 || !team2) {
            winners[i / 2].textContent = "Choose both teams";
            continue;
        }

        const prediction = await getPrediction(team1, team2);

        if (prediction.error) {
            winners[i / 2].textContent = "Error";
            continue;
        }

        winners[i / 2].textContent = prediction.winner;
    }
}


function advanceWinners(winnerClass, nextRoundClass) {
    const winners = document.querySelectorAll(winnerClass);
    const nextRoundTeams = document.querySelectorAll(nextRoundClass);

    for (let i = 0; i < winners.length; i++) {
        const winner = winners[i].textContent;

        if (winner !== "Winner") {
            nextRoundTeams[i].textContent = winner;
        }
    }
}


async function predictSecondRound() {
    const westTeams = document.querySelectorAll(".west-round2");
    const westWinners = document.querySelectorAll(".west-round2-winner");

    const eastTeams = document.querySelectorAll(".east-round2");
    const eastWinners = document.querySelectorAll(".east-round2-winner");

    await predictAutomaticRound(westTeams, westWinners);
    await predictAutomaticRound(eastTeams, eastWinners);
}


async function predictAutomaticRound(teams, winners) {
    for (let i = 0; i < teams.length; i += 2) {

        const team1 = teams[i].textContent;
        const team2 = teams[i + 1].textContent;

        if (
            team1 === "Waiting..." ||
            team2 === "Waiting..."
        ) {
            winners[i / 2].textContent = "Waiting...";
            continue;
        }

        const prediction = await getPrediction(team1, team2);

        if (prediction.error) {
            winners[i / 2].textContent = "Error";
            continue;
        }

        winners[i / 2].textContent = prediction.winner;
    }
}


async function predictPlayoffs() {

    // Predict Round 1
    await predictRound(".west-team", ".west-winner");
    await predictRound(".east-team", ".east-winner");

    // Move Round 1 winners into Round 2
    advanceWinners(".west-winner", ".west-round2");
    advanceWinners(".east-winner", ".east-round2");

    // Predict Round 2
    await predictSecondRound();
}


document
    .getElementById("predictButton")
    .addEventListener("click", predictPlayoffs);


loadTeams();