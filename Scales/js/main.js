d3.json("data/buildings.json").then((data)=> {
    
    var svg_width= 500;
    var svg_height= 500;
    var fig_width= 30;
    var color = 200;
    var p_inner= 0.3;
    var p_outer= 0.3;
    var heights = [];

	data.forEach((d)=>{

		d.height = +d.height;
		heights.push(d.height);

	});

    var min_max= d3.extent(data, (d)=> {
       return d.height;
    });
    var min= min_max[0];
    var max= min_max[1];

    console.log("HEIGHTS: " + heights);
    console.log("MIN_MAX: " + min_max);
    console.log("MIN: " + min + " - MAX: " + max);

    var x = d3.scaleBand()
        .domain(heights)
        .range([0, svg_width])
        .paddingInner(p_inner)
        .paddingOuter(p_outer);

    var y = d3.scaleLinear()
        .domain([0, max])
        .range([0, svg_width]);
    
    console.log("Y: " + y(max));

	var svg= d3.select("#chart-area").append("svg")
	.attr("width", svg_width)
	.attr("height", svg_height)

	var rects= svg.selectAll("rect")
	.data(heights);

	rects.enter()
	.append("rect")
		.attr("x", (d)=>{ return x(d); })
		.attr("y", (d)=>{ return y(d); })
        .attr("width", fig_width)
		.attr("height", (d)=>{ return d; })
		.attr("fill", (d, i)=> {return ('#' + (d*i)*color)});

}).catch((error) => {
	console.log(error);
});


