function addSingleNameField(namesDiv) {
	let newInput = document.createElement('input');
	newInput.type = 'text';
	newInput.className = 'names';
	newInput.id = 'name' + (namesDiv.children.length - 1);
	namesDiv.appendChild(newInput);
}

function addNameFields() {
	let mode = document.querySelector('input[name=\"name-mode"]:checked').value;
	let namesDiv = document.querySelector(".names");
	let table = document.querySelector("#result-table");
	if (mode == "default") {
		namesDiv.innerHTML = "";
		table.innerHTML = "";
		document.querySelector('.shape-input').style.display = "flex";
		document.querySelector('.run').style.display = "flex";
		return ;
	}
	const amount = document.querySelector("#people-amt").value;
	namesDiv.innerHTML = "";
	if (amount <= 0 || amount > 30) {
		let newInput = document.createElement('p');
		newInput.innerText = "Number of people must be between 1 and 30!";
		newInput.className = "error";
		namesDiv.appendChild(newInput);
	}	
	table.innerHTML = "";
	let infoText = document.createElement('p');
	infoText.className = 'names-info';
	infoText.textContent = "Write the names below:";
	namesDiv.appendChild(infoText);
	for (let i = 0; i < amount; i++)
		addSingleNameField(namesDiv);
	document.querySelector('.shape-input').style.display = "flex";
	document.querySelector('.run').style.display = "flex";
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
	let mode = document.querySelector('input[name=\"name-mode"]:checked').value;
	const amount = document.querySelector("#people-amt").value;
	if (amount <= 0 || amount > 30) {
		let table = document.querySelector("#result-table");
		table.innerHTML = "";
		let msg = document.createElement('p');
		msg.innerText = "Number of people must be between 1 and 30!";
		msg.className = "error";
		table.appendChild(msg);
		return ;
	}
	let people = [];
	if (mode == "default")
		people = getDefaultPeople(amount);
	else
		people = getNamedPeople(amount);
	randomise(people);
}

function randomise(people) {
	for (let i = people.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = people[i];
        people[i] = people[j];
        people[j] = tmp;
    }
	makeTable(people);
}

function makeTable(people) {
	const shape = document.querySelector("#shape-choice").value;
	let width;
	const height = 2;
	let table = document.querySelector("#result-table");
	table.innerHTML = "";
	table.style.maxHeight = (100 * height) + "px";
	if (shape == "rectangle" || (shape == "square" && people.length % 2)) {
		if (people.length % 2)
			width = Math.floor(people.length / 2) + 1;
		else
			width = people.length / 2;
		table.style.setProperty('--width', width);
		table.style.maxWidth = (100 * width) + "px";
		for (let i = 0; i < people.length; i++) {
			let chair = document.createElement('p');
			chair.textContent = people[i];
			if (people.length % 2 && i == (width - 1)) {
				chair.className = "edge-chair chair";
				chair.style.justifyContent = "right";
				chair.style.paddingRight = "10px";
			}
			else if (i < width)
				chair.className = "top-chair chair";
			else
				chair.className = "bottom-chair chair";
			table.appendChild(chair);
		}
	}
	else if (shape == "square") {
		width = (people.length / 2) + 1;
		table.style.setProperty('--width', width);
		table.style.maxWidth = (100 * (width - 1)) + "px";
		for (let i = 0; i < people.length; i++) {
			let chair = document.createElement('p');
			chair.textContent = people[i];
			if (i == 0) {
				chair.className = "edge-chair chair";
				chair.style.justifyContent = "left";
				chair.style.paddingLeft = "10px";
			}
			else if (i == width - 1) {
				chair.className = "edge-chair chair";
				chair.style.justifyContent = "right";
				chair.style.paddingRight = "10px";
			}
			else if (i < width - 1)
				chair.className = "top-chair chair";
			else
				chair.className = "bottom-chair chair";
			table.appendChild(chair);
		}
	}
}