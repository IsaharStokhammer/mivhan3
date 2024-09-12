const editPage = document.getElementById("editPage");
const homePage = document.getElementById("homePage");
const addPersonButton = document.getElementById("addPersonButton");
const table = document.getElementById("soldiersTableBody");
let soldiers = localStorage.getItem("soldiers") || [];
const sortByNameButton = document.getElementById("sortByNameButton");
let orderUp = false;

soldiers = JSON.parse(soldiers);

if (soldiers.length == 0) {

}
else {

    function createSoldierRow(soldier) {
        const raw = document.createElement("tr");
        const nameRaw = createSoldierField(raw, "name", soldier.name);
        const rankRaw = createSoldierField(raw, "rank", soldier.rank);
        const positionRaw = createSoldierField(raw, "position", soldier.position);
        const platoonRaw = createSoldierField(raw, "platoon", soldier.platoon);
        const statusRaw = createSoldierField(raw, "status", soldier.status);
        const actionsRaw = createSoldierField(raw, "actions", "");
        const editButton = createActionButton(actionsRaw, "edit", () => editByIndex(soldiers.indexOf(soldier)));
        const removeButton = createActionButton(actionsRaw, "remove", () => removeByIndex(soldiers.indexOf(soldier)));
        if (soldier.status == "active" || soldier.status == "reserve") {
            const missionButton = createActionButton(actionsRaw, "mission", () => missionByIndex(soldiers.indexOf(soldier)));
        }
        return raw;
    }

    function createSoldierField(parent, type, value) {
        const field = parent.appendChild(document.createElement("td"));
        field.id = type;
        field.innerText = value;
        return field;
    }

    function createActionButton(parent, name, action) {
        const button = parent.appendChild(document.createElement("button"));
        button.id = name;
        button.innerText = name;
        button.addEventListener("click", action);
        return button;
    }

    soldiers.forEach(soldier => table.appendChild(createSoldierRow(soldier)));
}

addPersonButton.addEventListener("click", () => {
    const name = document.getElementById("nameInput").value;
    const rank = document.getElementById("rankInput").value;
    const position = document.getElementById("positionInput").value;
    const platoon = document.getElementById("platoonInput").value;
    const missionTime = document.getElementById("missionTimeInput").value;
    const status = document.getElementById("statusInput").value;
    if (name == "" || rank == "" || position == "" || platoon == "") {
        alert("Please fill in all the fields");
    }
    const soldier = {
        name,
        rank,
        position,
        platoon,
        missionTime,
        status
    };
    soldiers.push(soldier);
    localStorage.setItem("soldiers", JSON.stringify(soldiers));
    location.reload();
});

function editByIndex(index) {
    editPage.style.display = "flex";
    homePage.style.display = "none";
    const soldier = soldiers[index];
    document.getElementById("nameInput").value = soldier.name;
    document.getElementById("rankInput").value = soldier.rank;
    document.getElementById("positionInput").value = soldier.position;
    document.getElementById("platoonInput").value = soldier.platoon;
    document.getElementById("missionTimeInput").value = soldier.missionTime;
    document.getElementById("statusInput").value = soldier.status;
}
function removeByIndex(index) {
    soldiers.splice(index, 1);
    localStorage.setItem("soldiers", JSON.stringify(soldiers));
    location.reload();
}

sortByNameButton.addEventListener("click", () => {
    if (orderUp) {
        sortByNameButton.innerText = "Full Name ↓";
        table.innerHTML = "";
        const sortedSoldiers = [...soldiers].sort((a, b) => a.name.localeCompare(b.name));
        sortedSoldiers.forEach(soldier => table.appendChild(createSoldierRow(soldier)));
    }
    else {
        sortByNameButton.innerText = "Full Name ↑";
        table.innerHTML = "";
        const sortedSoldiers = [...soldiers].sort((a, b) => b.name.localeCompare(a.name));
        sortedSoldiers.forEach(soldier => table.appendChild(createSoldierRow(soldier)));
    }

    orderUp = !orderUp;
});
function missionByIndex(index) {
    debugger;
    const soldier = soldiers[index];
    const missionButton = document.getElementById("actions");
    let missionTime = Number(soldier.missionTime);
    missionButton.innerHTML = `Mission ${missionTime}s`;
    const interval = setInterval(() => {
        missionTime--;
        missionButton.innerText = `Mission ${missionTime}s`;
        if (missionTime <= 0) {
            clearInterval(interval);
            missionButton.innerText = "Mission";
        }
    }, 1000);

}