d3.json("data/buildings.json").then((data)=> {
    
	var heights = [];
	var color = 200;
    var svg_width= 900;
    var svg_height= 900;
    var fig_width= 30;

	data.forEach((d)=>{

		d.height = +d.height;
		heights.push(d.height);

	});

	console.log("------------" + heights + "-----------");
	var svg= d3.select("#chart-area").append("svg")
	.attr("width", svg_width)
	.attr("height", svg_height)

	var rects= svg.selectAll("rect")
	.data(heights);

	rects.enter()
	.append("rect")
		.attr("x", (d, i)=>{ return (i * (fig_width + 20)); })
		.attr("y", (d)=>{ return (-1) * (d-svg_height); })
        .attr("width", fig_width)
		.attr("height", (d)=>{ return d; })
		.attr("fill", (d, i)=> {return ('#' + (d*i)*color)});

	console.log(data);

}).catch((error) => {
	console.log(error);
});

