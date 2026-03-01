const	tableCont = document.querySelector(".js-scroll-container");
const	nameFields = document.querySelector(".js-names");
const	form = document.querySelector("#user-input");

const	peopleAmtField = document.querySelector(".js-people-amt");
peopleAmtField.addEventListener("change", createNameFieldsAndSubmit);

const	nameChoiceField = document.querySelector(".js-name-mode-input");
nameChoiceField.addEventListener("change", createNameFieldsAndSubmit);

const	runButton = document.querySelector("#run");
runButton.addEventListener("click", function(event) {
	event.preventDefault();
	const	data = new FormData(form);
	if (data.get("name-mode") != null)
		run();
	else {
		tableCont.innerHTML = "";
		makeErrorText(tableCont, "Please give names or choose to use running numbers!");
	}
});

function createNameFieldsAndSubmit() {
	const	data = new FormData(form);
	const	nameMode = data.get("name-mode");
	const	amount = Number(data.get("people-amt"));
	clearNameFields();
	if (amount <= 0 || amount > 500) {
		document.querySelector(".js-shape-input").style.display = "none";
		document.querySelector("#run").style.display = "none";
		makeErrorText(nameFields,
			"Number of people must be between 1 and 500!");
	}
	else {
		document.querySelector(".js-shape-input").style.display = "flex";
		document.querySelector("#run").style.display = "flex";
		if (nameMode == "manual")
			addNameFields();
	}
}

function makeErrorText(cont, text) {
	let	newInput = document.createElement("p");
	newInput.innerText = text;
	newInput.className = "error";
	cont.appendChild(newInput);
}

function addSingleNameField(nameFields) {
	let	newInput = document.createElement("input");
	newInput.type = "text";
	newInput.maxLength = "100";
	newInput.name = "name" + (nameFields.children.length - 1);
	newInput.id = "name" + (nameFields.children.length - 1);
	newInput.placeholder = "Person " + (nameFields.children.length);
	nameFields.appendChild(newInput);
}

function clearNameFields() {
	nameFields.innerHTML = "";
	tableCont.innerHTML = "";
}

function addNameFields() {
	const	data = new FormData(form);
	const 	amount = Number(data.get("people-amt"));
	let		infoText = document.createElement("p");
	infoText.className = "name-input-info";
	infoText.textContent = "Write the names below:";
	nameFields.appendChild(infoText);
	for (let i = 0; i < amount; i++)
		addSingleNameField(nameFields);
}

function getNamedPeople(amount) {
	const	data = new FormData(form);
	let		people = [];
	for (let i = 0; i < amount; i++) {
		let	person = data.get("name" + i);
		if (person.length > 30)
			person = person.substring(0, 27) + "...";
		people.push(person);
	}
	return people;
}

function getDefaultPeople(amount) {
	let	people = [];
	for (let i = 0; i < amount; i++)
		people.push(i + 1);
	return people;
}

function run() {
	const	data = new FormData(form);
	const	nameMode = data.get("name-mode");
	const	amount = Number(data.get("people-amt"));
	if (amount <= 0 || amount > 500) {
		tableCont.innerHTML = "";
		makeErrorText(tableCont, "Number of people must be between 1 and 500!");
		return;
	}
	let	people = [];
	if (nameMode == "default")
		people = getDefaultPeople(amount);
	else
		people = getNamedPeople(amount);
	buildTable(randomise(people));
}

function randomise(people) {
	for (let i = people.length - 1; i > 0; i--) {
		let	j = Math.floor(Math.random() * (i + 1));
		let	tmp = people[i];
		people[i] = people[j];
		people[j] = tmp;
	}
	return people;
}

function getMaxNameLength(people) {
	let	longest = 0;
	for (i = 0; i < people.length; i++)
	{
		if (people[i].length > longest)
			longest = people[i].length;
	}
	return (longest < 7 ? (longest + 5) : longest);
}

function buildTable(people) {
	const	data = new FormData(form);
	const	tableShape = data.get("shape-choice");
	const	pageContent = window.getComputedStyle(document.querySelector(".js-content"));
	const	chairPxWidth = getMaxNameLength(people) * (parseFloat(pageContent.fontSize));
	let		chairsPerRow, tablePxWidth;
	let		tableGrid = document.createElement("div");

	tableCont.innerHTML = "";
	tableGrid.id = "table-grid";
	tableCont.appendChild(tableGrid);

	if (tableShape == "rectangle" || (tableShape == "square" && people.length % 2)) {
		if (people.length % 2) {	// odd number of people will always have an edge chair on the right side
			chairsPerRow = Math.floor(people.length / 2) + 1;
			tablePxWidth = ((chairsPerRow - 1) * chairPxWidth) + (chairPxWidth / 2);
			tableGrid.style.setProperty('--width', people.length);
		}
		else {	// even number of people at a rectangular table
			chairsPerRow = people.length / 2;
			tablePxWidth = chairsPerRow * chairPxWidth;
			tableGrid.style.setProperty('--width', chairsPerRow * 2);
		}
		tableGrid.style.width = tablePxWidth + "px";
		for (let i = 0; i < people.length; i++) {
			let	chair = document.createElement("p");
			chair.textContent = people[i];
			if (people.length % 2 && i == (chairsPerRow - 1))
				chair.className = "right-chair chair";
			else if (i < chairsPerRow)
				chair.className = "top-chair chair";
			else
				chair.className = "bottom-chair chair";
			tableGrid.appendChild(chair);
		}
	}
	else if (tableShape == "square") {	// even number of people at a square table
		chairsPerRow = (people.length / 2) + 1;
		tableGrid.style.setProperty('--width', people.length);
		tablePxWidth = (chairsPerRow - 1) * chairPxWidth;
		tableGrid.style.width = tablePxWidth + "px";
		for (let i = 0; i < people.length; i++) {
			let	chair = document.createElement("p");
			chair.textContent = people[i];
			if (i == 0)
				chair.className = "left-chair chair";
			else if (i == chairsPerRow - 1)
				chair.className = "right-chair chair";
			else if (i < chairsPerRow - 1)
				chair.className = "top-chair chair";
			else
				chair.className = "bottom-chair chair";
			tableGrid.appendChild(chair);
		}
	}
}
