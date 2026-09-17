const API_BASE_URL = "https://nba-playoff-predictor-api.onrender.com";

const teamLogos = {

    "Atlanta Hawks": "https://cdn.nba.com/logos/nba/1610612737/global/L/logo.svg",
    "Boston Celtics": "https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg",
    "Brooklyn Nets": "https://cdn.nba.com/logos/nba/1610612751/global/L/logo.svg",
    "Charlotte Hornets": "https://cdn.nba.com/logos/nba/1610612766/global/L/logo.svg",
    "Chicago Bulls": "https://cdn.nba.com/logos/nba/1610612741/global/L/logo.svg",
    "Cleveland Cavaliers": "https://cdn.nba.com/logos/nba/1610612739/global/L/logo.svg",
    "Dallas Mavericks": "https://cdn.nba.com/logos/nba/1610612742/global/L/logo.svg",
    "Denver Nuggets": "https://cdn.nba.com/logos/nba/1610612743/global/L/logo.svg",
    "Detroit Pistons": "https://cdn.nba.com/logos/nba/1610612765/global/L/logo.svg",
    "Golden State Warriors": "https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg",
    "Houston Rockets": "https://cdn.nba.com/logos/nba/1610612745/global/L/logo.svg",
    "Indiana Pacers": "https://cdn.nba.com/logos/nba/1610612754/global/L/logo.svg",
    "LA Clippers": "https://cdn.nba.com/logos/nba/1610612746/global/L/logo.svg",
    "Los Angeles Lakers": "https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg",
    "Memphis Grizzlies": "https://cdn.nba.com/logos/nba/1610612763/global/L/logo.svg",
    "Miami Heat": "https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg",
    "Milwaukee Bucks": "https://cdn.nba.com/logos/nba/1610612749/global/L/logo.svg",
    "Minnesota Timberwolves": "https://cdn.nba.com/logos/nba/1610612750/global/L/logo.svg",
    "New Orleans Pelicans": "https://cdn.nba.com/logos/nba/1610612740/global/L/logo.svg",
    "New York Knicks": "https://cdn.nba.com/logos/nba/1610612752/global/L/logo.svg",
    "Oklahoma City Thunder": "https://cdn.nba.com/logos/nba/1610612760/global/L/logo.svg",
    "Orlando Magic": "https://cdn.nba.com/logos/nba/1610612753/global/L/logo.svg",
    "Philadelphia 76ers": "https://cdn.nba.com/logos/nba/1610612755/global/L/logo.svg",
    "Phoenix Suns": "https://cdn.nba.com/logos/nba/1610612756/global/L/logo.svg",
    "Portland Trail Blazers": "https://cdn.nba.com/logos/nba/1610612757/global/L/logo.svg",
    "Sacramento Kings": "https://cdn.nba.com/logos/nba/1610612758/global/L/logo.svg",
    "San Antonio Spurs": "https://cdn.nba.com/logos/nba/1610612759/global/L/logo.svg",
    "Toronto Raptors": "https://cdn.nba.com/logos/nba/1610612761/global/L/logo.svg",
    "Utah Jazz": "https://cdn.nba.com/logos/nba/1610612762/global/L/logo.svg",
    "Washington Wizards": "https://cdn.nba.com/logos/nba/1610612764/global/L/logo.svg"
};


async function loadTeams() {

    try {

        const [
            westResponse,
            eastResponse
        ] = await Promise.all([
            fetch(API_BASE_URL + "/teams/west"),
            fetch(API_BASE_URL + "/teams/east")
        ]);


        if (
            !westResponse.ok ||
            !eastResponse.ok
        ) {
            throw new Error(
                "Could not load team lists."
            );
        }


        const westTeams =
            await westResponse.json();

        const eastTeams =
            await eastResponse.json();


        fillDropdowns(
            document.querySelectorAll(
                ".west-team"
            ),
            westTeams
        );


        fillDropdowns(
            document.querySelectorAll(
                ".east-team"
            ),
            eastTeams
        );


        createCustomDropdowns();


        requestAnimationFrame(
            drawBracketLines
        );


    } catch (error) {

        console.error(
            "Could not load NBA teams:",
            error
        );

    }

}


