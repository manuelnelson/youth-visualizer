import * as ecStat from 'echarts-stat';

let DataMixin = {
  methods: {
    graphifyData(data, countries) {
      //parse year data to JSON 
      let countryData = countries.map(x => data.find(resultData => resultData.geoAreaCode === x.geoAreaCode)).filter(z => typeof z != 'undefined');
      let years = countryData.map(y => JSON.parse(y.years.replace(/\"\[|\]\"/g,'')).filter(year => year.value > 0).map(z => Object.assign(z,{geoAreaCode: y.geoAreaCode, geoAreaName: y.geoAreaName, age: y.age, sex: y.sex})));
      return years;
      // return below code for d3js
      // let final = years.reduce((agg,x) => {agg = agg.concat(...x); return agg}, [])
      // console.log(final)
      // return final
    },
    graphifyEChartData(graphData) {
      const eChartData = graphData.map(x=> {
        return x.map(y => {
          return [y.year,y.value,y.geoAreaName,y.geoAreaCode, y.age, y.sex]
        })
      })
      return eChartData;
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
    getLinearRegressionData(graphData) {
      console.log('flat data')
      let flatData = graphData.reduce((agg,x) => {
        x.map(y => {
          agg.push([y[0], 1*y[1]])
        });
        return agg;
      },[]);
      console.log(flatData);

      var myRegression = ecStat.regression('linear', flatData);
      myRegression.points.sort(function(a, b) {
          return a[0] - b[0];
      });
      return myRegression;
    }

  }
}

export default DataMixin;