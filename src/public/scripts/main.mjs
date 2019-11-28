import { queryStringUtilities, fetchResults, cleaningUtilities, transformUtilities } from './frontend-modules/nmvw-sparql-module/nmvw-sparql-module.mjs';
import { drawCircles } from './bubbleChart.mjs';
import createFilterMenu from './filters.mjs';

let url = 'https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-37/sparql';
const prefixes = {
	dc: '<http://purl.org/dc/elements/1.1/>',
	skos: '<http://www.w3.org/2004/02/skos/core#>',
	dct: '<http://purl.org/dc/terms/>',
	edm: '<http://www.europeana.eu/schemas/edm/>',
	rdf: '<http://www.w3.org/1999/02/22-rdf-syntax-ns#>',
	rdfs: '<http://www.w3.org/2000/01/rdf-schema#>',
};

// SPARQL query to get all photo objects, their creator, img path, title, and created day
const selectVars = ['?creator', '(COUNT(?creator) as ?creatorCount)'];
const whereQuery = [
	'<https://hdl.handle.net/20.500.11840/termmaster1397> skos:narrower* ?type .',
	'?obj edm:object ?type .',
	'?obj dc:creator ?creator .'
];
let queryOptionals = {
	group: '?creator'
};

let queryString = queryStringUtilities.createQueryString(prefixes, selectVars, whereQuery, queryOptionals);


fetchResults(url, queryString)
	.then((rawData) => transformUtilities.toMap(rawData))
	.then((creators) => cleaningUtilities.extractTitles(creators))
	.then((creators) => creators.map((creator) => Object.fromEntries(creator)))
	.then((creators) => {
		// console.log(creators);

		let filterBar = document.getElementById('filter-bar');
		let filterMenus = createFilterMenu(creators, ['titles']);

		filterMenus.forEach(filterMenu => filterBar.appendChild(filterMenu));

		drawCircles(creators);



	});


