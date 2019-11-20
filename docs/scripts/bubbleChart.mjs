export function drawCircles(data) {
	const width = '1000';
	const height = '1000';

	const pack = data => d3.pack()
		.size([width, height])
		(d3.hierarchy({children: data})
			.sum(d => Math.sqrt(d.creatorCount)));

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
		.attr('class', 'bubbles')
		.append('animate')
		.attr('attributeName', 'r')
		.attr('to', d => d.r)
		.attr('begin', 'bubbleChart')
		.attr('dur', '1s')
		.attr('restart', 'never')
		.attr('fill', 'freeze');

	return svg.node();
}