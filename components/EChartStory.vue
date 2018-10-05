<template>  
  <div class="container">
    <div v-if="!showChart"  class="data-visualization__loading">
        <span class="data-visualization__loading-text">Fetching data...</span>
        <div class="lds-dual-ring">
        </div>          
    </div>
    <v-chart v-if="showChart" width="100%" auto-resize theme="story-theme" :options="options" />
    <div class="download-container">
      <md-button :md-ripple="false" class="md-primary download-button" @click="exportData">        
        <md-icon>arrow_downward</md-icon>
        CSV
      </md-button>
    </div>
  </div>
</template>
<script>
import DataMixin from '~/mixins/dataMethods.mixin.js';
const apiUrl = 'https://youthindicator.herokuapp.com/api'

export default {
  props: ['title', 'url', 'slide', 'countries'],
  data() {
    return {
      autoResize:true,
      graphData: [],
      isLoading: true,
      graphOptions: {
        xMin:100000000,
        xMax: -1000,
        yMin: 10000000,
        yMax: -10000,
      },
      options: {
        title: {
            left: 'center'
        },
        backgroundColor: 'transparent',
        tooltip: {
            axisPointer: {
                show:false
            },
            formatter: function(obj){
              var value = obj.data;
              let maxLength = 40;
              let ellipseFunction = function(val,maxLength) { return val ? val.substring(0,maxLength) : val;}
              let text = `Country: ${ellipseFunction(value[2],maxLength)} <br> ${ellipseFunction(value[6],maxLength)}: ${value[0]} <br> ${ellipseFunction(value[7],maxLength)}: ${value[1]}%`;
              if(value[4])
                text += `<br> Age: ${value[4]}`
              if(value[5])
                text += `<br> Gender: ${value[5]}`
              if(value[8]*1 != value[1]*1)
                text += `<br> Year: ${value[8]}`
              return text;

              return `Country: ${value[2]} <br> Year: ${value[0]} <br> Value: ${value[1]}%`;
            }
        },
        xAxis: {
            type: 'value',
            name: this.slide.xAxisLabel,
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
            name: this.slide.yAxisLabel,
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
        "#feb100","#668bfc","#fc566a","#20D642",
        "#A618E1","#EA4411","F3930A","#75abd0","06F7DD","0349FB","#afd6dd",
      ]
    }
  },
  mixins: [DataMixin],
  computed: {
  },
  mounted () {
    this.drawGraph();
  },
  methods: {
    async drawGraph() {
        let rawData = await this.$axios.$get(this.slide.url)
        let compareData = this.graphifyData(rawData.data, this.countries);  
        let data;
        if(this.slide.selectedGoalUrl){
          let secondRawData = await this.$axios.$get(this.slide.selectedGoalUrl);
          let secondCompareData = this.graphifyData(secondRawData.data, this.countries);  
          this.graphData = this.combineIndicators(compareData, secondCompareData); 
          data = this.graphifyEChartData(this.graphData, 'xValue', this.slide.xAxisLabel, this.slide.yAxisLabel);
        } else {
          this.graphData = compareData;
          data = this.graphifyEChartData(this.graphData, 'year', this.slide.xAxisLabel, this.slide.yAxisLabel);
        }

      // let rawData = await this.$axios.$get(this.url)
      // //let areaCodes = this.countries.map(x => x.geoAreaCode).join('&areaCode=')
      // this.graphData = this.graphifyData(rawData.data, this.countries);  
      // console.log(this.graphData)
      //const data = this.graphifyEChartData(this.graphData, 'year', this.slide.xAxisLabel, this.slide.yAxisLabel);
      //const data = this.graphifyEChartData(this.graphData);
      let ndx = 0;
      const graphType = this.slide.graphType || 'line'

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
      if(this.slide.showLinearRegression) {
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

      this.options.xAxis.name = this.slide.xAxisLabel;
      this.findMinsAndMaxs(data);
      this.options.xAxis.min = this.graphOptions.xMin - 2;
      this.options.xAxis.max = this.graphOptions.xMax + 2;
      this.options.yAxis.min = this.graphOptions.yMin;
      this.options.yAxis.max = this.graphOptions.yMax;
      this.options.yAxis.name = this.slide.yAxisLabel;
      this.showChart = true;
    },
    exportData() {
      fetch(`${apiUrl}/csv`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({csvData:this.graphData})
      }).then(()=> {
        window.open(`${apiUrl}/csv`)
      })
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
    .download-container {
      display: flex;
      justify-content: flex-start;
      height: 0;
    }
    .download-button{
      position: relative;
      //top: 30px;
    }
    .echarts {
      width: 100%;
      min-height: 500px;
      margin-top: -20px;
    }
  }
  .data-visualization{
    &__loading {
      width: 100%;
      display: flex;
      justify-content: center;
      align-content: center;
      flex-wrap: wrap;
      margin-bottom: 60px;
      min-height: 400px;
      &-text{
        margin-bottom: 20px;
        display: block;
        font-size: 18px;
        font-weight: bold;
        width: 100%;
        text-align: center;
        //color: #f6931e;
      }
    }
  }  
  $height: 100px;
$width: 100px;
.lds-dual-ring {
  display: block !important;
  width: 100% !important;
  height: $height;
  position: relative;
  left: 50%;
  transform: translateX(-50px)
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: ($width - 18px);
  height: ($height - 18px);
  margin: 1px;
  border-radius: 50%;
  border: 5px solid #0099d6;
  border-color: #0099d6 transparent #0099d6 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
