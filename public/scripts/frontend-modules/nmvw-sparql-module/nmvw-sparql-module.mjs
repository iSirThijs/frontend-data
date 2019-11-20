import { createQueryString, stringifyComponents, stringifyPrefixes, stringifyOptionals } from './queryStringUtilities.mjs';
import { toObjects, mergeDoubleObjects, toMap } from './transformUtilities.mjs'
import { extractTitles } from './cleaningUtilities.mjs'

export const queryStringUtilities = {
	createQueryString,
	stringifyComponents,
	stringifyPrefixes,
	stringifyOptionals,
};

export const transformUtilities = {
	toObjects,
	toMap,
	mergeDoubleObjects
};

export const cleaningUtilities = {
	extractTitles
};

// fetch it and get json result
export async function fetchResults(url, queryString) {
	let response = await fetch(`${url}?query=${encodeURIComponent(queryString)}&format=json`)
	let json = await response.json();
	return json.results.bindings;
}

