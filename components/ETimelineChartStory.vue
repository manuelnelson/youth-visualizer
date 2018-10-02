<template>  
  <div :id='containerString' class="container">
    <div v-if="!showChart"  class="data-visualization__loading">
        <span class="data-visualization__loading-text">Fetching data...</span>
        <div class="lds-dual-ring">
        </div>          
    </div>
    <v-chart v-if="showChart" width="100%" auto-resize theme="story-theme" :options="options" />
  </div>
</template>
<script>
import DataMixin from '~/mixins/dataMethods.mixin.js';
let colors = [
    "#1790cf","#f6931e","#777","#88b0bb",
    "#1c7099","#038cc4","#75abd0","#afd6dd"
];
let countries = [];
function getCountryColor(geoAreaCode) {
    return colors[countries.indexOf(geoAreaCode)]
};

//import data from '~/assets/json/timeline.json';
var itemStyle = {
        normal: {
            opacity: 0.8,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
    };
export default {
  props: ['containerId', 'title', 'countries', 'slide'],
  data() {
    return {
      showChart: false,
      autoResize:true,
        xMin:10000000,
        xMax:0,
        yMin:10000000,
        yMax:0,
      timeline:[],
      graphData: [],
      options: {      
        baseOption: {
          backgroundColor: 'transparent',
          timeline: {
                axisType: 'category',
                orient: 'vertical',
                autoPlay: true,
                inverse: true,
                playInterval: 3000,
                left: null,
                right: 0,
                top: 20,
                bottom: 20,
                width: 55,
                height: null,
                label: {
                    normal: {
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    emphasis: {
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                symbol: 'none',
                lineStyle: {
                    color: '#555'
                },
                checkpointStyle: {
                    color: '#bbb',
                    borderColor: '#777',
                    borderWidth: 2
                },
                controlStyle: {
                    showNextBtn: false,
                    showPrevBtn: false,
                    normal: {
                        color: '#666',
                        borderColor: '#666'
                    },
                    emphasis: {
                        color: '#aaa',
                        borderColor: '#aaa'
                    }
                },
                data: []
            },
            //backgroundColor: '#404a59',
            tooltip: {
                axisPointer: {
                    show:false
                },
                formatter: function(obj){
                  var value = obj.data;
                  let text = `Country: ${value[2]} <br> ${value[6]}: ${value[0]} <br> ${value[7]}: ${value[1]}%`;
                  if(value[4])
                    text += `<br> Age: ${value[4]}`
                  if(value[5])
                    text += `<br> Gender: ${value[5]}`
                  if(value[8]*1 != value[1]*1)
                    text += `<br> Year: ${value[8]}`
                  return text;
                }
            },
            grid: {
                top: 100,
                containLabel: true,
                left: 30,
                right: '110'
            },
            xAxis: {
                type: 'value',
                name: this.slide.xAxisLabel,
                nameLocation: 'center',
                nameGap: 20,
                nameTextStyle: {
                    color: '#ffffff'
                },
                axisLabel: {
                  formatter: '{value}',
                  color: '#ffffff'
                },
            },
            yAxis: {
                type: 'value',
                name: this.slide.yAxisLabel,
                nameLocation: 'center',
                nameTextStyle: {
                    color: '#ffffff'
                },
                nameGap: 40,
                axisLabel: {
                  color: '#ffffff'
                },
                splitLine: {
                    lineStyle: {
                        color: '#ffffff',
                        type: 'dashed'
                    }
                },
            },           
            series: [
                {
                    type: 'scatter',
                    itemStyle: itemStyle,
                    symbolSize: function(){
                        return 14;
                    }
                }
            ],
            animationDurationUpdate: 1000,
            animationEasingUpdate: 'quinticInOut'
        },
        options: []
        },
    }
  },
  mixins: [DataMixin],
  computed: {
    containerString() {
      return `container${this.containerId}`
    },
  },
  watch: {

  },
  mounted () {
      this.drawGraph();
  },
  methods: {
    async drawGraph() {
        let rawData = await this.$axios.$get(this.slide.url)
        let compareData = this.graphifyData(rawData.data, this.countries);  
        let secondRawData = await this.$axios.$get(this.slide.selectedGoalUrl);
        let secondCompareData = this.graphifyData(secondRawData.data, this.countries);  

        this.graphData = this.combineIndicators(compareData, secondCompareData); 
        console.log(this.graphData)
        this.timeline = this.getTimeline();
        countries = this.getCountries();
        for (var n = 0; n < this.timeline.length; n++) {
            this.options.baseOption.timeline.data.push(this.timeline[n]);
            this.options.options.push({
                title: {
                    show: true,
                    'text': this.timeline[n] + ''
                },
                series: {
                    name: this.timeline[n],
                    type: 'scatter',
                    itemStyle: {
                        color: function(val) {
                            return getCountryColor(val.data[3])
                        }
                    },
                    data: this.getYearData(this.timeline[n])
                }
            });
        }
        this.getMinsAndMaxs();
        this.options.baseOption.xAxis.name = this.slide.xAxisLabel;
        this.options.baseOption.xAxis.min = this.xMin;
        this.options.baseOption.xAxis.max = this.xMax;
        this.options.baseOption.yAxis.min = this.yMin;
        this.options.baseOption.yAxis.max = this.yMax;
        this.showChart = true;
    },
    getYearData(year) {
      return this.graphData.reduce((agg,x) => {
        x.map((y) => {
          if(y.year*1 === year)
            agg.push([y.xValue*1,y.value*1,y.geoAreaName,y.geoAreaCode, y.age, y.sex, this.slide.xAxisLabel, this.slide.yAxisLabel, y.year]);
        })
        return agg;
      },[]);
    },
    getTimeline(){
        let timeline = this.graphData.reduce((agg,x) => {
        x.map((y) => {
          if(agg.indexOf(y.year*1) === -1)
            agg.push(y.year*1);
        })
        return agg;
      },[]).sort(function(a, b) {
          return a - b;
      });
      return timeline;
    },
    getCountries(){
      return this.graphData.reduce((agg,x) => {
        x.map((y) => {
          if(agg.indexOf(y.geoAreaCode) === -1)
            agg.push(y.geoAreaCode);
        })
        return agg;
      },[]);
    },
    getMinsAndMaxs() {
        var that = this;
        this.graphData.forEach(x => {
            x.forEach((y) => {
                that.xMin = y.xValue*1 < that.xMin ? y.xValue*1 : that.xMin;
                that.xMax = y.xValue*1 > that.xMax ? y.xValue*1 : that.xMax;
                that.yMin = y.value*1 < that.yMin ? y.value*1 : that.yMin;
                that.yMax = y.value*1 > that.yMax ? y.value*1 : that.yMax;
            });
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
    .echarts {
      width: 100%;
      min-height: 500px;
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
  display: inline-block;
  width: $width;
  height: $height;
  margin: 0 auto;
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
