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

    g.append('text')
        .attr('x', -(height / 2))
        .attr('y', -60)
        .attr('font-size', '20px')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .style('fill', 'black')
        .text('Life Expectancy (Years)');

    var yearLabel= g.append('text')
                    .attr('x', width - 25 * 2)
                    .attr('y', height - 20)
                    .attr('font-size', '25px')
                    .attr('text-anchor', 'right')
                    .text('0000');

var x= d3.scaleLog()
        .range([0,width])
        .base(10);
    x.domain([142, 150000]);
        
var y= d3.scaleLinear()
        .range([height, 0]);
    y.domain([0, 90]);

    var colors= d3.scaleOrdinal().range(d3.schemePastel2);

var area= d3.scaleLinear().range([25 * Math.PI, 1500 * Math.PI]);
area.domain([200, 1400000000])

var xAxisCall = d3.axisBottom(x)
            .tickFormat((d) => '$' + d)
            .ticks(5); 
var yAxisCall = d3.axisLeft(y);

xAxisGroup.call(xAxisCall);
yAxisGroup.call(yAxisCall);

var t= d3.transition().duration(2000);

d3.json("data/data.json").then((data)=> {
    const years= data.map((year) => +year['year']);
    const formattedData = data.map((year) => {
        return year["countries"].filter((country) => {
            var dataExists = (country.income && country.life_exp);
            return dataExists
        }).map((country) => {
            country.income = +country.income;
            country.life_exp = +country.life_exp;
            return country;
        })
    });
    var continents= [];
    formattedData[0].forEach((d)=>{
        (country) =>
            !continents.some((continent == country.continent) &&
            continents.push(country.continent));
    });
    colors.domain(continents);


    var rSize= 20;
    var lGroup= g.append('g')
                .style('transform', `translate(${width - rSize}px, ${height - 70}px)`);

    continents.forEach((continent, index) => {
        var countryGroup = lGroup
            .append('g')
            .style('transform', `translate(0px, ${-15 * index}px)`);
            countryGroup
                .append('text')
                .attr('font-size', '20px')
                .attr('text-anchor', 'end')
                .attr('x', -8)
                .attr('y', 18)
                .style('text-transform', 'capitalize')
                .text(continent);
            countryGroup
                .append('rect')
                .attr('width', rSize)
                .attr('height', rSize)
                .style('fill', colors(continent));
    });

    var stepsPerSecond= 10;
    var index= 0;
    d3.interval( ( ) => {
        //console.log("Hello World");
        update(formattedData[index % formattedData.length],
        years[index % years.length]);
        index+= stepsPerSecond;
    }, 1000);
        update(formattedData[index % formattedData.length], years[index % years.length]);
        index += stepsPerSecond;

}).catch((error) => {
    console.log(error);
});

function update(data, year){
	yearLabel.text(year);
    var circles= g.selectAll("circle").data(data, (d) => d.country);
    circles.exit()
            .transition(t)
            .attr("cx", (d)=> {return x(d.income);})
            .attr("cy", (d)=> {return y(d.life_exp);})
			.attr("r", (d) => { Math.sqrt(area(d.population) / Math.PI)})
            .remove();
    circles.transition(t)
            .attr('cx', (d) => x(d.income))
            .attr('cy', (d) => y(d.life_exp))
            .attr('r', (d) => Math.sqrt(area(d.population) / Math.PI));
    circles.enter().append("circle")
            .attr("cx", (d)=> {return x(d.income);})
            .attr("cy", (d)=> {return y(d.life_exp);})
			.attr("r", (d) => { Math.sqrt(area(d.population) / Math.PI)})
            .attr("fill", (d) => colors(d.continent))
            .merge(circles)
            .transition(t)
            .attr('cx', (d) => x(d.income))
            .attr('cy', (d) => y(d.life_exp))
            .attr('r', (d) => Math.sqrt(area(d.population) / Math.PI));
}

