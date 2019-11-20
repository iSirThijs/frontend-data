export function drawCircles(data) {
	const width = '932';
	const height = '932';

	const pack = data => d3.pack()
		.size([width, height])
		(d3.hierarchy({children: data})
			.sum(d => d.creatorCount));

	const root = pack(data);

	const svg = d3.select('#bubbleChart')
		.append('svg')
		.attr('viewBox', [0, 0, width, height])
		.attr('font-size', 10)
		.attr('font-family', 'sans-serif')
		.attr('text-anchor', 'middle');


	const bubble = svg.selectAll('g')
		.data(root.leaves())
		.enter()
		.append('g')
		.attr('id', d => d.id)
		.attr('transform', d => `translate(${d.x},${d.y})`);


	console.log(root);

	bubble.append('circle')
		.attr('r', d => (d.r))
		.attr('fill', 'grey')
		.attr('fill-opacity', 0.7);
	

	return svg.node();
}