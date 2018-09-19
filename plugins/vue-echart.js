import Vue from 'vue'
import ECharts from 'vue-echarts/components/ECharts'
import blueTheme from '~/assets/json/theme.json';
import storyTheme from '~/assets/json/story-theme.json';

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/component/timeline'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'

console.log(blueTheme)
ECharts.registerTheme('blue-test', blueTheme)
ECharts.registerTheme('story-theme', storyTheme)
// register component to use
Vue.component('v-chart', ECharts)