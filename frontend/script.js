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


loadTeams();
loadTeams();