/* Pie chart */
var w = 200,
    h = 200,
    r = 100,
    color = d3.scale.category10();     //builtin range of colors
             
var data = JSON.parse($("#devicesData").text());
console.log("devicesData:", data);
                                                
var vis = d3.select("#pie")
            .append("svg:svg")
            .attr('class', 'chart')
            .data([data])
                .attr("width", w)           
                .attr("height", h)
                .append("svg:g")                //make a group to hold our pie chart
                .attr("transform", "translate(" + r + "," + r + ")")    
                 
var arc = d3.svg.arc()
        .outerRadius(r);
         
var pie = d3.layout.pie()          
            .value(function(d) { return d.value; });
         
var arcs = vis.selectAll("g.slice")   
            .data(pie)                   
            .enter()            
            .append("svg:g")   
            .attr("class", "slice");
                                                             
arcs.append("svg:path")
    .attr("fill", function(d, i) { return color(i); } ) 
    .attr("d", arc);                                   

arcs.append("svg:text")                           
    .transition()
    .duration(500)
    .attr("transform", function(d) {                 
                //we have to make sure to set these before calling arc.centroid
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";    
            })
    .attr("text-anchor", "middle")                 
    .text(function(d, i) { return data[i].label; });


/* bar graph */

function humanizeTime (secs) {
  if(secs < 60) return secs+' secs.';
  var min = Math.round((secs / 60), 0);
  if(min < 60) return min + ' mins';
  var hour = Math.round((min / 60), 0);
  min = min % 60;
  if(min == 0) return hour + ' hours';
  return hour + ' hours, ' + min + ' mins';
}

var dayTotals = $("#dayTotalsData").text().split(',');
var tmp = [];
dayTotals.map(function(day){
    tmp.push(parseInt(day));
});
dayTotals = tmp;
console.log('dayTotals:', dayTotals);
var weekDays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

var labelsWidth = 65;
var chart,
    width = 400,
    bar_height = 20,
    margins = 2,
    height = (bar_height+margins) * dayTotals.length;

var x = d3.scale.linear()
            .domain([0, d3.max(dayTotals)])
            .range([0, width - labelsWidth]);
var y = d3.scale.ordinal()
            .domain(dayTotals)
            .rangeBands([0, height]);

chart = d3.select("#dayTotals")
          .append('svg')
          .attr('class', 'chart2')
          .attr('width', width)
          .attr('height', height);

chart.selectAll("rect")
    .data(dayTotals)
    .enter().append("rect")
    .attr("y", y)
    .attr("height", y.rangeBand())
    .attr("x", function(){ return labelsWidth;})
    .transition()
    .duration(1000)
        .attr("width", x);

chart.selectAll("text.day")
    .data(dayTotals).enter().append("text")
    .attr("x", function(d){ return labelsWidth - 5; })
    .attr("y", function(d){ return y(d)+y.rangeBand()/2;})
    .attr("dy", ".36em")
    .attr("text-anchor", "end")
    .attr('fill', 'dimgray')
    .text(function(d,i){ return weekDays[i]; });

chart.selectAll("text.time")
    .data(dayTotals)
    .enter().append("text")
    .attr('opacity', 0)
    .attr("x", function(d){ 
        if(x(d) < 100)
            return x(d) + labelsWidth + 5;
        else
            return x(d) + labelsWidth - 5;})
    .attr("y", function(d){ return y(d)+y.rangeBand()/2;})
    .attr("dy", ".36em")
    .attr("text-anchor", function(d){
        if(x(d) < 100)
            return "begining";
        else 
            return "end";})
    .text(function(d,i){ return '(' + humanizeTime(d) + ')';})
    .transition()
    .duration(700)
    .delay(600)
        .attr('opacity', 1);

/* HOT TIMES */
var dayWidth = 35;
var hourWidth = 35;
var timeHeight = 10;
var headerHeight = 20;
var width = (dayWidth+1)*7 + hourWidth+1;
var height = 600;
var color = function(d){
    var colours = [ '#c6dbef', 
                    '#9ecae1',
                    '#6baed6',
                    '#3182bd'];
    var totalWeeks = 1;
    //TODO: calculate totalWeeks correctly
    return colours[Math.round((colours.length - 1) * d / totalWeeks)];
}

var hotData = JSON.parse($("#hotData").text());
console.log('hotData:', hotData);

var hotChart = d3.select("#hotTimes")
                  .append('svg')
                  .attr('class', 'chart')
                  .attr('width', width)
                  .attr('height', height);
var hours = [];
for(var a=0; a<24; a++)
  hours.push(a+':00');

hotChart.selectAll("hours.space")
        .data(hours)
        .enter()
        .append("rect")
        .attr("x", function(){ return 0;})
        .attr("y", function(d,i){ return headerHeight+1 + i*(headerHeight+2);})
        .attr("height", function(){ return headerHeight+1; })
        .attr("width", function(){ return hourWidth; })
        .attr('fill', function(){ return '#ddd'; });
hotChart.selectAll("hours.name")
        .data(hours)
        .enter()
        .append("text")
        .attr("x", function(){ return hourWidth/2;})
        .attr("y", function(d,i){ return headerHeight*1.5 + i*(headerHeight+2);})
        .attr("fill", function(){return 'dimgray';})
        .attr("text-anchor", "middle")                 
        .attr("dy", ".50em")
        .text(function(d){ return d; });

hotChart.selectAll("dayName")
        .data(weekDays)
        .enter()
        .append("rect")
        .attr("x", function(d,i){return hourWidth + i*(dayWidth+1);})
        .attr("y", function(){return 0;})
        .attr("height", function(){return headerHeight;})
        .attr("width", function(){return dayWidth;})
        .attr("fill", function(){return '#ddd';});
hotChart.selectAll("text.dayName")
        .data(weekDays)
        .enter()
        .append("text")
        .attr("x", function(d,i){return hourWidth + i*(dayWidth+1)+dayWidth/2;})
        .attr("y", function(){return headerHeight/2;})
        .attr("fill", function(){return 'dimgray';})
        .attr("text-anchor", "middle")                 
        .attr("dy", ".36em")
        .text(function(d,i){ return weekDays[i]; });

for(h in hotData){
    hotChart.selectAll("rect"+h)
        .data(hotData[h])
        .enter()
        .append("rect")
        .attr("y", function(d,i){ return headerHeight+1 + i*(timeHeight+1);})
        .attr("height", function(){ return timeHeight; })
        .attr("x", function(){ return hourWidth + h*(dayWidth+1);})
        .attr("width", function(){ return dayWidth; })
        .attr('fill', function(){ return '#ddd'; })
        .transition()
        .duration(2000)
        .attr('fill', function(d){ return color(d); });
}