function fillDropdowns(
    dropdowns,
    teams
) {

    dropdowns.forEach(
        dropdown => {

            dropdown.innerHTML = "";


            const defaultOption =
                document.createElement(
                    "option"
                );

            defaultOption.value = "";

            defaultOption.textContent =
                "Choose team";


            dropdown.appendChild(
                defaultOption
            );


            teams.forEach(
                team => {

                    const option =
                        document.createElement(
                            "option"
                        );

                    option.value =
                        team;

                    option.textContent =
                        team;


                    dropdown.appendChild(
                        option
                    );

                }
            );

        }
    );

}


/*
    Decide whether the dropdown
    should open upward or downward.
*/
function positionDropdown(wrapper) {

    const trigger =
        wrapper.querySelector(
            ".select-trigger"
        );


    if (!trigger) {
        return;
    }


    const rect =
        trigger.getBoundingClientRect();


    const spaceBelow =
        window.innerHeight -
        rect.bottom;


    const spaceAbove =
        rect.top;


    /*
        Estimate how much room the
        dropdown needs.

        The actual menu is capped by
        CSS, so 320px is enough for
        the full team list.
    */
    const requiredSpace =
        335;


    /*
        If there isn't enough room
        below AND there is more room
        above, open upward.
    */
    if (
        spaceBelow < requiredSpace &&
        spaceAbove > spaceBelow
    ) {

        wrapper.classList.add(
            "drop-up"
        );

    } else {

        wrapper.classList.remove(
            "drop-up"
        );

    }

}


function createCustomDropdowns() {

    const selects =
        document.querySelectorAll(
            ".team"
        );


    selects.forEach(
        select => {

            if (
                select.parentElement.classList.contains(
                    "team-select-wrapper"
                )
            ) {
                return;
            }


            const wrapper =
                document.createElement(
                    "div"
                );

            wrapper.className =
                "team-select-wrapper";


            select.parentNode.insertBefore(
                wrapper,
                select
            );


            wrapper.appendChild(
                select
            );


            /*
                Dropdown button
            */
            const trigger =
                document.createElement(
                    "div"
                );

            trigger.className =
                "select-trigger";


            /*
                Content inside button
            */
            const triggerContent =
                document.createElement(
                    "div"
                );

            triggerContent.className =
                "select-trigger-content";


            /*
                Selected team logo
            */
            const triggerLogo =
                document.createElement(
                    "img"
                );

            triggerLogo.className =
                "select-trigger-logo";

            triggerLogo.alt = "";

            triggerLogo.style.display =
                "none";


            /*
                Selected team name
            */
            const triggerText =
                document.createElement(
                    "span"
                );

            triggerText.textContent =
                "Choose team";


            triggerContent.appendChild(
                triggerLogo
            );

            triggerContent.appendChild(
                triggerText
            );


            /*
                Dropdown arrow
            */
            const arrow =
                document.createElement(
                    "span"
                );

            arrow.className =
                "select-arrow";


            trigger.appendChild(
                triggerContent
            );

            trigger.appendChild(
                arrow
            );


            /*
                Dropdown menu
            */
            const menu =
                document.createElement(
                    "div"
                );

            menu.className =
                "select-menu";


            /*
                Create custom options
            */
            Array.from(
                select.options
            ).forEach(
                option => {

                    const customOption =
                        document.createElement(
                            "div"
                        );

                    customOption.className =
                        "custom-option";


                    customOption.dataset.value =
                        option.value;


                    /*
                        Team logo
                    */
                    const logo =
                        document.createElement(
                            "img"
                        );

                    logo.className =
                        "custom-option-logo";

                    logo.alt = "";


                    if (
                        option.value &&
                        teamLogos[
                            option.value
                        ]
                    ) {

                        logo.src =
                            teamLogos[
                                option.value
                            ];

                    } else {

                        logo.style.display =
                            "none";

                    }


                    /*
                        Team name
                    */
                    const text =
                        document.createElement(
                            "span"
                        );

                    text.className =
                        "custom-option-text";

                    text.textContent =
                        option.textContent;


                    customOption.appendChild(
                        logo
                    );

                    customOption.appendChild(
                        text
                    );


                    /*
                        Selecting a team
                    */
                    customOption.addEventListener(
                        "click",
                        event => {

                            event.stopPropagation();


                            select.value =
                                option.value;


                            updateCustomDropdown(
                                wrapper
                            );


                            select.dispatchEvent(
                                new Event(
                                    "change",
                                    {
                                        bubbles: true
                                    }
                                )
                            );


                            refreshAllCustomOptions();


                            closeAllDropdowns();

                        }
                    );


                    menu.appendChild(
                        customOption
                    );

                }
            );


            wrapper.appendChild(
                trigger
            );

            wrapper.appendChild(
                menu
            );


            /*
                Open / close dropdown
            */
            trigger.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    const isOpen =
                        wrapper.classList.contains(
                            "open"
                        );


                    closeAllDropdowns();


                    if (!isOpen) {

                        /*
                            Check whether there
                            is enough room below.
                        */
                        positionDropdown(
                            wrapper
                        );


                        wrapper.classList.add(
                            "open"
                        );

                    }

                }
            );


            /*
                Keep custom dropdown
                synced with native select.
            */
            select.addEventListener(
                "change",
                () => {

                    updateCustomDropdown(
                        wrapper
                    );


                    refreshAllCustomOptions();

                }
            );


            updateCustomDropdown(
                wrapper
            );

        }
    );


    refreshAllCustomOptions();

}


