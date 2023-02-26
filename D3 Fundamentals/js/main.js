var svg = d3.select("#chart-area").append("svg")

	.attr("width", 400)

	.attr("height", 400);

var rect = svg.append("rect")

	.attr("x", 0)

	.attr("y", 0)

	.attr("width", 130)

	.attr("height", 400)

	.attr("fill","green");

var rect = svg.append("rect")

	.attr("x", 130)

	.attr("y", 0)

	.attr("width", 140)

	.attr("height", 400)

	.attr("fill","white");

var rect = svg.append("rect")

	.attr("x", 270)

	.attr("y", 0)

	.attr("width", 130)

	.attr("height", 400)

	.attr("fill","red");

var circle = svg.append("circle")

	.attr("cx", 200)

	.attr("cy", 200)

	.attr("r", 50)

	.attr("fill", "brown");