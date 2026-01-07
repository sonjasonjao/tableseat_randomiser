const	table = document.querySelector("#result-table");
const	nameFields = document.querySelector(".names");

const	nameForm = document.querySelector(".name-mode-input");
nameForm.addEventListener("change", () => {
	const	nameMode = document.querySelector('input[name="name-mode"]:checked').value;
	clearNameFields();
	if (nameMode == "manual")
		addNameFields();
});

const	runButton = document.querySelector("#run");
runButton.addEventListener("click", () => {
	if (document.querySelector('input[name="name-mode"]:checked') != null)
		run();
	else {
		table.innerHTML = "";
		let msg = document.createElement('p');
		msg.innerText = "Please give names or choose to use running numbers!";
		msg.className = "error";
		table.appendChild(msg);
	}
});

function addSingleNameField(nameFields) {
	let newInput = document.createElement("input");
	newInput.type = "text";
	// newInput.maxLength = "40";
	newInput.className = "names";
	newInput.id = "name" + (nameFields.children.length - 1);
	nameFields.appendChild(newInput);
}

function clearNameFields() {
	nameFields.innerHTML = "";
	table.innerHTML = "";
}

function addNameFields() {
	const amount = document.querySelector("#people-amt").value;
	if (amount <= 0) { // || amount > 30) {	// the disappearing and reappearing of run element is not working!
		document.querySelector(".shape-input").style.display = "none";
		document.querySelector("#run").style.display = "none";
		let newInput = document.createElement('p');
		newInput.innerText = "Number of people must be between 1 and 30!";
		newInput.className = "error";
		nameFields.appendChild(newInput);
		return ;
	}
	let infoText = document.createElement('p');
	infoText.className = "names-info";
	infoText.textContent = "Write the names below:";
	nameFields.appendChild(infoText);
	for (let i = 0; i < amount; i++)
		addSingleNameField(nameFields);
}

function getNamedPeople(amount) {
	let people = [];
	for (let i = 0; i < amount; i++)
		people.push(document.querySelector("#name" + i).value);
	return people;
}

function getDefaultPeople(amount) {
	let people = [];
	for (let i = 0; i < amount; i++)
		people.push(i + 1);
	return people;
}

function run() {
	let nameMode = document.querySelector('input[name="name-mode"]:checked').value;
	const amount = document.querySelector("#people-amt").value;
	if (amount <= 0) { // || amount > 30) {
		table.innerHTML = "";
		let msg = document.createElement('p');
		msg.innerText = "Number of people must be between 1 and 30!";
		msg.className = "error";
		table.appendChild(msg);
		return ;
	}
	let people = [];
	if (nameMode == "default")
		people = getDefaultPeople(amount);
	else
		people = getNamedPeople(amount);
	makeTable(randomise(people));
}

function randomise(people) {
	for (let i = people.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let tmp = people[i];
		people[i] = people[j];
		people[j] = tmp;
	}
	return people;
}

function getMaxLength() {
	let tableStyle = window.getComputedStyle(table);
	let fontSize = parseFloat(tableStyle.fontSize);
	let maxSize = parseFloat(tableStyle.width) - 2;
	return maxSize / fontSize;
}

function getMaxNameLength(people) {
	let longest = 0;
	for (i = 0; i < people.length; i++)
	{
		if (people[i].length > longest)
			longest = people[i].length;
	}
	return (longest < 7 ? (longest + 5) : longest);
}

function makeTable(people) {
	const	tableShape = document.querySelector("#shape-choice").value;
	const	pageContent = window.getComputedStyle(document.querySelector(".content"));
	const	chairSize = getMaxNameLength(people) * (parseFloat(pageContent.fontSize));
	let		rowWidth, maxWidth;
	const	height = 2;
	table.innerHTML = "";
	table.style.maxHeight = (100 * height) + "px";
	if (tableShape == "rectangle" || (tableShape == "square" && people.length % 2)) {
		if (people.length % 2) {	// odd number of people will always have an edge chair on the right side
			rowWidth = Math.floor(people.length / 2) + 1;
			maxWidth = ((rowWidth - 1) * chairSize) + (chairSize / 2);
			table.style.setProperty('--width', people.length);
		}
		else {	// even number of people at a rectangular table
			rowWidth = people.length / 2;
			maxWidth = rowWidth * chairSize;
			table.style.setProperty('--width', rowWidth * 2);
		}
		table.style.maxWidth = maxWidth + "px";
		for (let i = 0; i < people.length; i++) {
			let	chair = document.createElement('p');
			if (people[i].length > getMaxLength())
				people[i] = people[i].substring(0, getMaxLength() - 3) + "...";
			chair.textContent = people[i];
			if (people.length % 2 && i == (rowWidth - 1))
				chair.className = "right-chair chair";
			else if (i < rowWidth)
				chair.className = "top-chair chair";
			else
				chair.className = "bottom-chair chair";
			table.appendChild(chair);
		}
	}
	else if (tableShape == "square") {	// even number of people at a round / square table
		rowWidth = (people.length / 2) + 1;
		table.style.setProperty('--width', people.length);
		maxWidth = (rowWidth - 1) * chairSize;
		table.style.maxWidth = maxWidth + "px";
		for (let i = 0; i < people.length; i++) {
			let	chair = document.createElement('p');
			if (people[i].length > getMaxLength())
				people[i] = people[i].substring(0, getMaxLength() - 3) + "...";
			chair.textContent = people[i];
			if (i == 0)
				chair.className = "left-chair chair";
			else if (i == rowWidth - 1)
				chair.className = "right-chair chair";
			else if (i < rowWidth - 1)
				chair.className = "top-chair chair";
			else
				chair.className = "bottom-chair chair";
			table.appendChild(chair);
		}
	}
}