function updateCustomDropdown(
    wrapper
) {

    const select =
        wrapper.querySelector(
            "select"
        );


    const triggerText =
        wrapper.querySelector(
            ".select-trigger-content span"
        );


    const triggerLogo =
        wrapper.querySelector(
            ".select-trigger-logo"
        );


    const options =
        wrapper.querySelectorAll(
            ".custom-option"
        );


    const team =
        select.value;


    if (team) {

        triggerText.textContent =
            team;


        if (
            teamLogos[team]
        ) {

            triggerLogo.src =
                teamLogos[team];

            triggerLogo.style.display =
                "block";

        } else {

            triggerLogo.style.display =
                "none";

        }

    } else {

        triggerText.textContent =
            "Choose team";

        triggerLogo.style.display =
            "none";

    }


    options.forEach(
        option => {

            if (
                option.dataset.value ===
                team
            ) {

                option.classList.add(
                    "selected"
                );

            } else {

                option.classList.remove(
                    "selected"
                );

            }

        }
    );

}


function refreshAllCustomOptions() {

    const selectedTeams =
        new Set();


    document
        .querySelectorAll(
            ".team"
        )
        .forEach(
            select => {

                if (select.value) {

                    selectedTeams.add(
                        select.value
                    );

                }

            }
        );


    document
        .querySelectorAll(
            ".team-select-wrapper"
        )
        .forEach(
            wrapper => {

                const select =
                    wrapper.querySelector(
                        "select"
                    );


                const options =
                    wrapper.querySelectorAll(
                        ".custom-option"
                    );


                options.forEach(
                    option => {

                        const team =
                            option.dataset.value;


                        /*
                            Always show
                            "Choose team".
                        */
                        if (!team) {

                            option.style.display =
                                "flex";

                            return;

                        }


                        /*
                            Always show the
                            currently selected
                            team in this dropdown.
                        */
                        if (
                            team ===
                            select.value
                        ) {

                            option.style.display =
                                "flex";

                            return;

                        }


                        /*
                            Hide teams already
                            selected elsewhere.
                        */
                        if (
                            selectedTeams.has(
                                team
                            )
                        ) {

                            option.style.display =
                                "none";

                        } else {

                            option.style.display =
                                "flex";

                        }

                    }
                );

            }
        );

}


