<template>
  <div :id='containerString' class="container">
    <svg viewBox='0 0 650 400'/>
  </div>
</template>
<script>
import * as d3 from 'd3'

import DataMixin from '~/mixins/dataMethods.mixin.js';
export default {
  props: ['containerId', 'title', 'countries', 'graphData'],
  data() {
    return {
      countryColors: this.countries.map(x => { return {geoAreaCode: x.geoAreaCode, color: "hsl(" + Math.random() * 360 + ", 100%, 50%)"}})
    }
  },
  mixins: [DataMixin],
  computed: {
    containerString() {
      return `container${this.containerId}`
    }
  },
  watch: {
    graphData: function(newValue) {
      this.drawGraph();
    }
  },
  mounted () {
    this.drawGraph();
  },
  methods: {
    drawGraph() {
      const svg = d3.select(`#container${this.containerId} svg`);
      svg.selectAll('*').remove();
      const margin = 80
      const width = 600 - 2 * margin
      const height = 400 - 2 * margin
      const yAxisText = this.graphData[0].seriesDescription;

      const chart = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`)

      const xScale = d3.scaleBand()
        .range([0, width])
        .domain(this.graphData.map((s) => s.year))
        .padding(0.3)

      const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, Math.max(...this.graphData.map(y=>y.value)) + 10])

      // vertical grid lines
      // const makeXLines = () => d3.axisBottom()
      //   .scale(xScale)

      const makeYLines = () => d3.axisLeft()
        .scale(yScale)

      chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(
          d3.axisBottom(xScale)
          .tickFormat((g) => `'${g.toString().substring(2,4)}`)
          )

      chart.append('g')
        .call(d3.axisLeft(yScale))


      chart.append('g')
        .attr('class', 'grid')
        .call(makeYLines()
          .tickSize(-width, 0, 0)
          .tickFormat('')
        )

      const barGroups = chart.selectAll()
        .data(this.graphData)
        .enter()
        .append('g')

      barGroups
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (g) => this.getXPosition(g, xScale))
        .attr('y', (g) => yScale(g.value))
        .attr('height', (g) => height - yScale(g.value))
        .attr('width', (g) => xScale.bandwidth() / this.getNumberOfDataPointsForField('year', g))
        .attr('fill', (g) => this.countryColors.find(x => x.geoAreaCode === g.geoAreaCode).color)
        .on('mouseenter', function (actual, i) {
          d3.selectAll('.value')
            .attr('opacity', 0)

          d3.select(this)
            .transition()
            .duration(300)
            .attr('opacity', 0.6)
            .attr('x', (a) => xScale(a.year) - 5)
            .attr('width', xScale.bandwidth() + 10)

          chart
            .append('text')
            .attr('class', 'divergence')
            .attr('x',  xScale(actual.year) + xScale.bandwidth() / 2)
            .attr('y', yScale(actual.value) - 60)
            .attr('text-anchor', 'middle')
            .text(actual.geoAreaName)

          chart
            .append('text')
            .attr('class', 'divergence')
            .attr('x',  xScale(actual.year) + xScale.bandwidth() / 2)
            .attr('y', yScale(actual.value) - 30)
            .attr('text-anchor', 'middle')
            .text(`${actual.value}%`)

          const y = yScale(actual.value)

          chart.append('line')
            .attr('id', 'limit')
            .attr('x1', 0)
            .attr('y1', y)
            .attr('x2', width)
            .attr('y2', y)

          
            // .text((a, idx) => {
            //   const divergence = (a.value - actual.value).toFixed(1)

            //   let text = ''
            //   if (divergence > 0) text += '+'
            //   text += `${a.geoAreaName} ${divergence}%`

            //   return idx !== i ? text : ''
            // })
        })
        .on('mouseleave', function () {
          d3.selectAll('.value')
            .attr('opacity', 1)

          d3.select(this)
            .transition()
            .duration(300)
            .attr('opacity', 1)
            .attr('x', (a) => xScale(a.year))
            .attr('width', xScale.bandwidth())

          chart.selectAll('#limit').remove()
          chart.selectAll('.divergence').remove()
        })

      svg
        .append('text')
        .attr('class', 'label')
        .attr('x', -(height / 2) - margin)
        .attr('y', margin / 2.4)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text(yAxisText)

      svg.append('text')
        .attr('class', 'label')
        .attr('x', width / 2 + margin)
        .attr('y', height + margin * 1.7)
        .attr('text-anchor', 'middle')
        .text('Year')

      svg.append('text')
        .attr('class', 'title')
        .attr('x', width / 2 + margin)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .text(this.title)

      svg.append('text')
        .attr('class', 'source')
        .attr('x', width - margin / 2)
        .attr('y', height + margin * 1.7)
        .attr('text-anchor', 'start')
        .text('Source: UN Stats')

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

  .bar {
    //fill: #0099d6;
  }

  text {
    font-size: 12px;
    fill: #fff;
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
    fill: #FFF;
    z-index: 100;
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
