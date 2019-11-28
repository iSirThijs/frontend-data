export function mergeDoubleObjects(doublesArray) {
	let seen = new Map();
	let mergedDoubles;

	mergedDoubles = doublesArray.filter((entry) => {
		let previous;

		if (Object.prototype.hasOwnProperty.call(seen, entry.obj)) {
			previous = seen[entry.obj];

			for (let key in entry) {
				if(key != 'obj') {
					previous[key].push(entry[key]);
					let newArray = [...new Set(previous[key])]; // set makes sure double values aren't stored, since set can only take unique values
					previous[key] = newArray;
				}
			}

			return false;
		}

		for (let key in entry) {
			if(key !== 'obj' && !Array.isArray(entry[key])) entry[key] = [entry[key]];
		}
	
		seen[entry.obj] = entry;

		return true;
	});

	return mergedDoubles;
}

export function toObjects(rawResults) {
	return rawResults.reduce((cleanedResults, result) => {
		let pairs = [];

		for (let key in result) {
			let pair = [key, result[key].value];
			pairs.push(pair);
		}

		let cleanResult = Object.fromEntries(pairs);
		cleanedResults.push(cleanResult);

		return cleanedResults;

	}, []);
}

export function toMap(rawResults) {
	return rawResults.reduce((cleanedResults, result) => {
		let pairs = [];

		for (let key in result) {
			let pair = [key, result[key].value];
			pairs.push(pair);
		}

		let cleanResult = new Map(pairs);
		cleanedResults.push(cleanResult);

		return cleanedResults;

	}, []);
}