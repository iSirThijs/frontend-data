export function drawCircles(data) {
	const height = 1000;
	const width = 1000;

	const pack = data => d3.pack()
		.size([width, height])
		(d3.hierarchy({children: data})
			.sum(d => Math.sqrt(d.creatorCount)));

	const root = pack(data);
	const dragSVG = d3.drag()
		.on('drag', function(d) {
			// console.log('draging')
			// relative x y
			let dx = d3.event.dx;
			let dy = d3.event.dy;

			// newXandY
			let newX = d.dx ? d.dx + dx : d.x + dx;	
			let newY = d.dy ? d.dy + dy : d.y + dy;
			
			let previousMaxX = d.maxX ? d.maxX : 1000;
			let previousMinX = d.minX ? d.minX : 0;
			let previousMaxY = d.maxY ? d.maxY : 1000;
			let previousMinY = d.minY ? d.minY : 0;

			d.dx = checkMinMax(newX, previousMaxX, previousMinX);
			d.dy = checkMinMax(newY, previousMaxY, previousMinY);
			
			// calculate new min/max values for x and y
			let [minX, maxX] = calculateX(d.r, d.y, d.dy, d.x);
			let [minY, maxY] = calculateY(d.r, d.x, d.dx, d.y);
			
			d.minX = minX;
			d.maxX = maxX;
			d.minY = minY;
			d.maxY = maxY;

			d3.select(this).attr('viewBox', d => `${d.dx}, ${d.dy}, ${width}, ${height}`);
		})
		// .on('end', ...data => console.log(data));

	const svg = d3.select('#bubbleChart')
		.data(root.ancestors())
		.append('svg')
		.attr('viewBox', d => `${d.x}, ${d.y}, ${width}, ${height}`)
		.attr('font-size', 10)
		.attr('font-family', 'sans-serif')
		.attr('text-anchor', 'middle')
		.call(dragSVG);

	const bubble = svg.selectAll('g')
		.data(root.leaves())
		.enter()
		.append('g')
		.attr('id', d => d.id)
		.attr('transform', d => `translate(${d.x},${d.y})`);
	
	console.log(root);

	// console.log(calculateMaxX(500, [500, 250], [500, 500]));

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


function calculateX(radius, offsetY, y, offsetX) {

	let cy = y - offsetY;
	let cx = Math.sqrt((Math.pow(radius,2) - Math.pow(cy, 2)));

	let minX = -cx + offsetX;
	let maxX = cx + offsetX;

	return [minX, maxX - 350];

}

function calculateY(radius, offsetX, x, offsetY) {
	let cx = x - offsetX;
	let cy = Math.sqrt((Math.pow(radius,2) - Math.pow(cx, 2)));

	let minY = -cy + offsetY;
	let maxY = cy + offsetY;

	return [minY, maxY - 200];

}

function checkMinMax(value, max, min){

	if(value <= max && value >= min) return value
	else if( value < min ) return min;
	else if( value > max ) return max;
	// else if( value > max ) return max;

}