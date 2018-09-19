
function flattenSlide(slide) {
    Object.assign(slide, slide.graphOptions);
    delete slide.graphOptions;
    Object.assign(slide, slide.storyOptions);   
    delete slide.storyOptions;
    slide.countries = slide.countries.map(x => x.geoAreaCode);
    return slide;
}
const apiUrl = 'https://youthindicator.herokuapp.com/api'
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
        });
        //add shareable slide
        data.slides.push({
            title: 'Thanks for viewing!',
            text: `If you'd like to share this story with others, use the button below to copy the link`,
            showCopy: true
        })
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
        Vue.set(state.story.slides[payload],'active',true);
    }
};
export const state = () => ({
    story: {}
})