function closeAllDropdowns() {

    document
        .querySelectorAll(
            ".team-select-wrapper.open"
        )
        .forEach(
            wrapper => {

                wrapper.classList.remove(
                    "open"
                );

            }
        );

}


document.addEventListener(
    "click",
    () => {

        closeAllDropdowns();

    }
);


function setTeamBox(
    element,
    team
) {

    element.innerHTML = "";


    if (!team) {

        element.textContent =
            "Waiting...";

        return;

    }


    const logo =
        teamLogos[team];


    if (logo) {

        const image =
            document.createElement(
                "img"
            );

        image.src =
            logo;

        image.alt = "";


        element.appendChild(
            image
        );

    }


    const text =
        document.createElement(
            "span"
        );

    text.textContent =
        team;


    element.appendChild(
        text
    );

}


async function predictMatchup(
    team1,
    team2
) {

    if (
        !team1 ||
        !team2
    ) {

        return null;

    }


    try {

        const response =
            await fetch(
                API_BASE_URL +
                "/predict?team1=" +
                encodeURIComponent(team1) +
                "&team2=" +
                encodeURIComponent(team2),
                {
                    method: "POST"
                }
            );

        if (!response.ok) {

            console.error(
                "Prediction request failed:",
                response.status
            );

            return null;

        }


        const result =
            await response.json();


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
        document.querySelectorAll(
            ".west-team"
        );


    const eastTeams =
        document.querySelectorAll(
            ".east-team"
        );


    const westWinners =
        document.querySelectorAll(
            ".west-winner"
        );


    const eastWinners =
        document.querySelectorAll(
            ".east-winner"
        );


    const westWinnerTeams = [];

    const eastWinnerTeams = [];


    for (
        let i = 0;
        i < westTeams.length;
        i += 2
    ) {

        const team1 =
            westTeams[i].value;


        const team2 =
            westTeams[i + 1].value;


        if (
            !team1 ||
            !team2
        ) {

            alert(
                "Please choose both teams for every Western Conference matchup."
            );

            return null;

        }


        const winner =
            await predictMatchup(
                team1,
                team2
            );


        setTeamBox(
            westWinners[i / 2],
            winner
        );


        westWinnerTeams.push(
            winner
        );

    }


    for (
        let i = 0;
        i < eastTeams.length;
        i += 2
    ) {

        const team1 =
            eastTeams[i].value;


        const team2 =
            eastTeams[i + 1].value;


        if (
            !team1 ||
            !team2
        ) {

            alert(
                "Please choose both teams for every Eastern Conference matchup."
            );

            return null;

        }


        const winner =
            await predictMatchup(
                team1,
                team2
            );


        setTeamBox(
            eastWinners[i / 2],
            winner
        );


        eastWinnerTeams.push(
            winner
        );

    }


    requestAnimationFrame(
        drawBracketLines
    );


    return {
        west: westWinnerTeams,
        east: eastWinnerTeams
    };

}


async function predictRound2(
    round1Winners
) {

    const westRound2Boxes =
        document.querySelectorAll(
            ".west-round2"
        );


    const eastRound2Boxes =
        document.querySelectorAll(
            ".east-round2"
        );


    const westRound2Winners =
        document.querySelectorAll(
            ".west-round2-winner"
        );


    const eastRound2Winners =
        document.querySelectorAll(
            ".east-round2-winner"
        );


    const westWinners = [];

    const eastWinners = [];


    for (
        let i = 0;
        i < 4;
        i += 2
    ) {

        setTeamBox(
            westRound2Boxes[i],
            round1Winners.west[i]
        );


        setTeamBox(
            westRound2Boxes[i + 1],
            round1Winners.west[i + 1]
        );


        const winner =
            await predictMatchup(
                round1Winners.west[i],
                round1Winners.west[i + 1]
            );


        setTeamBox(
            westRound2Winners[i / 2],
            winner
        );


        westWinners.push(
            winner
        );

    }


    for (
        let i = 0;
        i < 4;
        i += 2
    ) {

        setTeamBox(
            eastRound2Boxes[i],
            round1Winners.east[i]
        );


        setTeamBox(
            eastRound2Boxes[i + 1],
            round1Winners.east[i + 1]
        );


        const winner =
            await predictMatchup(
                round1Winners.east[i],
                round1Winners.east[i + 1]
            );


        setTeamBox(
            eastRound2Winners[i / 2],
            winner
        );


        eastWinners.push(
            winner
        );

    }


    requestAnimationFrame(
        drawBracketLines
    );


    return {
        west: westWinners,
        east: eastWinners
    };

}


async function predictConferenceFinals(
    round2Winners
) {

    const westBoxes =
        document.querySelectorAll(
            ".west-conf-finals"
        );


    const eastBoxes =
        document.querySelectorAll(
            ".east-conf-finals"
        );


    const westWinnerBox =
        document.querySelector(
            ".west-conf-final-winner"
        );


    const eastWinnerBox =
        document.querySelector(
            ".east-conf-final-winner"
        );


    setTeamBox(
        westBoxes[0],
        round2Winners.west[0]
    );


    setTeamBox(
        westBoxes[1],
        round2Winners.west[1]
    );


    const westChampion =
        await predictMatchup(
            round2Winners.west[0],
            round2Winners.west[1]
        );


    setTeamBox(
        westWinnerBox,
        westChampion
    );


    setTeamBox(
        eastBoxes[0],
        round2Winners.east[0]
    );


    setTeamBox(
        eastBoxes[1],
        round2Winners.east[1]
    );


    const eastChampion =
        await predictMatchup(
            round2Winners.east[0],
            round2Winners.east[1]
        );


    setTeamBox(
        eastWinnerBox,
        eastChampion
    );


    requestAnimationFrame(
        drawBracketLines
    );


    return {
        west: westChampion,
        east: eastChampion
    };

}


async function predictFinals(
    conferenceChampions
) {

    const westBox =
        document.getElementById(
            "west-finals-team"
        );


    const eastBox =
        document.getElementById(
            "east-finals-team"
        );


    const championBox =
        document.getElementById(
            "nba-champion"
        );


    setTeamBox(
        westBox,
        conferenceChampions.west
    );


    setTeamBox(
        eastBox,
        conferenceChampions.east
    );


    const champion =
        await predictMatchup(
            conferenceChampions.west,
            conferenceChampions.east
        );


    championBox.innerHTML = "";


    if (champion) {

        const logo =
            teamLogos[champion];


        if (logo) {

            const image =
                document.createElement(
                    "img"
                );

            image.src =
                logo;

            image.alt = "";


            championBox.appendChild(
                image
            );

        }


        const text =
            document.createElement(
                "span"
            );

        text.textContent =
            champion;


        championBox.appendChild(
            text
        );


    } else {

        championBox.textContent =
            "Prediction Error";

    }


    requestAnimationFrame(
        drawBracketLines
    );

}


async function predictPlayoffs() {

    const button =
        document.getElementById(
            "predictButton"
        );


    button.disabled = true;


    button.textContent =
        "Predicting...";


    try {

        const round1 =
            await predictRound1();


        if (!round1) {

            return;

        }


        const round2 =
            await predictRound2(
                round1
            );


        const conferenceChampions =
            await predictConferenceFinals(
                round2
            );


        await predictFinals(
            conferenceChampions
        );


        requestAnimationFrame(
            drawBracketLines
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


function getEdgePoint(
    element,
    direction
) {

    const main =
        document.querySelector(
            "main"
        );


    const mainRect =
        main.getBoundingClientRect();


    const rect =
        element.getBoundingClientRect();


    return {

        x:
            direction === "right"
                ? rect.right -
                  mainRect.left
                : rect.left -
                  mainRect.left,

        y:
            rect.top -
            mainRect.top +
            rect.height / 2

    };

}


function drawLine(
    svg,
    start,
    end
) {

    const line =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );


    const distance =
        Math.abs(
            end.x -
            start.x
        );


    const curve =
        Math.max(
            15,
            distance * 0.35
        );


    const direction =
        end.x > start.x
            ? 1
            : -1;


    const control1X =
        start.x +
        curve *
        direction;


    const control2X =
        end.x -
        curve *
        direction;


    const path =
        `M ${start.x} ${start.y}
         C ${control1X} ${start.y},
           ${control2X} ${end.y},
           ${end.x} ${end.y}`;


    line.setAttribute(
        "d",
        path
    );


    line.setAttribute(
        "class",
        "bracket-line"
    );


    svg.appendChild(
        line
    );

}


function connectElements(
    svg,
    from,
    to
) {

    if (
        !from ||
        !to
    ) {

        return;

    }


    const fromRect =
        from.getBoundingClientRect();


    const toRect =
        to.getBoundingClientRect();


    const goingRight =
        toRect.left >
        fromRect.right;


    const start =
        getEdgePoint(
            from,
            goingRight
                ? "right"
                : "left"
        );


    const end =
        getEdgePoint(
            to,
            goingRight
                ? "left"
                : "right"
        );


    drawLine(
        svg,
        start,
        end
    );

}


function drawBracketLines() {

    const svg =
        document.getElementById(
            "bracket-lines"
        );


    if (!svg) {

        return;

    }


    if (
        window.innerWidth <= 850
    ) {

        svg.innerHTML = "";

        return;

    }


    svg.innerHTML = "";


    const westRound1 =
        document.querySelectorAll(
            ".west-winner"
        );


    const westRound2 =
        document.querySelectorAll(
            ".west-round2"
        );


    const westRound2Winners =
        document.querySelectorAll(
            ".west-round2-winner"
        );


    const westConf =
        document.querySelectorAll(
            ".west-conf-finals"
        );


    const westConfWinner =
        document.querySelector(
            ".west-conf-final-winner"
        );


    const westFinals =
        document.getElementById(
            "west-finals-team"
        );


    const eastRound1 =
        document.querySelectorAll(
            ".east-winner"
        );


    const eastRound2 =
        document.querySelectorAll(
            ".east-round2"
        );


    const eastRound2Winners =
        document.querySelectorAll(
            ".east-round2-winner"
        );


    const eastConf =
        document.querySelectorAll(
            ".east-conf-finals"
        );


    const eastConfWinner =
        document.querySelector(
            ".east-conf-final-winner"
        );


    const eastFinals =
        document.getElementById(
            "east-finals-team"
        );


    /*
        WEST
    */

    for (
        let i = 0;
        i < 4;
        i++
    ) {

        connectElements(
            svg,
            westRound1[i],
            westRound2[i]
        );

    }


    for (
        let i = 0;
        i < 2;
        i++
    ) {

        connectElements(
            svg,
            westRound2Winners[i],
            westConf[i]
        );

    }


    connectElements(
        svg,
        westConfWinner,
        westFinals
    );


    /*
        EAST
    */

    for (
        let i = 0;
        i < 4;
        i++
    ) {

        connectElements(
            svg,
            eastRound1[i],
            eastRound2[i]
        );

    }


    for (
        let i = 0;
        i < 2;
        i++
    ) {

        connectElements(
            svg,
            eastRound2Winners[i],
            eastConf[i]
        );

    }


    connectElements(
        svg,
        eastConfWinner,
        eastFinals
    );

}


/*
    Window resize
*/
window.addEventListener(
    "resize",
    () => {

        /*
            If a dropdown is currently
            open, recalculate whether
            it should point up/down.
        */
        document
            .querySelectorAll(
                ".team-select-wrapper.open"
            )
            .forEach(
                wrapper => {

                    positionDropdown(
                        wrapper
                    );

                }
            );


        requestAnimationFrame(
            drawBracketLines
        );

    }
);


/*
    Predict button
*/
document
    .getElementById(
        "predictButton"
    )
    .addEventListener(
        "click",
        predictPlayoffs
    );


/*
    Start application
*/
loadTeams();
