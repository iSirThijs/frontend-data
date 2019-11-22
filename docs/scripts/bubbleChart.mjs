/* eslint-disable no-undef */
export function drawCircles(data) {
	const height = 1000;
	const width = 1000;

	// Gets the lay-out for the data
	const pack = data => d3.pack()
		.size([width, height])
		(d3.hierarchy({children: data})
			.sum(d => Math.sqrt(d.creatorCount)));

	const root = pack(data);


	// zoom and pan features
	const zoom = d3.zoom()
		.scaleExtent([1, 1])
		.on('zoom', translate);


	// Creates the viewBox
	const svg = d3.select('#bubbleChart')
		.append('svg')
		.attr('viewBox', d => `0, 0, ${width}, ${height}`);

	// Creates a group with all the bubbles, this group will use scale and translate.
	const bubbles = svg
		.append('g')
		.data(root.ancestors()) // assign the root to the group of bubbles
		.attr('id', d => d.id)
		.attr('transform', d  => `translate(-${d.x}, -${d.y})`)
		.call(zoom);

	const bubble = bubbles.selectAll('g')
		.data(root.leaves())
		.enter()
		.append('g')
		.attr('id', d => d.id)
		.attr('transform', d => `translate(${d.x},${d.y})`);

	bubble.append('circle')
		.attr('class', 'bubbles')
		.append('animate')
		.attr('attributeName', 'r')
		.attr('to', d => d.r)
		.attr('begin', 'bubbleChart')
		.attr('dur', '1s')
		.attr('restart', 'never')
		.attr('fill', 'freeze');

	return svg.node();

	function translate(d, i, e) {
		let transform = d3.event.transform;
		let {x, y} = d;
		let translate = transform.translate(-x, -y);
	
		bubbles.attr('transform', translate);

	}

	
}




// svg = d3.select('.chart')
//     .classed("svg-container", true)
//     .append('svg')
//     .attr('class', 'chart')
//     .attr("viewBox", "0 0 680 490")
//     .attr("preserveAspectRatio", "xMinYMin meet")
//     .classed("svg-content-responsive", true)
//     // call d3 Zoom
//     .call(d3.zoom().on("zoom", function () {
//         svg.attr("transform", d3.event.transform)
//         }))
//     .append("g")
//     .attr("transform", "translate(" + margin + "," + margin + ")");