d3.json("data/ages.json").then((data)=> {

	var ages = [];
	var color = "#";

	data.forEach((d)=>{

		d.age = +d.age;
		ages.push(d.age);

	});

	console.log("------------" + ages + "-----------");
	var svg= d3.select("#chart-area").append("svg")
	.attr("width", 400)
	.attr("height", 400)
	.attr("fill", "blue");

	var circs= svg.selectAll("circle")
	.data(ages);

	circs.enter()
	.append("circle")
		.attr("cx", (d, i)=>{ return (i * 25); })
		.attr("cy", (d)=>{ return (-1) * (d-40); })
		.attr("r", (d)=>{ return d; })
		.attr("fill", (d)=> {return (color + d*80)});

	console.log(data);

}).catch((error) => {
	console.log(error);
})