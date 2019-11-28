export default function createFilters(data, filterMap = undefined, targetElement = 'filters') {

	if(!filterMap) return data;

	let target = document.getElementById(targetElement);

	let filters = filterMap.map(([filterID]) => [filterID, getFilterValues(data, filterID)]);
	let filterMenus = filters.map((filter) => createFilterButtons(filter));

	filterMenus.forEach(filterButtons => target.appendChild(filterButtons));

	let filterTabs = filterMap.map(([filterID, filterText]) => {
		let filterTab = document.createElement('li');
		filterTab.setAttribute('id', filterID);
		filterTab.textContent = filterText;
		return filterTab;
	});

	let filterBar = document.createElement('ul');
	filterBar.setAttribute('id', 'filter-bar');
	filterTabs.forEach((filterTab) => {
		filterBar.addEventListener('click', function (event) {
			let { id } = event.target;
			document.getElementById(id).classList.toggle('selected');
			document.getElementById(`filter-${id}`).classList.toggle('selected');
		});
		filterBar.appendChild(filterTab);
	});

	target.appendChild(filterBar);

	return data;
}

// Returns an array with the filterID an array with all possible filters for 1 filterID
function getFilterValues(data, filterID) {
	let filterArray = new Set();
	data.forEach(datum => {
		if(!datum[filterID]) filterArray.add(datum[filterID]);
		else datum[filterID].forEach((e)=>filterArray.add(e));
	});
	return Array.from(filterArray);
}

// creates on menu tab for the specified filterID
function createFilterButtons([filterID, filterValues]){
	let ul = document.createElement('ul');
	ul.setAttribute('id', `filter-${filterID}`);
	ul.setAttribute('class', 'filter-menu');
	
	filterValues.unshift('Alles'); // creates an everything radio button

	// create radiobuttons with labels for every value in a filter
	let radiobuttons = filterValues.map((filterValue) => {
		let li = document.createElement('li');

		let input = document.createElement('input');
		
		input.setAttribute('type', 'radio');
		input.setAttribute('id', filterValue !== 'Alles' ? `filter-${filterID}-${filterValue}` : `filter-${filterID}-All`);
		input.setAttribute('class', 'filter-radiobuttons');
		input.setAttribute('name', filterID);
		input.setAttribute('value', filterValue !== 'Alles' ? filterValue : 'All');

		if(filterValue === 'Alles') input.setAttribute('checked', true);

		li.append(input);

		let label = document.createElement('label')
		label.setAttribute('for', `filter-${filterID}-${filterValue !== 'Alles' ? filterValue : 'All'}`);
		label.setAttribute('value', filterValue);
		
		label.textContent = filterValue ? filterValue : 'Zonder/Onbekend';

		li.append(label);

		return li;
	});

	radiobuttons.forEach((radiobutton) => ul.append(radiobutton));

	return ul;
}
