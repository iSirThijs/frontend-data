/* eslint-disable no-undef */
export function drawCircles(data) {
	const height = 1000;
	const width = 1000;

	// zoom and pan features
	
	// filter menu listeners
	let filters = d3.selectAll('.filter-radiobuttons');
	filters.on('change', () => update(data));

	// Creates the viewBox with zoom
	let svg = d3.select('#main')
		.append('svg')
		.attr('id', 'bubble-chart')
		.attr('viewBox', () => `0, 0, ${width}, ${height}`);

	svg.append('g').attr('id', 'bubbles');

	update(data);
	
}

function update(data) {
	// Filter data
	let key = d3.event ? d3.event.target.name : undefined;
	let value = d3.event ? d3.event.target.value : 'All';

	if(value !== 'All') {
		data = data.filter((datum) => {
			if (value === 'undefined') return datum[key] === undefined;
			else return datum[key] && datum[key].has(value);
		});
	}

	let totalObjects = data.reduce((totalObjects, data) => {
		return totalObjects + parseInt(data.creatorCount);
	}, 0);

	let infoCardAll = d3.select('#info-card-all');
	infoCardAll.selectAll('p').remove();

	if(value === 'All') infoCardAll.append('p').text(`${data.length} creators hebben ${totalObjects} objecten bijgedragen aan de fotocollectie van het NMVW`);
	else if (value === 'undefined') infoCardAll.append('p').text(`${data.length} creators zonder titel hebben ${totalObjects} objecten bijdgedragen aan de fotocollectie van het NMVW`);
	else  infoCardAll.append('p').text(`${data.length} creators met de titel ${value} hebben ${totalObjects} objecten bijdgedragen aan de fotocollectie van het NMVW`);

	let bubbleChart = d3.select('#bubble-chart');

	const zoom = d3.zoom()
		.scaleExtent([1, 1.5])
		.on('zoom', translate);

	bubbleChart.call(zoom);

	let pack = d3.pack()
		.size([1000, 1000]);

	let h = d3.hierarchy({children: data})
		.sum(d => Math.sqrt(d.creatorCount));


	let bubbles = d3.select('#bubbles')
		.data(pack(h).ancestors());

	// transition
	let t = d3.transition()
		.duration(700)
		.ease(d3.easePoly);

	// JOIN
	let bubble = bubbles.selectAll('g')
		.data(pack(h).leaves(), d => d.data.id);


	// EXIT
	let bubbleExit = bubble.exit();
	bubbleExit.select('.bubbles').transition(t).attr('r', 0).attr('fill-opacity',0);
	bubbleExit.transition(h).delay(700).remove();

	// UPDATE
	bubble.transition(t).attr('transform', d => `translate(${d.x},${d.y})`);
	bubble.select('.bubbles').transition(t).attr('r', d => d.r);

	// ENTER
	let bubbleEnter = bubble.enter()
		.append('g')
		.classed('g', true)
		.attr('id', d => d.data.id)
		.attr('transform', d => `translate(${d.x} ${d.y})`);

	bubbleEnter.append('circle')
		.classed('bubbles', true)
		.attr('r', 0)
		.transition(t)
		.attr('r', d => d.r);


	d3.selectAll('.bubbles').on('click', showInfoOverlay);


}


function translate() {
	let transform = d3.event.transform;

	let translate = transform.translate(0, 0);

	d3.select('#bubbles').attr('transform', translate);

}

function showInfoOverlay(d){

	d3.select('.selected-bubble').classed('selected-bubble', false);

	let target = d3.event.target;

	target.classList.add('selected-bubble');

	let { data } = d;
	let {creatorCount, name, titles } = data;
	if (titles) titles = [...titles];

	let infoCard = d3.select('#info-card-creator');

	infoCard.selectAll('p').remove();

	infoCard.append('p').text(`${titles ? titles.join(' '): ' '} ${name}`);
	infoCard.append('p').text(`Heeft ${creatorCount} foto's aan de collectie bijgedragen`);

	infoCard.classed('hidden', false);

}