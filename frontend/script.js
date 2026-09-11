async function loadTeams() {
    const response = await fetch("/teams");
    const teams = await response.json();

    const team1 = document.getElementById("team1");
    const team2 = document.getElementById("team2");

    team1.innerHTML = "";
    team2.innerHTML = "";

    for (const team of teams) {
        const option1 = document.createElement("option");
        option1.value = team;
        option1.textContent = team;

        const option2 = document.createElement("option");
        option2.value = team;
        option2.textContent = team;

        team1.appendChild(option1);
        team2.appendChild(option2);
    }
}


async function predictWinner() {
    const team1 = document.getElementById("team1").value;
    const team2 = document.getElementById("team2").value;

    const response = await fetch(
        `/predict?team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}`
    );

    const prediction = await response.json();

    const result = document.getElementById("result");

    if (prediction.error) {
        result.textContent = prediction.error;
        return;
    }

    result.textContent =
        `${prediction.winner} wins!`;
}


document
    .getElementById("predictButton")
    .addEventListener("click", predictWinner);


loadTeams();