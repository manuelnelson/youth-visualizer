export const actions = {
}

export const getters = {
    story: state => state.story,
  };
  
export const mutations = {
    setStory: (state,payload) => {
        console.log('payload')
        console.log(payload)
        state.story = payload
    },
    setSlideActive: (state, payload) => {
        state.story.slides.forEach(slide => {
            slide.active = false;
        });
        state.story.slides[payload].active = true;
    }
};
export const state = () => ({
    story: {
        "slides": [
          {
            "active": false,
            "url": "https://unstats.un.org/SDGAPI/v1//sdg/Indicator/PivotData?indicator=1.1.1&areaCode=4&areaCode=372&areaCode=364&dimensions=%5B%5D&pageSize=500",
            "graphOptions": {
              "graphType": "scatter",
              "xAxisLabel": "Year",
              "yAxisLabel": "Proportion of population below international poverty line (%)",
              "selectedGraph": "scatter",
              "showLinearRegression": false
            },
            "story": {
              "title": "Examing population beneath the poverty line",
              "text": "As you can see, there's varios things we can draw from this data (despite it being somewhat incomplete)"
            },
            "countries": [
              {
                "geoAreaCode": "4",
                "geoAreaName": "Afghanistan"
              },
              {
                "geoAreaCode": "372",
                "geoAreaName": "Ireland"
              },
              {
                "geoAreaCode": "364",
                "geoAreaName": "Iran (Islamic Republic of)"
              }
            ]
          },
          {
            "active": false,
            "url": "https://unstats.un.org/SDGAPI/v1//sdg/Indicator/PivotData?indicator=1.a.2&areaCode=4&areaCode=372&areaCode=364&dimensions=%5B%5D&pageSize=500",
            "graphOptions": {
              "graphType": "scatter",
              "xAxisLabel": "Year",
              "yAxisLabel": "Proportion of total government spending on essential services, education (%)",
              "selectedGraph": "line",
              "showLinearRegression": true
            },
            "story": {
              "title": "Examing total government spending on essential services",
              "text": "As you can see, there's varios things we can draw from this data (despite it being somewhat incomplete)"
            },
            "countries": [
              {
                "geoAreaCode": "4",
                "geoAreaName": "Afghanistan"
              },
              {
                "geoAreaCode": "372",
                "geoAreaName": "Ireland"
              },
              {
                "geoAreaCode": "364",
                "geoAreaName": "Iran (Islamic Republic of)"
              }
            ]
          }
        ]
      }
})

