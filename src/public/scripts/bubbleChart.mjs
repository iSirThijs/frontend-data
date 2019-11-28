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



}


function translate() {
	let transform = d3.event.transform;

	let translate = transform.translate(0, 0);

	d3.select('#bubbles').attr('transform', translate);

}