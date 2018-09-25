<template>  
  <div :id='containerString' class="container">
    <v-chart v-if="showChart" width="100%" auto-resize theme="blue-test" :options="options" />
  </div>
</template>
<script>
import DataMixin from '~/mixins/dataMethods.mixin.js';
export default {
  props: ['containerId', 'title', 'countries', 'graphData', 'graphOptions', 'graphType', 'isComparison'],
  data() {
    return {
      autoResize:true,

      options: {
        title: {
            text: this.title,
            subtext: 'By UN Stats',
            left: 'center'
        },
        tooltip: {
            axisPointer: {
                show:false
            },
            formatter: function(obj){
              var value = obj.data;
              let maxLength = 40;
              let text = `Country: ${value[2].substring(0,maxLength)} <br> ${value[6].substring(0,maxLength)}: ${value[0]} <br> ${value[7].substring(0,maxLength)}: ${value[1]}%`;
              if(value[4])
                text += `<br> Age: ${value[4]}`
              if(value[5])
                text += `<br> Sex: ${value[5]}`
              if(value[8]*1 != value[1]*1)
                text += `<br> Year: ${value[8]}`
              return text;
            }
        },
        xAxis: {
            type: 'value',
            name: this.graphOptions.xAxisLabel,
            nameLocation: 'center',
            nameGap: 40,
            min: 1990,
            axisLabel: {
              formatter: '{value}',
            },
        },
        yAxis: {
            type: 'value',
            name: this.graphOptions.yAxisLabel,
            nameLocation: 'center',
            nameGap: 40,
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
        },
        series: [],
      },
      showChart: false,
      color: [
        "#1790cf","#f6931e","#777","#88b0bb",
        "#1c7099","#038cc4","#75abd0","#afd6dd"
      ]
    }
  },
  mixins: [DataMixin],
  computed: {
    containerString() {
      return `container${this.containerId}`
    },
  },
  watch: {
    graphData: function(newValue) {
      this.drawGraph();
    },
    graphOptions: function(newValue) {
      console.log(newValue)
      this.drawGraph();
    },
    graphType: function(newValue) {
      console.log(newValue)
      this.drawGraph();
    }
  },
  mounted () {
    this.drawGraph();
  },
  methods: {
    drawGraph() {
      let data;
      if(this.isComparison){
        data = this.graphifyEChartData(this.graphData, 'xValue', this.graphOptions.xAxisLabel, this.graphOptions.yAxisLabel);
      } else {
        data = this.graphifyEChartData(this.graphData, 'year', this.graphOptions.xAxisLabel, this.graphOptions.yAxisLabel);
      }
      let ndx = 0;
      const graphType = this.graphOptions.graphType || 'scatter'
      //console.log(data[0].map(x => [x[0], 1*x[1]]));

      this.options.series = [];
      data.map(z => {
        this.options.series.push({
            name: graphType,
            type: graphType,
            label: {
                emphasis: {
                    show: false,
                }
            },
            data: z,
            itemStyle: {
              color: this.color[ndx]
            }
        })
        ndx++;
      });
      if(this.graphOptions.showLinearRegression) {
        let myRegression = this.getLinearRegressionData(data);
        this.options.series.push({
          name: myRegression.expression,
          type: 'line',
          showSymbol: true,
          data: myRegression.points,
          label: {
            show: true,
            formatter: '{a}'
          },
          markPoint: {
              itemStyle: {
                  normal: {
                      color: 'transparent'
                  }
              },
              label: {
                  normal: {
                      show: true,
                      position: 'left',
                      formatter: myRegression.expression,
                      textStyle: {
                          color: '#333',
                          fontSize: 14
                      }
                  }
              },
              data: [{
                  coord: myRegression.points[myRegression.points.length - 1]
              }]
          }
        });
      }

      this.options.xAxis.name = this.graphOptions.xAxisLabel;
      //this.options.xAxis.min = this.findXMin(data);
      this.findMinsAndMaxs(data);
      this.options.xAxis.min = this.graphOptions.xMin;
      this.options.xAxis.max = this.graphOptions.xMax;
      this.options.yAxis.min = this.graphOptions.yMin;
      this.options.yAxis.max = this.graphOptions.yMax;
      this.options.yAxis.name = this.graphOptions.yAxisLabel;
      this.showChart = true;
    }
  }
}
</script>
<style lang="scss">
  div.container {
    width: 100%;
    height: 100%;
    margin: auto;
    position: relative;
    .form-area__input {
      width: 50%;
      text-align: right;
    }
    .echarts {
      width: 100%;
      min-height: 500px;
    }
  }
  
</style>
