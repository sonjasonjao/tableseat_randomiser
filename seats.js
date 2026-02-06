const	tableGrid = document.querySelector("#table-grid");
const	tableCont = document.querySelector(".scroll-container");
const	nameFields = document.querySelector(".js-names");
const	form = document.querySelector("#user-input");
let		data;

const	nameForm = document.querySelector(".js-name-mode-input");
nameForm.addEventListener("change", () => {
	data = new FormData(form);
	const nameMode = data.get("name-mode");
	clearNameFields();
	const	amount = data.get("people-amt");
	if (amount <= 0) {
		document.querySelector(".js-shape-input").style.display = "none";
		document.querySelector("#run").style.display = "none";
		makeErrorText(nameFields,
			"Number of people must be greater than 0!");
	}
	else if (nameMode == "manual") {
		document.querySelector(".js-shape-input").style.display = "flex";
		document.querySelector("#run").style.display = "flex";
		addNameFields();
	}
	else if (nameMode == "default") {
		document.querySelector(".js-shape-input").style.display = "flex";
		document.querySelector("#run").style.display = "flex";
	}
});

const	runButton = document.querySelector("#run");
runButton.addEventListener("click", function(event) {
	event.preventDefault();
	data = new FormData(form);
	if (data.get("name-mode") != null)
		run(data);
	else {
		tableGrid.innerHTML = "";
		makeErrorText(tableGrid,
			"Please give names or choose to use running numbers!");
	}
});

function makeErrorText(cont, text) {
	let	newInput = document.createElement('p');
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
	nameFields.appendChild(newInput);
}

function clearNameFields() {
	nameFields.innerHTML = "";
	tableGrid.innerHTML = "";
}

function addNameFields() {
	const 	amount = data.get("people-amt");
	let		infoText = document.createElement('p');
	infoText.textContent = "Write the names below:";
	nameFields.appendChild(infoText);
	for (let i = 0; i < amount; i++)
		addSingleNameField(nameFields);
}

function getNamedPeople(amount) {
	let	people = [];
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

function run(data) {
	const	nameMode = data.get("name-mode");
	const	amount = data.get("people-amt");
	if (amount <= 0) {
		tableGrid.innerHTML = "";
		makeErrorText(tableGrid,
			"Number of people must be greater than 0!");
		return ;
	}
	let	people = [];
	if (nameMode == "default")
		people = getDefaultPeople(amount);
	else
		people = getNamedPeople(amount);
	makeTable(randomise(people));
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

function makeTable(people) {
	const	tableShape = data.get("shape-choice");
	const	pageContent = window.getComputedStyle(document.querySelector(".js-content"));
	const	chairPxWidth = getMaxNameLength(people) * (parseFloat(pageContent.fontSize));
	let		chairsPerRow, tablePxWidth;
	tableGrid.innerHTML = "";
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
			let	chair = document.createElement('p');
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
			let	chair = document.createElement('p');
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
