d3.json("data/data.json").then(function(data){
	console.log(data);
})

var margin = {top: 10, right: 10, bottom: 100, left:100};
var width= 600;
var height= 400;
var fig_width= 30;
var color = 200;
var p_inner= 0.3;
var p_outer= 0.3;
var incomes = [];
var years = []; 

var flag= true;

var g = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var xAxisGroup = g.append("g").attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")");

var yAxisGroup= g.append("g")
    .attr("class", "y-axis");

    g.append( 'text' )
        .attr( 'x', width / 2 )
        .attr( 'y', height + 95 )
        .attr( 'font-size', '20px' )
        .attr( 'text-anchor', 'middle' )
        .style( 'fill', 'black' )
        .text( "GDP Per Capita ($)" );

var yLabel= g.append('text')
        .attr('class', 'y axis-label')
        .attr('x', -(height / 2))
        .attr('y', -60)
        .attr('font-size', '20px')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .style('fill', 'black')
        .text('Life Expectancy (Years)');

var x= d3.scaleBand()
        .range([0,width])
        .padding(0.2);
        
var y= d3.scaleLinear()
        .range([height, 0]);

var xAxisCall = d3.axisBottom(x); 
var yAxisCall = d3.axisLeft(y)
                .tickFormat((d) => '$' + d)
                .ticks(5);

d3.json("data/data.json").then((data)=> {
    data.forEach((d)=>{
        d.income = +d.income;
        console.log(d);
        incomes.push(d.income);
        years.push(d.life_exp); 
    });

    d3.interval( ( ) => {
        //console.log("Hello World");
        var newData = flag ? data : data.slice(1);
        update(newData);
        flag= !flag;
    }, 1000);
    update(data);

}).catch((error) => {
    console.log(error);
});

function update(data){
	yearLabel.text(year);

    x.domain(data.map((d)=>{return d.life_exp;}));
    y.domain([0, d3.max(data, (d)=>{return d.income;})]);
    xAxisGroup.call(xAxisCall);
    yAxisGroup.call(yAxisCall);

    var circles= g.selectAll("circle").data(data);
    circles.exit().remove();
    circles.attr("cx", (d)=> {return x(d.life_exp);})
                .attr("cy", (d)=> {return y(d.income);})
				.attr("r", (d) => { Math.sqrt(area(d.population) / Math.PI)})
				.remove();
    
    circles.enter().append("circle")
            .attr("cx", (d)=> {return x(d.life_exp);})
            .attr("cy", (d)=> {return y(d.income);})
			.attr("r", (d) => { Math.sqrt(area(d.population) / Math.PI)})
            .attr("fill", "yellow");
}

