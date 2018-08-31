<template>
  <div :id='containerId' class="container">
    <svg viewBox='0 0 1000 640'/>
  </div>
</template>
<script>
import sample from '~/assets/json/stats-example.json'

import * as d3 from 'd3'
import * as _ from 'lodash';

export default {
  data: () => ({
    bounds:'',
    xAxis: 'GDP',
    yAxis: 'Well-being'
  }),
  props: ['containerId'],
  mounted () {
    var xAxisOptions = ["GDP", "Equality", "Food consumption", "Alcohol consumption", "Energy consumption", "Family", "Working hours", "Work income", "Health spending", "Military spending"]
    // var yAxisOptions = ["Well-being"];
    var descriptions = {
      "GDP" : "GDP per person (US$)",
      "Energy consumption" : "Residential electricity use (kWh per year per person)",
      "Equality" : "Equality (based on GINI index) (0 = low equality, 100 = high equality)",
      "Work income" : "Hourly pay per person (US$)",
      "Food consumption": "Food supply (kCal per day per person)",
      "Family" : "Fertility (children per women)",
      "Alcohol consumption" : "Alcohol consumption (litres of pure alchohol per year per person)",
      "Working hours" : "Average working hours per week per person",
      "Military spending" : "Military spending (% of GDP)",
      "Health spending" : "Government health spending (% of government spend)"
    };
    const margin = 80

    var keys = _.keys(sample[0]);
    var csvDataParsed = this.parseData(sample);
    this.bounds = this.getBounds(csvDataParsed, 1);

    // console.log(this.containerId)
    const svg = d3.select(`#${this.containerId} svg`)

    var xScale, yScale;

    let chart = svg.append('g')
      .classed('chart', true)
      .attr('transform', 'translate(80, -60)');

    chart
      .append('text')
      .attr('id','countryLabel')
      .attr('x', 0)
      .attr('y',170)
      .style({'font-size': '80px', 'font-weight': 'bold', 'fill': '#ddd'});

    // Best fit line (to appear behind points)
    chart
      .append('line')
      .attr('id', 'bestfit');

    // Axis labels
    chart
      .append('text')
      .attr('id','xLabel')
      .attr('x', 400)
      .attr('y', 670)
      .attr('text-anchor','middle')
      .text(descriptions[this.xAxis]);

    chart
      .append('text')
      .attr('transform', 'translate(-60, 330)rotate(-90)')
      .attr('id', 'yLabel')
      .attr('text-anchor','middle')
      .text('Well-being (scale of 0-10)');
    
    this.updateScales();
    var pointColour = d3.scaleLinear().category20b();

      d3.select('svg g.chart')
        .selectAll('circle')
        .data(sample)
        .enter()
        .append('circle')
        .attr('cx', function(d) {
          return isNaN(d[this.xAxis]) ? d3.select(this).attr('cx') : xScale(d[this.xAxis]);
        })
        .attr('cy', function(d) {
          return isNaN(d[this.xAxis]) ? d3.select(this).attr('cy') : yScale(d[this.xAxis]);
        })
        .attr('fill', function(d, i) {return pointColour(i);})
        .style('cursor', 'pointer')
        .on('mouseover', function(d) {
          d3.select('svg g.chart #countryLabel')
            .text(d.Country)
            .transition()
            .style('opacity', 1);
        })
        .on('mouseout', function(d) {
          d3.select('svg g.chart #countryLabel')
            .transition()
            .duration(1500)
            .style('opacity', 0);
        });

      this.updateChart(true);
      this.updateMenus();

      // Render axes
      d3.select('svg g.chart')
        .append("g")
        .attr('transform', 'translate(0, 630)')
        .attr('id', 'xAxis')
        .call(this.makeXAxis);

      d3.select('svg g.chart')
        .append("g")
        .attr('id', 'yAxis')
        .attr('transform', 'translate(-10, 0)')
        .call(this.makeYAxis);

  },
  methods: {
    makeYAxis(s) {
      s.call(d3.svg.axis()
        .scale(yScale)
        .orient("left"));
    },
    makeXAxis(s) {
      s.call(d3.svg.axis()
        .scale(xScale)
        .orient("bottom"));
    },
    parseData(d) {
      var keys = _.keys(d[0]);
      return _.map(d, function(d) {
        var o = {};
        _.each(keys, function(k) {
          if( k == 'Country' )
            o[k] = d[k];
          else
            o[k] = parseFloat(d[k]);
        });
        return o;
      });
    },
    updateScales() {
      xScale = d3.scaleLinear()
                      .domain([this.bounds[this.xAxis].min, this.bounds[this.xAxis].max])
                      .range([20, 780]);

      yScale = d3.scaleLinear()
                      .domain([this.bounds[this.xAxis].min, this.bounds[this.xAxis].max])
                      .range([600, 100]);    
    },

    updateMenus() {
      d3.select('#x-axis-menu')
        .selectAll('li')
        .classed('selected', function(d) {
          return d === this.xAxis;
        });
      d3.select('#y-axis-menu')
        .selectAll('li')
        .classed('selected', function(d) {
          return d === this.xAxis;
      });
    },
    updateChart(init) {
        this.updateScales();

        d3.select('svg g.chart')
          .selectAll('circle')
          .transition()
          .duration(500)
          .ease('quad-out')
          .attr('cx', function(d) {
            return isNaN(d[this.xAxis]) ? d3.select(this).attr('cx') : xScale(d[this.xAxis]);
          })
          .attr('cy', function(d) {
            return isNaN(d[this.xAxis]) ? d3.select(this).attr('cy') : yScale(d[this.xAxis]);
          })
          .attr('r', function(d) {
            return isNaN(d[this.xAxis]) || isNaN(d[this.xAxis]) ? 0 : 12;
          });

        // Also update the axes
        d3.select('#xAxis')
          .transition()
          .call(this.makeXAxis);

        d3.select('#yAxis')
          .transition()
          .call(this.makeYAxis);

        // Update axis labels
        d3.select('#xLabel')
          .text(descriptions[this.xAxis]);

        // Update correlation
        var xArray = _.map(sample, function(d) {return d[this.xAxis];});
        var yArray = _.map(sample, function(d) {return d[this.xAxis];});
        var c = this.getCorrelation(xArray, yArray);
        var x1 = xScale.domain()[0], y1 = c.m * x1 + c.b;
        var x2 = xScale.domain()[1], y2 = c.m * x2 + c.b;

        // Fade in
        d3.select('#bestfit')
          .style('opacity', 0)
          .attr({'x1': xScale(x1), 'y1': yScale(y1), 'x2': xScale(x2), 'y2': yScale(y2)})
          .transition()
          .duration(1500)
          .style('opacity', 1);
      },

    getBounds(d, paddingFactor) {
      // Find min and maxes (for the scales)
      paddingFactor = typeof paddingFactor !== 'undefined' ? paddingFactor : 1;

      var keys = _.keys(d[0]), b = {};
      _.each(keys, function(k) {
        b[k] = {};
        _.each(d, function(d) {
          if(isNaN(d[k]))
            return;
          if(b[k].min === undefined || d[k] < b[k].min)
            b[k].min = d[k];
          if(b[k].max === undefined || d[k] > b[k].max)
            b[k].max = d[k];
        });
        b[k].max > 0 ? b[k].max *= paddingFactor : b[k].max /= paddingFactor;
        b[k].min > 0 ? b[k].min /= paddingFactor : b[k].min *= paddingFactor;
      });
      return b;
    },
    getCorrelation(xArray, yArray) {
      function sum(m, v) {return m + v;}
      function sumSquares(m, v) {return m + v * v;}
      function filterNaN(m, v, i) {isNaN(v) ? null : m.push(i); return m;}

      // clean the csvData (because we know that some values are missing)
      var xNaN = _.reduce(xArray, filterNaN , []);
      var yNaN = _.reduce(yArray, filterNaN , []);
      var include = _.intersection(xNaN, yNaN);
      var fX = _.map(include, function(d) {return xArray[d];});
      var fY = _.map(include, function(d) {return yArray[d];});

      var sumX = _.reduce(fX, sum, 0);
      var sumY = _.reduce(fY, sum, 0);
      var sumX2 = _.reduce(fX, sumSquares, 0);
      var sumY2 = _.reduce(fY, sumSquares, 0);
      var sumXY = _.reduce(fX, function(m, v, i) {return m + v * fY[i];}, 0);

      var n = fX.length;
      var ntor = ( ( sumXY ) - ( sumX * sumY / n) );
      var dtorX = sumX2 - ( sumX * sumX / n);
      var dtorY = sumY2 - ( sumY * sumY / n);
    
      var r = ntor / (Math.sqrt( dtorX * dtorY )); // Pearson ( http://www.stat.wmich.edu/s216/book/node122.html )
      var m = ntor / dtorX; // y = mx + b
      var b = ( sumY - m * sumX ) / n;

      // console.log(r, m, b);
      return {r: r, m: m, b: b};
    }

  }
}
</script>
<style lang="scss">
  div.container {
    width: 100%;
    //width: 750px;
    height: 500px;
    margin: auto;
    background-color: #2F4A6D;
  }

  svg {
    width: 100%;
    height: 100%;
  }

  text {
    font-size: 12px;
    fill: #fff;
  }

/* SVG styling */
// path {
// 	fill: #CED8B6;
// }

// line {
// 	stroke: #555;
// 	stroke-width: 2px;
// }

  line#bestfit {
    stroke: #ddd;
    stroke-width: 10px;
  }

  #xAxis path, #yAxis path, #xAxis line, #yAxis line {
    stroke: #ccc;
    fill: none;
    shape-rendering: crispEdges;
  }



  path {
    stroke: gray;
  }

  line {
    stroke: gray;
  }

  line#limit {
    stroke: #FED966;
    stroke-width: 3;
    stroke-dasharray: 3 6;
  }

  .grid path {
    stroke-width: 0;
  }

  .grid .tick line {
    stroke: #9FAAAE;
    stroke-opacity: 0.3;
  }

  text.divergence {
    font-size: 12px;
    fill: #2F4A6D;
  }

  text.value {
    font-size: 12px;
  }

  text.title {
    font-size: 22px;
    font-weight: 600;
  }

  text.label {
    font-size: 12px;
    font-weight: 400;
  }

  text.source {
    font-size: 10px;
  }
</style>
