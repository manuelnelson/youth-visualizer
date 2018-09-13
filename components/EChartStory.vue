<template>  
  <div class="container">
    <v-chart v-if="showChart" width="100%" auto-resize theme="story-theme" :options="options" />
  </div>
</template>
<script>
import DataMixin from '~/mixins/dataMethods.mixin.js';

export default {
  props: ['title', 'url', 'graphOptions', 'countries'],
  data() {
    return {
      autoResize:true,
      graphData: [],
      options: {
        title: {
            left: 'center'
        },
        tooltip: {
            axisPointer: {
                show:false
            },
            formatter: function(obj){
              var value = obj.data;
              return `Country: ${value[2]} <br> Year: ${value[0]} <br> Value: ${value[1]}%`;
            }
        },
        xAxis: {
            type: 'value',
            name: this.graphOptions.xAxisLabel,
            nameLocation: 'center',
            nameGap: 40,
            nameTextStyle: {
              color: '#fff'
            },
            min: 1990,            
            axisLabel: {
              formatter: '{value}',
              color: '#fff',
            },
            axisLine: {
              lineStyle: {
                color: '#fff',
              }
            },
        },
        yAxis: {
            type: 'value',
            name: this.graphOptions.yAxisLabel,
            nameLocation: 'center',
            nameGap: 40,
            nameTextStyle: {
              color: '#fff'
            },
            axisLine: {
              lineStyle: {
                color: '#fff',
              }
            },
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
  },
  watch: {
    graphOptions: function(newValue) {
      this.drawGraph();
    },
    graphType: function(newValue) {
      this.drawGraph();
    }
  },
  mounted () {
    this.drawGraph();
  },
  methods: {
    async drawGraph() {
      let rawData = await this.$axios.$get(this.url)
      let areaCodes = this.countries.map(x => x.geoAreaCode).join('&areaCode=')
      this.graphData = this.graphifyData(rawData.data, this.countries);  
      
      const data = this.graphifyEChartData(this.graphData);
      let ndx = 0;
      console.log('graph options')
      console.log(this.graphOptions)
      const graphType = this.graphOptions.selectedGraph || 'scatter'

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
          name: 'line',
          type: 'line',
          showSymbol: false,
          data: myRegression.points,
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
      this.options.xAxis.min = this.findXMin(data);
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
