d3.json("data/revenues.json").then((data)=> {
    var margin = {top: 10, right: 10, bottom: 100, left:100};
    var width= 600;
    var height= 400;
    var fig_width= 30;
    var color = 200;
    var p_inner= 0.3;
    var p_outer= 0.3;
    var revenues = [];
    var months = []; 
    var g = d3.select("body")
        .append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    data.forEach((d)=>{
        d.revenue = +d.revenue;
        console.log(d);
        revenues.push(d.revenue);
        months.push(d.month); 
    });

    var x = d3.scaleBand()
        .domain(months) 
        .range([0, width])
        .paddingInner(p_inner)
        .paddingOuter(p_outer);

    var y = d3.scaleLinear()
        .domain([0, d3.max(revenues)])
        .range([height, 0]); 

    var rects = g.selectAll("rect")
        .data(data);
    rects.enter()
        .append("rect")
        .attr("x", (d)=>{ return x(d.month); })
        .attr("y", (d)=>{ return y(d.revenue); })
        .attr("width", fig_width)
        .attr("height", (d)=>{ return height - y(d.revenue); }) // adjust height to match y-scale
        .attr("fill", 'yellow');

    var bottomAxis = d3.axisBottom(x).ticks(5); 
    g.append("g")
        .attr("class", "bottom axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(bottomAxis)
        .selectAll('text')
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-20)');

    var leftAxis = d3.axisLeft(y)
        .tickFormat((d) => '$' + d)
        .ticks(5);
    g.append('g').attr('class', 'left axis').call(leftAxis);

    g.append('text')
        .attr('class', 'y axis-label')
        .attr('x', -(height / 2))
        .attr('y', -60)
        .attr('font-size', '20px')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .style('fill', 'black')
        .text('Revenue (dlls.)');

    g.append( 'text' )
        .attr( 'x', width / 2 )
        .attr( 'y', height + 95 )
        .attr( 'font-size', '20px' )
        .attr( 'text-anchor', 'middle' )
        .style( 'fill', 'black' )
        .text( "Month" );

}).catch((error) => {
    console.log(error);
});

