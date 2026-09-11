async function loadTeams() {
    const response = await fetch("http://127.0.0.1:8000/teams");
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

loadTeams();