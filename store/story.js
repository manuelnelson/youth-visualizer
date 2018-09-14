
function flattenSlide(slide) {
    Object.assign(slide, slide.graphOptions);
    delete slide.graphOptions;
    Object.assign(slide, slide.storyOptions);   
    delete slide.storyOptions;
    slide.countries = slide.countries.map(x => x.geoAreaCode);
    return slide;
}
const apiUrl = 'http://localhost:4000/api'
function addSlide(axios, slide) {
    return new Promise(async (resolve,reject) => {
        let data = await axios.$post(`${apiUrl}/slides`,slide)
        resolve(data)
    })
}

export const actions = {
    async getStory({commit},payload) {
        let data = await this.$axios.$get(`${apiUrl}/stories/${payload.id}`) 
        data.slides.forEach(slide => {
            if(slide.countries)
                slide.countries = slide.countries.split(',').map(x => payload.geolist.find(y => y.geoAreaCode === x))
            console.log(slide.countries)
        });
        commit('setStory', data);
        return data;            
    },
    async saveStory({commit}, story){
        //first post slides
        //let slides = []
        let slidePromises = []
        story.slides.forEach(slide => {
            let flatSlide = flattenSlide(slide);
            slidePromises.push(addSlide(this.$axios,flatSlide))
        })
        let dbSlides = await Promise.all(slidePromises)
        console.log(dbSlides)
        //then post story with reference to slides

        //commit
        let data = await this.$axios.$post(`${apiUrl}/stories`,{
            slides: dbSlides.map(x=>x._id)
        })  
        commit('setStory', data);
        return data;            
    },

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
            "storyOptions": {
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
            "storyOptions": {
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

