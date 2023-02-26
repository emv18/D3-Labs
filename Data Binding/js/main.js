var data = [25, 20, 15, 10, 5];

var svg= d3.select("#chart-area").append("svg")
    .attr("width", 400)
    .attr("height", 400);

var rects= svg.selectAll("rect")
    .data(data);

rects.enter()
    .append("rect")
        .attr("x", (d, i)=>{ return (i * 50); })
        .attr("y", (d)=>{ return (-1) * (d-400); })
        .attr("width", 40)
        .attr("height", (d)=>{ return d; })
        .attr("fill", "blue");