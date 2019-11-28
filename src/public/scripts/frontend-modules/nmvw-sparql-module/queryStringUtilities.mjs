/**
 * @description Parses the components of a query into a string
 * @param {string|object} prefixes A string with prefixes or an object with prefixes as key value pairs
 * @param {(string|string[])} selectVars A string with all selects or an array of strings with select vars (without SELECT keyword);
 * @param {string|string[]} whereQuery A string or array with strings with the where query without the WHERE keyword and {}
 * @param {Object} queryOptionals Optional things like LIMIT, GROUP BY etc. as string or object with key value pairs
 * @returns {string} A string that can be used in a SPARQL Fetch
 * 
 */
function createQueryString(prefixes, selectVars, whereQuery, queryOptionals) {
	
	// parse the components
	let prefixString = stringifyPrefixes(prefixes);
	let selectString = stringifyComponents(selectVars);
	let whereString = stringifyComponents(whereQuery);
	let optionalsString = '';

	if (queryOptionals) optionalsString = stringifyOptionals(queryOptionals);

	// Combine the components of the string
	let queryString = `${prefixString} SELECT ${selectString} WHERE { ${whereString} } ${optionalsString}`;

	return queryString;

}

/**
 * 
 * @param {(string|string[])} arrayOfStrings A string with all selects or an array of strings with select vars (without SELECT keyword)
 * @returns {string} A string with the components
 */

function stringifyComponents(arrayOfStrings) {
	if(Array.isArray(arrayOfStrings)) return arrayOfStrings.join(' ');
	else if(typeof arrayOfStrings === 'string') return arrayOfStrings;
}

/**
 * @param {object} prefixes  A string with prefixes or an object with prefixes as key value pairs
 * @returns {string} A string with prefixes
 */

function stringifyPrefixes(prefixes) {
	if (typeof prefixes === 'string') return prefixes;
	else if (typeof prefixes === 'object') {
		let prefixString = [];
		for (let prefix in prefixes){
			let string = `PREFIX ${prefix}: ${prefixes[prefix]}`;
			prefixString.push(string);
		}
		prefixString = prefixString.join(' ');
		return prefixString;
	}
}

/**
 * @param {object} queryOptionals Optional things like LIMIT, GROUP BY etc. as string or object with key value pairs
 * @returns a string with query optionals
 */
function stringifyOptionals(queryOptionals){
	if(typeof queryOptionals === 'string') return queryOptionals;
	else if (typeof queryOptionals === 'object') {
		let optionalsString = [];
		for (let key in queryOptionals) {
			if(key === 'group' || 'order') optionalsString.push(`${key.toUpperCase()} BY ${queryOptionals[key]}`);
			else optionalsString.push(`${key.toUpperCase()} ${queryOptionals[key]}`);
		}
		return optionalsString.join(' ');
	}
}

export { createQueryString, stringifyComponents, stringifyPrefixes, stringifyOptionals };