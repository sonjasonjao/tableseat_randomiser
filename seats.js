function AddField() {
	const amount = document.querySelector("#people-amt").value;
	let namesDiv = document.querySelector(".names");
	if (namesDiv.children.length > 0) {
		while (namesDiv.children.length > 0)
		namesDiv.removeChild(namesDiv.firstElementChild);
	}
	let table = document.querySelector(".result-table");
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
	const mode = document.querySelector("#name-mode").checked;
	const amount = document.querySelector("#people-amt").value;
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
	if (shape == "rectangle" || (shape == "square" && people.length % 2)) {
		if (people.length % 2)
			width = Math.floor(people.length / 2);
		else
			width = people.length / 2;
		let areas = "";
		let line = [];
		let areaCont = "";
		for (let j = 0; j < height; j++) {
			line.length = 0;
			for (let i = 0; i < width; i++)
				line.push("chair" + (i + (j * width)));
			if (people.length % 2)
				line.push("chair" + (people.length - 1));
			let	row = line.join(" ");
			row = row.padStart(row.length + 1, "\"");
			row = row.padEnd(row.length + 1, "\"");
			areaCont += row;
		}
		areas += areaCont;
		let table = document.querySelector(".result-table");
		table.style.gridTemplateAreas = areas;
		table.style.maxWidth = (100 * width) + "px";
		table.style.maxHeight =  (100 * height) + "px";
		if (table.children.length > 0) {
			while (table.children.length > 0)
				table.removeChild(table.firstElementChild);
		}
		let i;
		for (i = 0; i < people.length; i++) {
			let chair = document.createElement('p');
			chair.className = "chair" + i;
			chair.className = "chair";
			chair.textContent = people[i];
			chair.style.gridArea = "chair" + i;
			if (i < width) {
				chair.style.alignItems = "flex-start";
				chair.style.justifyContent = "center";
				chair.style.paddingTop = "10px";
			}
			else if (!(people.length % 2) || i != (people.length - 1)) {
				chair.style.alignItems = "flex-end";
				chair.style.justifyContent = "center";
				chair.style.paddingBottom = "10px";
			}
			else {
				chair.style.alignItems = "center";
				chair.style.justifyContent = "right";
				chair.style.paddingRight = "10px";
				chair.style.width = "60px";
			}
			table.appendChild(chair);
		}
	}
	else if (shape == "square") {
		width = (people.length / 2) + 1;
		let areas = "";
		let line = [];
		let areaCont = "";
		for (let j = 0; j < height; j++) {
			line.length = 0;
			let i = 0;
			line.push("chair0");
			for (i = 1; i < width - 1; i++)
				line.push("chair" + (i + (j * (people.length / 2 - 1))));
			line.push("chair" + (people.length - 1));
			let	row = line.join(" ");
			row = row.padStart(row.length + 1, "\"");
			row = row.padEnd(row.length + 1, "\"");
			areaCont += row;
		}
		areas += areaCont;
		let table = document.querySelector(".result-table");
		table.style.gridTemplateAreas = areas;
		table.style.maxWidth = ((100 * (width - 2)) + 120) + "px";
		table.style.maxHeight =  (100 * height) + "px";
		if (table.children.length > 0) {
			while (table.children.length > 0)
				table.removeChild(table.firstElementChild);
		}
		let i;
		for (i = 0; i < people.length; i++) {
			let chair = document.createElement('p');
			chair.className = "chair" + i;
			chair.className = "chair";
			chair.textContent = people[i];
			chair.style.gridArea = "chair" + i;
			if (i == 0) {
				chair.style.alignItems = "center";
				chair.style.justifyContent = "left";
				chair.style.paddingLeft = "10px";
				chair.style.width = "60px";						
			}
			else if (i == people.length - 1) {
				chair.style.alignItems = "center";
				chair.style.justifyContent = "right";
				chair.style.paddingRight = "10px";
				chair.style.width = "60px";				
			}
			else if (i < width - 1) {
				chair.style.alignItems = "flex-start";
				chair.style.justifyContent = "center";
				chair.style.paddingTop = "10px";
			}
			else {
				chair.style.alignItems = "flex-end";
				chair.style.justifyContent = "center";
				chair.style.paddingBottom = "10px";
			}
			table.appendChild(chair);
		}
	}
}