export default function createFilterMenu(data, keys) {

	let filterMenuTabsMap = createMenu(data, keys);

	let menu = filterMenuTabsMap.map((filterMenuTab) => {
		let [filterTitle, filterTab] = filterMenuTab;

		let li = document.createElement('li');
	
		li.appendChild(filterTab);

		let p = document.createElement('p');
		p.textContent = filterTitle;

		li.appendChild(p);

		return li;
	});

	return menu;

}

// Creates an array with possible filters for 1 key
function createFilterArray(dataArray, key) {
	let filterArray = new Set();
	dataArray.forEach(element => {
		if(!element[key]) filterArray.add(element[key]);
		else {
			element[key].forEach((e)=>filterArray.add(e));
		}
	});
	return Array.from(filterArray);
}


// returns menu tabs for the supplied keys
function createMenu(filters, keys) {

	let menuMap = new Map();

	keys.forEach((key) =>{
		let filterArray = createFilterArray(filters, key);
		let menuTab = createMenuTab(filterArray, key);

		menuMap.set(key, menuTab);

	});

	let menu = [...menuMap.entries()];

	return menu;

}

// creates on menu tab for the specified key
function createMenuTab(filter, key){
	let ul = document.createElement('ul');
	ul.setAttribute('id', `filter-${key}`);
	
	filter.unshift('Alles'); // creates an everything radio button

	let radiobuttons = filter.map((filterChoice) => {
		let li = document.createElement('li');

		let input = document.createElement('input');
		input.setAttribute('type', 'radio');
		input.setAttribute('class', 'filter-radiobuttons')
		input.setAttribute('id', filterChoice !== 'Alles' ? `filter-${key}-${filterChoice}` : `filter-${key}-All`);
		input.setAttribute('name', key);
		input.setAttribute('value', filterChoice !== 'Alles' ? filterChoice : 'All');

		if(filterChoice === 'Alles') input.setAttribute('checked', true);

		li.append(input);

		let label = document.createElement('label')
		label.setAttribute('for', filterChoice);
		label.setAttribute('value', filterChoice);
		
		label.textContent = filterChoice ? filterChoice : 'Zonder/Onbekend';

		li.append(label);

		return li;
	});

	radiobuttons.forEach((radiobutton) => ul.append(radiobutton));

	return ul;
}
