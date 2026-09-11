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

        const response = await fetch(
            `/predict?team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}`
        );

        const prediction = await response.json();

        if (prediction.error) {
            winners[i / 2].textContent = "Error";
            continue;
        }

        winners[i / 2].textContent = prediction.winner;
    }
}


async function predictPlayoffs() {
    await predictRound(".west-team", ".west-winner");
    await predictRound(".east-team", ".east-winner");
}


document
    .getElementById("predictButton")
    .addEventListener("click", predictPlayoffs);


loadTeams();