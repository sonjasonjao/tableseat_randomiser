function AddField() {
	const amount = document.querySelector("#people-amt").value;
	let namesDiv = document.querySelector(".names");
	if (namesDiv.children.length > 0) {
		while (namesDiv.children.length > 0)
			namesDiv.removeChild(namesDiv.firstElementChild);
	}
	if (amount <= 0 || amount > 30) {
		let newInput = document.createElement('p');
		newInput.innerText = "Number of people must be between 1 and 30!";
		newInput.className = "error";
		namesDiv.appendChild(newInput);
	}	
	let table = document.querySelector("#result-table");
	if (table.children.length > 0) {
		while (table.children.length > 0)
		table.removeChild(table.firstElementChild);
	}
	for (let i = 0; i < amount; i++) {
		let newInput = document.createElement('input');
		newInput.type = 'text';
		newInput.className = 'names';
		newInput.id = 'name' + (namesDiv.children.length);
		namesDiv.appendChild(newInput);
	}
}

function getNamedPeople(amount) {
	let people = [];
	for (let i = 0; i < amount; i++) {
		let thisround = "#name" + i;
		people.push(document.querySelector(thisround).value);
	}
	return people;
}

function getDefaultPeople(amount) {
	let people = [];
	for (let i = 0; i < amount; i++)
		people.push(i + 1);
	return people;
}

function Run() {
	let mode = document.querySelector("#name-mode").checked;
	const amount = document.querySelector("#people-amt").value;
	if (amount <= 0 || amount > 30) {
		let table = document.querySelector("#result-table");
		if (table.children.length > 0) {
			while (table.children.length > 0)
				table.removeChild(table.firstElementChild);
		}
		let msg = document.createElement('p');
		msg.innerText = "Number of people must be between 1 and 30!";
		msg.className = "error";
		table.appendChild(msg);
		return ;
	}
	let people = [];
	if (mode == true)
		people = getDefaultPeople(amount);
	else
		people = getNamedPeople(amount);
	Randomiser(people);
	mode = false;
}

function Randomiser(people) {
	for (let i = people.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = people[i];
        people[i] = people[j];
        people[j] = temp;
    }
	makeTable(people);
}

function makeTable(people) {
	const shape = document.querySelector("#shape-choice").value;
	let width;
	const height = 2;
	let table = document.querySelector("#result-table");
	if (shape == "rectangle" || (shape == "square" && people.length % 2)) {
		if (people.length % 2)
			width = Math.floor(people.length / 2) + 1;
		else
			width = people.length / 2;
		table.style.setProperty('--width', width);
		table.style.maxWidth = (100 * width) + "px";
		table.style.maxHeight =  (100 * height) + "px";
		if (table.children.length > 0) {
			while (table.children.length > 0)
				table.removeChild(table.firstElementChild);
		}
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
		table.style.maxWidth = ((100 * (width - 2)) + 100) + "px";
		table.style.maxHeight =  (100 * height) + "px";
		if (table.children.length > 0) {
			while (table.children.length > 0)
				table.removeChild(table.firstElementChild);
		}
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