import * as ecStat from 'echarts-stat';

let DataMixin = {
  computed: {
  },
  methods: {
    graphifyData(data, countries) {
      //parse year data to JSON 
      let countryData = countries.map(x => data.find(resultData => resultData.geoAreaCode === x.geoAreaCode)).filter(z => typeof z != 'undefined');
      let years = countryData.map(y => JSON.parse(y.years.replace(/\"\[|\]\"/g,'')).filter(year => year.value > 0).map(z => Object.assign(z,{geoAreaCode: y.geoAreaCode, geoAreaName: y.geoAreaName, age: y.age, sex: y.sex})));
      return years;
    },
    graphifyEChartData(graphData, xKey, xAxisLabel, yAxisLabel) {
      const eChartData = graphData.map(x=> {
        return x.map(y => {
          return [y[xKey],y.value,y.geoAreaName,y.geoAreaCode, y.age, y.sex, xAxisLabel, yAxisLabel, y.year]
        })
      })
      return eChartData;
    },
    averageYearData(graphData) {
      //console.log(graphData)
      let averageCountryData = graphData.map((countryData) => {
        let overallSum = countryData.reduce((sum, x) => {
          sum = sum + (isNaN(x.value) ? 0 : x.value*1);
          return sum;
        }, 0);
        const average = overallSum / countryData.length;
        return Object.assign(countryData[0], {value: average});
      })
      console.log(averageCountryData);
      return averageCountryData;
    },
    findXMin(graphData) {
      let xMin = 100000000;
      graphData.forEach(x => {
        x.map(datum => {
          xMin = datum[0] < xMin ? datum[0] : xMin
        })      
      });
      return xMin - 1;
    },
    //cycles through data - adding unique non null fields to dimension list
    getDimensionList(data, dimension) {
      return data.reduce((agg, dataRow) => {
        if(dataRow[dimension] && agg.indexOf(dataRow[dimension]) === -1) {
          agg.push(dataRow[dimension]);
        }
        return agg;
      }, [])
    },
    getNumberOfDataPointsForField(fieldName, dataPoint) {
      return this.graphData.filter(x => x[fieldName] === dataPoint[fieldName]).length;
    },
    getXPosition(g, xScale) {
      // console.log('xScale',xScale(g.year))
      // console.log((xScale.bandwidth() / this.getNumberOfDataPointsForField('year', g))*this.getNdxOfDataPointForField('year', g))
      return xScale(g.year) + (xScale.bandwidth() / this.getNumberOfDataPointsForField('year', g))*this.getNdxOfDataPointForField('year', g)
    },
    getNdxOfDataPointForField(fieldName, dataPoint) {      
      return this.graphData.filter(x => x[fieldName] === dataPoint[fieldName]).indexOf(dataPoint);
    },
    combineIndicators(firstIndicator, secondIndicator) {
      //group by country
      let flattenedSecondIndicator = this.flattenDataset(secondIndicator);
      let final = firstIndicator.map(countryData => {
        return countryData.reduce((agg,x) => {
        let countryMatch = flattenedSecondIndicator.find(y=> y.geoAreaCode === x.geoAreaCode && y.year === x.year);
        if(countryMatch){
          agg.push(Object.assign(x, {xValue: countryMatch.value}))
        }
        return agg;
        //return countryMatch.map(z => Object.assign(x, {xValue: z.value}))
      }, [])
      })
      return final;
    },
    flattenDataset(dataset) {
      return dataset.reduce((agg,x) => {
        agg = agg.concat(...x);
        return agg;
      }, [])
    },
    //no need to match year
    combineIndicatorsAverage(firstIndicator, secondIndicator) {
      //group by country
      let fullCountryData = firstIndicator.reduce((agg,x) => {
        let countryMatch = secondIndicator.find(y=> y.geoAreaCode === x.geoAreaCode);
        if(countryMatch)
          agg.push(Object.assign(x, {"xValue": countryMatch.value}))
        return agg;
        //return countryMatch.map(z => Object.assign(x, {xValue: z.value}))
      }, [])
      return fullCountryData;
    },
    getLinearRegressionData(graphData) {
      let flatData = graphData.reduce((agg,x) => {
        x.map(y => {
          agg.push([y[0]*1, 1*y[1]])
        });
        return agg;
      },[]);

      var myRegression = ecStat.regression('linear', flatData);
      console.log(myRegression)
      myRegression.points.sort(function(a, b) {
          return a[0] - b[0];
      });
      return myRegression;
    }

  }
}

export default DataMixin;