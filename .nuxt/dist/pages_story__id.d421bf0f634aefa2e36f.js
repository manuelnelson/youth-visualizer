webpackJsonp([4],{"1sEA":function(e,a,o){"use strict";var r=o("Xxa5"),t=o.n(r),n=o("exGp"),i=o.n(n),g=o("cXjC");a.a={props:["title","url","slide","countries"],data:function(){return{autoResize:!0,graphData:[],options:{title:{left:"center"},tooltip:{axisPointer:{show:!1},formatter:function(e){var a=e.data;return"Country: "+a[2]+" <br> Year: "+a[0]+" <br> Value: "+a[1]+"%"}},xAxis:{type:"value",name:this.slide.xAxisLabel,nameLocation:"center",nameGap:40,nameTextStyle:{color:"#fff"},min:1990,axisLabel:{formatter:"{value}",color:"#fff"},axisLine:{lineStyle:{color:"#fff"}}},yAxis:{type:"value",name:this.slide.yAxisLabel,nameLocation:"center",nameGap:40,nameTextStyle:{color:"#fff"},axisLine:{lineStyle:{color:"#fff"}},splitLine:{lineStyle:{type:"dashed"}}},series:[]},showChart:!1,color:["#1790cf","#f6931e","#777","#88b0bb","#1c7099","#038cc4","#75abd0","#afd6dd"]}},mixins:[g.a],computed:{},watch:{graphOptions:function(e){this.drawGraph()},graphType:function(e){this.drawGraph()}},mounted:function(){this.drawGraph()},methods:{drawGraph:function(){var e=i()(t.a.mark(function e(){var a,o,r,n,i,g=this;return t.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.$axios.$get(this.url);case 2:a=e.sent,this.graphData=this.graphifyData(a.data,this.countries),o=this.graphifyEChartData(this.graphData),r=0,n=this.slide.graphType||"scatter",this.options.series=[],o.map(function(e){g.options.series.push({name:n,type:n,label:{emphasis:{show:!1}},data:e,itemStyle:{color:g.color[r]}}),r++}),this.slide.showLinearRegression&&(i=this.getLinearRegressionData(o),this.options.series.push({name:"line",type:"line",showSymbol:!1,data:i.points,markPoint:{itemStyle:{normal:{color:"transparent"}},label:{normal:{show:!0,position:"left",formatter:i.expression,textStyle:{color:"#333",fontSize:14}}},data:[{coord:i.points[i.points.length-1]}]}})),this.options.xAxis.name=this.slide.xAxisLabel,this.options.xAxis.min=this.findXMin(o),this.options.yAxis.name=this.slide.yAxisLabel,this.showChart=!0;case 14:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}}},BaLX:function(e,a,o){(e.exports=o("FZ+f")(!1)).push([e.i,"div.container{width:100%;height:100%;margin:auto;position:relative}div.container .form-area__input{width:50%;text-align:right}div.container .echarts{width:100%;min-height:500px;margin-top:-20px}",""])},GY9q:function(e,a,o){!function(a,o){e.exports=o()}(0,function(){return function(e){var a={};function o(r){if(a[r])return a[r].exports;var t=a[r]={exports:{},id:r,loaded:!1};return e[r].call(t.exports,t,t.exports,o),t.loaded=!0,t.exports}return o.m=e,o.c=a,o.p="",o(0)}([function(e,a,o){var r;void 0===(r=function(e){return{clustering:o(1),regression:o(5),statistics:o(6),histogram:o(15)}}.call(a,o,a,e))||(e.exports=r)},function(e,a,o){var r;void 0===(r=function(e){var a=o(2).dataPreprocess,r=o(3),t=r.size,n=r.sumOfColumn,i=r.sum,g=r.zeros,s=r.isArray,A=Math.sqrt,d=Math.pow;function m(e,a){for(var o,r,n,i,s=t(e),A=g(s[0],2),m=function(e,a){for(var o,r,n,i=t(e),s=g(a,i[1]),A=0;A<i[1];A++){o=e[0][A],r=e[0][A];for(var d=1;d<i[0];d++)e[d][A]<o&&(o=e[d][A]),e[d][A]>r&&(r=e[d][A]);n=r-o;for(var d=0;d<a;d++)s[d][A]=o+n*Math.random()}return s}(e,a),c=!0;c;){c=!1;for(var C=0;C<s[0];C++){o=1/0,r=-1;for(var N=0;N<a;N++)(n=u(e[C],m[N]))<o&&(o=n,r=N);A[C][0]!==r&&(c=!0),A[C][0]=r,A[C][1]=d(o,2)}for(C=0;C<a;C++){i=[];for(N=0;N<A.length;N++)A[N][0]===C&&i.push(e[N]);m[C]=l(i)}}return{centroids:m,clusterAssigned:A}}function l(e){for(var a,o,r=t(e),n=[],i=0;i<r[1];i++){a=0;for(var g=0;g<r[0];g++)a+=e[g][i];o=a/r[0],n.push(o)}return n}function u(e,a){if(!s(e)&&!s(a))return A(d(e-a,2));for(var o=0,r=0;r<e.length;r++)o+=d(e[r]-a[r],2);return A(o)}return{kMeans:m,hierarchicalKMeans:function(e,o,r){if(!(o<2)){for(var s,A,c,C,N,f,h,p=a(e),v=t(p),y=g(v[0],2),x=l(p),b=[x],M=0;M<v[0];M++)s=u(p[M],x),y[M][1]=d(s,2);var S=1,w={isEnd:!1},I={next:function(){if(S<o){var e,a,r;A=1/0;for(var t=0;t<b.length;t++){c=[],C=[];for(var g=0;g<y.length;g++)y[g][0]===t?c.push(p[g]):C.push(y[g][1]);N=m(c,2),f=n(N.clusterAssigned,1),h=i(C),f+h<A&&(A=h+f,e=t,a=N.centroids,r=N.clusterAssigned)}for(g=0;g<r.length;g++)0===r[g][0]?r[g][0]=e:1===r[g][0]&&(r[g][0]=b.length);for(b[e]=a[0],b.push(a[1]),g=0,t=0;g<y.length&&t<r.length;g++)y[g][0]===e&&(y[g][0]=r[t][0],y[g][1]=r[t++][1]);var s=[];for(g=0;g<b.length;g++)for(s[g]=[],t=0;t<y.length;t++)y[t][0]===g&&s[g].push(p[t]);w.clusterAssment=y,w.centroids=b,w.pointsInCluster=s,S++}else w.isEnd=!0;return w}};if(r)return I;for(;!(w=I.next()).isEnd;);return w}}}}.call(a,o,a,e))||(e.exports=r)},function(e,a,o){var r;void 0===(r=function(e){var a=o(3),r=a.isArray,t=a.size,n=o(4).isNumber;return{dataPreprocess:function(e){if(!r(e))throw new Error("Invalid data type, you should input an array");var a=[],o=t(e);if(1===o.length)for(var i=0;i<o[0];i++)n(e[i])&&a.push(e[i]);else if(2===o.length)for(i=0;i<o[0];i++){for(var g=!0,s=0;s<o[1];s++)n(e[i][s])||(g=!1);g&&a.push(e[i])}return a},getPrecision:function(e){var a=e.toString(),o=a.indexOf(".");return o<0?0:a.length-1-o}}}.call(a,o,a,e))||(e.exports=r)},function(e,a,o){var r;void 0===(r=function(e){var a=Object.prototype.toString,o=Array.prototype.map;function r(e){return"[object Array]"===a.call(e)}function t(e,a){return e>a?1:e<a?-1:e===a?0:NaN}return{size:function(e){for(var a=[];r(e);)a.push(e.length),e=e[0];return a},isArray:r,zeros:function(e,a){for(var o=[],r=0;r<e;r++){o[r]=[];for(var t=0;t<a;t++)o[r][t]=0}return o},sum:function(e){for(var a=0,o=0;o<e.length;o++)a+=e[o];return a},sumOfColumn:function(e,a){for(var o=0,r=0;r<e.length;r++)o+=e[r][a];return o},ascending:t,bisect:function(e,a,o,r){for(null==o&&(o=0),null==r&&(r=e.length);o<r;){var n=Math.floor((o+r)/2),i=t(e[n],a);if(i>0)r=n;else{if(!(i<0))return n+1;o=n+1}}return o},map:function(e,a,r){if(e&&a){if(e.map&&e.map===o)return e.map(a,r);for(var t=[],n=0,i=e.length;n<i;n++)t.push(a.call(r,e[n],n,e));return t}}}}.call(a,o,a,e))||(e.exports=r)},function(e,a,o){var r;void 0===(r=function(e){return{isNumber:function(e){return"number"==typeof(e=null===e?NaN:+e)&&!isNaN(e)},isInteger:function(e){return isFinite(e)&&e===Math.round(e)}}}.call(a,o,a,e))||(e.exports=r)},function(e,a,o){var r;void 0===(r=function(e){var a=o(2).dataPreprocess,r={linear:function(e){for(var o=a(e),r=0,t=0,n=0,i=0,g=o.length,s=0;s<g;s++)r+=o[s][0],t+=o[s][1],n+=o[s][0]*o[s][1],i+=o[s][0]*o[s][0];for(var A=(g*n-r*t)/(g*i-r*r),d=t/g-A*r/g,m=[],l=0;l<o.length;l++){var u=[o[l][0],A*o[l][0]+d];m.push(u)}return{points:m,parameter:{gradient:A,intercept:d},expression:"y = "+Math.round(100*A)/100+"x + "+Math.round(100*d)/100}},linearThroughOrigin:function(e){for(var o=a(e),r=0,t=0,n=0;n<o.length;n++)r+=o[n][0]*o[n][0],t+=o[n][0]*o[n][1];for(var i=t/r,g=[],s=0;s<o.length;s++){var A=[o[s][0],o[s][0]*i];g.push(A)}return{points:g,parameter:{gradient:i},expression:"y = "+Math.round(100*i)/100+"x"}},exponential:function(e){for(var o=a(e),r=0,t=0,n=0,i=0,g=0,s=0;s<o.length;s++)o[s][0],r+=o[s][1],g+=o[s][0]*o[s][1],t+=o[s][0]*o[s][0]*o[s][1],n+=o[s][1]*Math.log(o[s][1]),i+=o[s][0]*o[s][1]*Math.log(o[s][1]);for(var A=r*t-g*g,d=Math.pow(Math.E,(t*n-g*i)/A),m=(r*i-g*n)/A,l=[],u=0;u<o.length;u++){var c=[o[u][0],d*Math.pow(Math.E,m*o[u][0])];l.push(c)}return{points:l,parameter:{coefficient:d,index:m},expression:"y = "+Math.round(100*d)/100+"e^("+Math.round(100*m)/100+"x)"}},logarithmic:function(e){for(var o=a(e),r=0,t=0,n=0,i=0,g=0;g<o.length;g++)r+=Math.log(o[g][0]),t+=o[g][1]*Math.log(o[g][0]),n+=o[g][1],i+=Math.pow(Math.log(o[g][0]),2);for(var s=(g*t-n*r)/(g*i-r*r),A=(n-s*r)/g,d=[],m=0;m<o.length;m++){var l=[o[m][0],s*Math.log(o[m][0])+A];d.push(l)}return{points:d,parameter:{gradient:s,intercept:A},expression:"y = "+Math.round(100*A)/100+" + "+Math.round(100*s)/100+"ln(x)"}},polynomial:function(e,o){var r=a(e);void 0===o&&(o=2);for(var t=[],n=[],i=o+1,g=0;g<i;g++){for(var s=0,A=0;A<r.length;A++)s+=r[A][1]*Math.pow(r[A][0],g);n.push(s);for(var d=[],m=0;m<i;m++){for(var l=0,u=0;u<r.length;u++)l+=Math.pow(r[u][0],g+m);d.push(l)}t.push(d)}t.push(n);var c=function(e,a){for(var o=0;o<e.length-1;o++){for(var r=o,t=o+1;t<e.length-1;t++)Math.abs(e[o][t])>Math.abs(e[o][r])&&(r=t);for(var n=o;n<e.length;n++){var i=e[n][o];e[n][o]=e[n][r],e[n][r]=i}for(var g=o+1;g<e.length-1;g++)for(var s=e.length-1;s>=o;s--)e[s][g]-=e[s][o]/e[o][o]*e[o][g]}for(var A=new Array(a),d=e.length-1,t=e.length-2;t>=0;t--){for(var i=0,o=t+1;o<e.length-1;o++)i+=e[o][t]*A[o];A[t]=(e[d][t]-i)/e[t][t]}return A}(t,i),C=[];for(g=0;g<r.length;g++){var N=0;for(A=0;A<c.length;A++)N+=c[A]*Math.pow(r[g][0],A);C.push([r[g][0],N])}var f="y = ";for(g=c.length-1;g>=0;g--)f+=g>1?Math.round(c[g]*Math.pow(10,g+1))/Math.pow(10,g+1)+"x^"+g+" + ":1===g?Math.round(100*c[g])/100+"x + ":Math.round(100*c[g])/100;return{points:C,parameter:c,expression:f}}};return function(e,a,o){return r[e](a,o)}}.call(a,o,a,e))||(e.exports=r)},function(e,a,o){var r;void 0===(r=function(e){var a={};return a.max=o(7),a.deviation=o(8),a.mean=o(10),a.median=o(12),a.min=o(14),a.quantile=o(13),a.sampleVariance=o(9),a.sum=o(11),a}.call(a,o,a,e))||(e.exports=r)},function(e,a,o){var r;void 0===(r=function(e){var a=o(4).isNumber;return function(e){for(var o=-1/0,r=0;r<e.length;r++)a(e[r])&&e[r]>o&&(o=e[r]);return o}}.call(a,o,a,e))||(e.exports=r)},function(e,a,o){var r;void 0===(r=function(e){var a=o(9);return function(e){var o=a(e);return o?Math.sqrt(o):o}}.call(a,o,a,e))||(e.exports=r)},function(e,a,o){var r;void 0===(r=function(e){var a=o(4).isNumber,r=o(10);return function(e){var o=e.length;if(!o||o<2)return 0;if(e.length>=2){for(var t,n=r(e),i=0,g=0;g<e.length;g++)a(e[g])&&(i+=(t=e[g]-n)*t);return i/(e.length-1)}}}.call(a,o,a,e))||(e.exports=r)},function(e,a,o){var r;void 0===(r=function(e){var a=o(11);return function(e){return e.length?a(e)/e.length:0}}.call(a,o,a,e))||(e.exports=r)},function(e,a,o){var r;void 0===(r=function(e){var a=o(4).isNumber;return function(e){var o=e.length;if(!o)return 0;for(var r=0,t=0;t<o;t++)a(e[t])&&(r+=e[t]);return r}}.call(a,o,a,e))||(e.exports=r)},function(e,a,o){var r;void 0===(r=function(e){var a=o(13);return function(e){return a(e,.5)}}.call(a,o,a,e))||(e.exports=r)},function(e,a,o){var r;void 0===(r=function(e){return function(e,a){var o=e.length;if(!o)return 0;if(a<=0||o<2)return e[0];if(a>=1)return e[o-1];var r=(o-1)*a,t=Math.floor(r),n=e[t];return n+(e[t+1]-n)*(r-t)}}.call(a,o,a,e))||(e.exports=r)},function(e,a,o){var r;void 0===(r=function(e){var a=o(4).isNumber;return function(e){for(var o=1/0,r=0;r<e.length;r++)a(e[r])&&e[r]<o&&(o=e[r]);return o}}.call(a,o,a,e))||(e.exports=r)},function(e,a,o){var r;void 0===(r=function(e){var a=o(7),r=o(14),t=o(13),n=o(8),i=o(2),g=i.dataPreprocess,s=(i.getPrecision,o(3)),A=s.ascending,d=s.map,m=o(16),l=s.bisect,u=o(17);var c={squareRoot:function(e){var a=Math.ceil(Math.sqrt(e.length));return a>50?50:a},scott:function(e,a,o){return Math.ceil((o-a)/(3.5*n(e)*Math.pow(e.length,-1/3)))},freedmanDiaconis:function(e,a,o){return e.sort(A),Math.ceil((o-a)/(2*(t(e,.75)-t(e,.25))*Math.pow(e.length,-1/3)))},sturges:function(e){return Math.ceil(Math.log(e.length)/Math.LN2)+1}};return function(e,o){o=null==o?c.squareRoot:c[o];for(var t=g(e),n=a(t),i=r(t),s=o(t,i,n),A=u(i,n,s),C=-Math.floor(Math.log(Math.abs(n-i)/s)/Math.LN10),N=m(+(Math.ceil(i/A)*A).toFixed(C),+(Math.floor(n/A)*A).toFixed(C),A,C),f=N.length,h=new Array(f+1),p=0;p<=f;p++)h[p]={},h[p].sample=[],h[p].x0=p>0?N[p-1]:N[p]-i===A?i:N[p]-A,h[p].x1=p<f?N[p]:n-N[p-1]===A?n:N[p-1]+A;for(p=0;p<t.length;p++)i<=t[p]&&t[p]<=n&&h[l(N,t[p],0,f)].sample.push(t[p]);return{bins:h,data:e=d(h,function(e){return[+((e.x0+e.x1)/2).toFixed(C),e.sample.length]}),customData:d(h,function(e){return[e.x0,e.x1,e.sample.length]})}}}.call(a,o,a,e))||(e.exports=r)},function(e,a,o){var r;void 0===(r=function(e){var a=o(2).getPrecision;return function(e,o,r,t){var n=arguments.length;n<2?(o=e,e=0,r=1):n<3?r=1:t=n<4?a(r=+r):+t;for(var i=Math.ceil(((o-e)/r).toFixed(t)),g=new Array(i+1),s=0;s<i+1;s++)g[s]=+(e+s*r).toFixed(t);return g}}.call(a,o,a,e))||(e.exports=r)},function(e,a,o){var r;void 0===(r=function(e){return function(e,a,o){var r=Math.abs(a-e)/o,t=Math.floor(Math.log(r)/Math.LN10),n=Math.pow(10,t),i=r/n;return i>=Math.sqrt(50)?n*=10:i>=Math.sqrt(10)?n*=5:i>=Math.sqrt(2)&&(n*=2),+(a>=e?n:-n).toFixed(-t)}}.call(a,o,a,e))||(e.exports=r)}])})},HE96:function(e,a,o){var r=o("BaLX");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);o("rjj0")("40f433c2",r,!1,{sourceMap:!1})},QcoR:function(e,a,o){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=o("XJGt"),t=o("txdJ"),n=!1;var i=function(e){n||o("k9tm")},g=o("VU/8")(r.a,t.a,!1,i,null,null);g.options.__file="pages\\story\\_id.vue",a.default=g.exports},SlGN:function(e,a,o){"use strict";var r=function(){var e=this.$createElement,a=this._self._c||e;return a("div",{staticClass:"container"},[this.showChart?a("v-chart",{attrs:{width:"100%","auto-resize":"",theme:"story-theme",options:this.options}}):this._e()],1)};r._withStripped=!0;var t={render:r,staticRenderFns:[]};a.a=t},XJGt:function(e,a,o){"use strict";var r=o("Xxa5"),t=o.n(r),n=o("exGp"),i=o.n(n),g=o("Dd8w"),s=o.n(g),A=o("NYxO"),d=o("xvF0"),m=o("yTml"),l=o.n(m);a.a={data:function(){return{slideIndex:0}},layout:"story-layout",components:{EChartComponent:d.a},computed:s()({},Object(A.mapGetters)({story:"story/story"})),mounted:function(){var e=i()(t.a.mark(function e(){return t.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getStory({id:this.$route.params.id,geolist:l.a});case 2:this.story&&this.story.slides&&this.story.slides.length>0&&(this.setSlideActive(this.slideIndex),console.log("activeslide"),console.log(this.story));case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),methods:s()({},Object(A.mapActions)({getStory:"story/getStory"}),Object(A.mapMutations)({setSlideActive:"story/setSlideActive"}),{nextSlide:function(){if(this.slideIndex+1===this.story.slides.length)return this.slideIndex=0,void this.setSlideActive(this.slideIndex);this.slideIndex++,this.setSlideActive(this.slideIndex)}})}},btwY:function(e,a,o){(e.exports=o("FZ+f")(!1)).push([e.i,".story-container{background-color:rgba(0,0,0,.8);height:100vh;width:100vw;color:#fff;position:relative;overflow:hidden}.story-container__slide{padding:30px 10vw;height:100%;width:100%;position:absolute}.story-container__slide-text{margin-bottom:20px;font-size:20px;font-size:1.25rem}.story-container__slide h2{font-size:34px;font-size:2.125rem;line-height:1.4;text-align:center;margin-bottom:8px}.story-container__actions{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.story-container p{max-width:80ch;margin:0 auto;line-height:1.2}.fade-enter-active,.fade-leave-active{-webkit-transition:opacity 1.4s;transition:opacity 1.4s}.fade-enter,.fade-leave-to{opacity:0}.transition-left{opacity:0;-webkit-transform:translateX(-100%);transform:translateX(-100%);-webkit-transition:opacity 1.4s,-webkit-transform 1.4s;transition:opacity 1.4s,-webkit-transform 1.4s;transition:opacity 1.4s,transform 1.4s;transition:opacity 1.4s,transform 1.4s,-webkit-transform 1.4s}.transition-left.left{opacity:1;-webkit-transform:translateX(0);transform:translateX(0)}.transition-up{opacity:0;-webkit-transform:translateY(100%);transform:translateY(100%);-webkit-transition:opacity 1.4s,-webkit-transform 1.4s;transition:opacity 1.4s,-webkit-transform 1.4s;transition:opacity 1.4s,transform 1.4s;transition:opacity 1.4s,transform 1.4s,-webkit-transform 1.4s}.transition-up.up{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}",""])},cXjC:function(e,a,o){"use strict";var r=o("woOf"),t=o.n(r),n=o("siuG"),i=(o.n(n),{methods:{graphifyData:function(e,a){var o=a.map(function(a){return e.find(function(e){return e.geoAreaCode===a.geoAreaCode})}).filter(function(e){return void 0!==e});return console.log("data"),console.log(e),console.log("countries"),console.log(a),o.map(function(e){return JSON.parse(e.years.replace(/\"\[|\]\"/g,"")).filter(function(e){return e.value>0}).map(function(a){return t()(a,{geoAreaCode:e.geoAreaCode,geoAreaName:e.geoAreaName})})})},graphifyEChartData:function(e){return e.map(function(e){return e.map(function(e){return[e.year,e.value,e.geoAreaName,e.geoAreaCode]})})},findXMin:function(e){var a=1e8;return e.forEach(function(e){e.map(function(e){a=e[0]<a?e[0]:a})}),a-1},getDimensionList:function(e,a){return e.reduce(function(e,o){return o[a]&&-1===e.indexOf(o[a])&&e.push(o[a]),e},[])},getNumberOfDataPointsForField:function(e,a){return this.graphData.filter(function(o){return o[e]===a[e]}).length},getXPosition:function(e,a){return a(e.year)+a.bandwidth()/this.getNumberOfDataPointsForField("year",e)*this.getNdxOfDataPointForField("year",e)},getNdxOfDataPointForField:function(e,a){return this.graphData.filter(function(o){return o[e]===a[e]}).indexOf(a)},getLinearRegressionData:function(e){console.log("flat data");var a=e.reduce(function(e,a){return a.map(function(a){e.push([a[0],1*a[1]])}),e},[]);console.log(a);var o=n.regression("linear",a);return o.points.sort(function(e,a){return e[0]-a[0]}),o}}});a.a=i},k9tm:function(e,a,o){var r=o("btwY");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);o("rjj0")("b1fe123e",r,!1,{sourceMap:!1})},siuG:function(e,a,o){e.exports=o("GY9q")},txdJ:function(e,a,o){"use strict";var r=function(){var e=this,a=e.$createElement,o=e._self._c||a;return o("div",[o("div",{staticClass:"story-container"},[e.story.slides?o("div",[o("transition-group",{attrs:{name:"fade"}},e._l(e.story.slides,function(a,r){return a.active?o("div",{key:r,staticClass:"story-container__slide"},[o("div",{staticClass:"story-container__slide-text"},[o("h2",{directives:[{name:"delay",rawName:"v-delay",value:{delay:800,cssClass:"up"},expression:"{delay:800,cssClass:'up'}"}],staticClass:"transition-up"},[e._v(e._s(a.title))]),o("p",{directives:[{name:"delay",rawName:"v-delay",value:{delay:1800,cssClass:"up"},expression:"{delay:1800,cssClass:'up'}"}],staticClass:"transition-up",domProps:{innerHTML:e._s(a.text)}})]),a.url?o("div",{directives:[{name:"delay",rawName:"v-delay",value:{delay:2400,cssClass:"up"},expression:"{delay:2400,cssClass:'up'}"}],staticClass:"story-container__slide-graph transition-up"},[o("e-chart-component",{attrs:{title:"title",slide:a,url:a.url,countries:a.countries}})],1):e._e(),o("div",{directives:[{name:"delay",rawName:"v-delay",value:{delay:2400,cssClass:"up"},expression:"{delay:2400,cssClass:'up'}"}],staticClass:"story-container__actions transition-up"},[o("md-button",{staticClass:"md-primary md-raised",on:{click:e.nextSlide}},[e._v("\n            Continue\n            "),o("md-icon",[e._v("arrow_right_alt")])],1)],1)]):e._e()}))],1):e._e()])])};r._withStripped=!0;var t={render:r,staticRenderFns:[]};a.a=t},xvF0:function(e,a,o){"use strict";var r=o("1sEA"),t=o("SlGN"),n=!1;var i=function(e){n||o("HE96")},g=o("VU/8")(r.a,t.a,!1,i,null,null);g.options.__file="components\\EChartStory.vue",a.a=g.exports},yTml:function(e,a){e.exports=[{geoAreaCode:"4",geoAreaName:"Afghanistan"},{geoAreaCode:"248",geoAreaName:"Åland Islands"},{geoAreaCode:"8",geoAreaName:"Albania"},{geoAreaCode:"12",geoAreaName:"Algeria"},{geoAreaCode:"16",geoAreaName:"American Samoa"},{geoAreaCode:"20",geoAreaName:"Andorra"},{geoAreaCode:"24",geoAreaName:"Angola"},{geoAreaCode:"660",geoAreaName:"Anguilla"},{geoAreaCode:"10",geoAreaName:"Antarctica"},{geoAreaCode:"28",geoAreaName:"Antigua and Barbuda"},{geoAreaCode:"32",geoAreaName:"Argentina"},{geoAreaCode:"51",geoAreaName:"Armenia"},{geoAreaCode:"533",geoAreaName:"Aruba"},{geoAreaCode:"36",geoAreaName:"Australia"},{geoAreaCode:"40",geoAreaName:"Austria"},{geoAreaCode:"31",geoAreaName:"Azerbaijan"},{geoAreaCode:"44",geoAreaName:"Bahamas"},{geoAreaCode:"48",geoAreaName:"Bahrain"},{geoAreaCode:"50",geoAreaName:"Bangladesh"},{geoAreaCode:"52",geoAreaName:"Barbados"},{geoAreaCode:"112",geoAreaName:"Belarus"},{geoAreaCode:"56",geoAreaName:"Belgium"},{geoAreaCode:"84",geoAreaName:"Belize"},{geoAreaCode:"204",geoAreaName:"Benin"},{geoAreaCode:"60",geoAreaName:"Bermuda"},{geoAreaCode:"64",geoAreaName:"Bhutan"},{geoAreaCode:"68",geoAreaName:"Bolivia (Plurinational State of)"},{geoAreaCode:"70",geoAreaName:"Bosnia and Herzegovina"},{geoAreaCode:"72",geoAreaName:"Botswana"},{geoAreaCode:"74",geoAreaName:"Bouvet Island"},{geoAreaCode:"76",geoAreaName:"Brazil"},{geoAreaCode:"92",geoAreaName:"British Virgin Islands"},{geoAreaCode:"86",geoAreaName:"British Indian Ocean Territory"},{geoAreaCode:"96",geoAreaName:"Brunei Darussalam"},{geoAreaCode:"100",geoAreaName:"Bulgaria"},{geoAreaCode:"854",geoAreaName:"Burkina Faso"},{geoAreaCode:"108",geoAreaName:"Burundi"},{geoAreaCode:"116",geoAreaName:"Cambodia"},{geoAreaCode:"120",geoAreaName:"Cameroon"},{geoAreaCode:"124",geoAreaName:"Canada"},{geoAreaCode:"132",geoAreaName:"Cabo Verde"},{geoAreaCode:"136",geoAreaName:"Cayman Islands"},{geoAreaCode:"140",geoAreaName:"Central African Republic"},{geoAreaCode:"148",geoAreaName:"Chad"},{geoAreaCode:"152",geoAreaName:"Chile"},{geoAreaCode:"156",geoAreaName:"China"},{geoAreaCode:"344",geoAreaName:"China, Hong Kong Special Administrative Region"},{geoAreaCode:"446",geoAreaName:"China, Macao Special Administrative Region"},{geoAreaCode:"162",geoAreaName:"Christmas Island"},{geoAreaCode:"166",geoAreaName:"Cocos (Keeling) Islands"},{geoAreaCode:"170",geoAreaName:"Colombia"},{geoAreaCode:"174",geoAreaName:"Comoros"},{geoAreaCode:"178",geoAreaName:"Congo"},{geoAreaCode:"180",geoAreaName:"Democratic Republic of the Congo"},{geoAreaCode:"184",geoAreaName:"Cook Islands"},{geoAreaCode:"188",geoAreaName:"Costa Rica"},{geoAreaCode:"384",geoAreaName:"Côte d'Ivoire"},{geoAreaCode:"191",geoAreaName:"Croatia"},{geoAreaCode:"192",geoAreaName:"Cuba"},{geoAreaCode:"196",geoAreaName:"Cyprus"},{geoAreaCode:"203",geoAreaName:"Czechia"},{geoAreaCode:"208",geoAreaName:"Denmark"},{geoAreaCode:"262",geoAreaName:"Djibouti"},{geoAreaCode:"212",geoAreaName:"Dominica"},{geoAreaCode:"214",geoAreaName:"Dominican Republic"},{geoAreaCode:"218",geoAreaName:"Ecuador"},{geoAreaCode:"818",geoAreaName:"Egypt"},{geoAreaCode:"222",geoAreaName:"El Salvador"},{geoAreaCode:"226",geoAreaName:"Equatorial Guinea"},{geoAreaCode:"232",geoAreaName:"Eritrea"},{geoAreaCode:"233",geoAreaName:"Estonia"},{geoAreaCode:"231",geoAreaName:"Ethiopia"},{geoAreaCode:"238",geoAreaName:"Falkland Islands (Malvinas)"},{geoAreaCode:"234",geoAreaName:"Faroe Islands"},{geoAreaCode:"242",geoAreaName:"Fiji"},{geoAreaCode:"246",geoAreaName:"Finland"},{geoAreaCode:"250",geoAreaName:"France"},{geoAreaCode:"254",geoAreaName:"French Guiana"},{geoAreaCode:"258",geoAreaName:"French Polynesia"},{geoAreaCode:"260",geoAreaName:"French Southern Territories"},{geoAreaCode:"266",geoAreaName:"Gabon"},{geoAreaCode:"270",geoAreaName:"Gambia"},{geoAreaCode:"268",geoAreaName:"Georgia"},{geoAreaCode:"276",geoAreaName:"Germany"},{geoAreaCode:"288",geoAreaName:"Ghana"},{geoAreaCode:"292",geoAreaName:"Gibraltar"},{geoAreaCode:"300",geoAreaName:"Greece"},{geoAreaCode:"304",geoAreaName:"Greenland"},{geoAreaCode:"308",geoAreaName:"Grenada"},{geoAreaCode:"312",geoAreaName:"Guadeloupe"},{geoAreaCode:"316",geoAreaName:"Guam"},{geoAreaCode:"320",geoAreaName:"Guatemala"},{geoAreaCode:"831",geoAreaName:"Guernsey"},{geoAreaCode:"324",geoAreaName:"Guinea"},{geoAreaCode:"624",geoAreaName:"Guinea-Bissau"},{geoAreaCode:"328",geoAreaName:"Guyana"},{geoAreaCode:"332",geoAreaName:"Haiti"},{geoAreaCode:"334",geoAreaName:"Heard Island and McDonald Islands"},{geoAreaCode:"336",geoAreaName:"Holy See"},{geoAreaCode:"340",geoAreaName:"Honduras"},{geoAreaCode:"348",geoAreaName:"Hungary"},{geoAreaCode:"352",geoAreaName:"Iceland"},{geoAreaCode:"356",geoAreaName:"India"},{geoAreaCode:"360",geoAreaName:"Indonesia"},{geoAreaCode:"364",geoAreaName:"Iran (Islamic Republic of)"},{geoAreaCode:"368",geoAreaName:"Iraq"},{geoAreaCode:"372",geoAreaName:"Ireland"},{geoAreaCode:"833",geoAreaName:"Isle of Man"},{geoAreaCode:"376",geoAreaName:"Israel"},{geoAreaCode:"380",geoAreaName:"Italy"},{geoAreaCode:"388",geoAreaName:"Jamaica"},{geoAreaCode:"392",geoAreaName:"Japan"},{geoAreaCode:"832",geoAreaName:"Jersey"},{geoAreaCode:"400",geoAreaName:"Jordan"},{geoAreaCode:"398",geoAreaName:"Kazakhstan"},{geoAreaCode:"404",geoAreaName:"Kenya"},{geoAreaCode:"296",geoAreaName:"Kiribati"},{geoAreaCode:"408",geoAreaName:"Democratic People's Republic of Korea"},{geoAreaCode:"410",geoAreaName:"Republic of Korea"},{geoAreaCode:"414",geoAreaName:"Kuwait"},{geoAreaCode:"417",geoAreaName:"Kyrgyzstan"},{geoAreaCode:"418",geoAreaName:"Lao People's Democratic Republic"},{geoAreaCode:"428",geoAreaName:"Latvia"},{geoAreaCode:"422",geoAreaName:"Lebanon"},{geoAreaCode:"426",geoAreaName:"Lesotho"},{geoAreaCode:"430",geoAreaName:"Liberia"},{geoAreaCode:"434",geoAreaName:"Libya"},{geoAreaCode:"438",geoAreaName:"Liechtenstein"},{geoAreaCode:"440",geoAreaName:"Lithuania"},{geoAreaCode:"442",geoAreaName:"Luxembourg"},{geoAreaCode:"807",geoAreaName:"The former Yugoslav Republic of Macedonia"},{geoAreaCode:"450",geoAreaName:"Madagascar"},{geoAreaCode:"454",geoAreaName:"Malawi"},{geoAreaCode:"458",geoAreaName:"Malaysia"},{geoAreaCode:"462",geoAreaName:"Maldives"},{geoAreaCode:"466",geoAreaName:"Mali"},{geoAreaCode:"470",geoAreaName:"Malta"},{geoAreaCode:"584",geoAreaName:"Marshall Islands"},{geoAreaCode:"474",geoAreaName:"Martinique"},{geoAreaCode:"478",geoAreaName:"Mauritania"},{geoAreaCode:"480",geoAreaName:"Mauritius"},{geoAreaCode:"175",geoAreaName:"Mayotte"},{geoAreaCode:"484",geoAreaName:"Mexico"},{geoAreaCode:"583",geoAreaName:"Micronesia (Federated States of)"},{geoAreaCode:"498",geoAreaName:"Republic of Moldova"},{geoAreaCode:"492",geoAreaName:"Monaco"},{geoAreaCode:"496",geoAreaName:"Mongolia"},{geoAreaCode:"499",geoAreaName:"Montenegro"},{geoAreaCode:"500",geoAreaName:"Montserrat"},{geoAreaCode:"504",geoAreaName:"Morocco"},{geoAreaCode:"508",geoAreaName:"Mozambique"},{geoAreaCode:"104",geoAreaName:"Myanmar"},{geoAreaCode:"516",geoAreaName:"Namibia"},{geoAreaCode:"520",geoAreaName:"Nauru"},{geoAreaCode:"524",geoAreaName:"Nepal"},{geoAreaCode:"528",geoAreaName:"Netherlands"},{geoAreaCode:"530",geoAreaName:"Netherlands Antilles"},{geoAreaCode:"540",geoAreaName:"New Caledonia"},{geoAreaCode:"554",geoAreaName:"New Zealand"},{geoAreaCode:"558",geoAreaName:"Nicaragua"},{geoAreaCode:"562",geoAreaName:"Niger"},{geoAreaCode:"566",geoAreaName:"Nigeria"},{geoAreaCode:"570",geoAreaName:"Niue"},{geoAreaCode:"574",geoAreaName:"Norfolk Island"},{geoAreaCode:"580",geoAreaName:"Northern Mariana Islands"},{geoAreaCode:"578",geoAreaName:"Norway"},{geoAreaCode:"512",geoAreaName:"Oman"},{geoAreaCode:"586",geoAreaName:"Pakistan"},{geoAreaCode:"585",geoAreaName:"Palau"},{geoAreaCode:"275",geoAreaName:"State of Palestine"},{geoAreaCode:"591",geoAreaName:"Panama"},{geoAreaCode:"598",geoAreaName:"Papua New Guinea"},{geoAreaCode:"600",geoAreaName:"Paraguay"},{geoAreaCode:"604",geoAreaName:"Peru"},{geoAreaCode:"608",geoAreaName:"Philippines"},{geoAreaCode:"612",geoAreaName:"Pitcairn"},{geoAreaCode:"616",geoAreaName:"Poland"},{geoAreaCode:"620",geoAreaName:"Portugal"},{geoAreaCode:"630",geoAreaName:"Puerto Rico"},{geoAreaCode:"634",geoAreaName:"Qatar"},{geoAreaCode:"638",geoAreaName:"Réunion"},{geoAreaCode:"642",geoAreaName:"Romania"},{geoAreaCode:"643",geoAreaName:"Russian Federation"},{geoAreaCode:"646",geoAreaName:"Rwanda"},{geoAreaCode:"654",geoAreaName:"Saint Helena"},{geoAreaCode:"659",geoAreaName:"Saint Kitts and Nevis"},{geoAreaCode:"662",geoAreaName:"Saint Lucia"},{geoAreaCode:"666",geoAreaName:"Saint Pierre and Miquelon"},{geoAreaCode:"882",geoAreaName:"Samoa"},{geoAreaCode:"674",geoAreaName:"San Marino"},{geoAreaCode:"678",geoAreaName:"Sao Tome and Principe"},{geoAreaCode:"682",geoAreaName:"Saudi Arabia"},{geoAreaCode:"686",geoAreaName:"Senegal"},{geoAreaCode:"688",geoAreaName:"Serbia"},{geoAreaCode:"690",geoAreaName:"Seychelles"},{geoAreaCode:"694",geoAreaName:"Sierra Leone"},{geoAreaCode:"702",geoAreaName:"Singapore"},{geoAreaCode:"703",geoAreaName:"Slovakia"},{geoAreaCode:"705",geoAreaName:"Slovenia"},{geoAreaCode:"90",geoAreaName:"Solomon Islands"},{geoAreaCode:"706",geoAreaName:"Somalia"},{geoAreaCode:"710",geoAreaName:"South Africa"},{geoAreaCode:"239",geoAreaName:"South Georgia and the South Sandwich Islands"},{geoAreaCode:"728",geoAreaName:"South Sudan"},{geoAreaCode:"724",geoAreaName:"Spain"},{geoAreaCode:"144",geoAreaName:"Sri Lanka"},{geoAreaCode:"729",geoAreaName:"Sudan"},{geoAreaCode:"740",geoAreaName:"Suriname"},{geoAreaCode:"744",geoAreaName:"Svalbard and Jan Mayen Islands"},{geoAreaCode:"748",geoAreaName:"Eswatini"},{geoAreaCode:"752",geoAreaName:"Sweden"},{geoAreaCode:"756",geoAreaName:"Switzerland"},{geoAreaCode:"760",geoAreaName:"Syrian Arab Republic"},{geoAreaCode:"158",geoAreaName:"Other non-specified areas"},{geoAreaCode:"762",geoAreaName:"Tajikistan"},{geoAreaCode:"834",geoAreaName:"United Republic of Tanzania"},{geoAreaCode:"764",geoAreaName:"Thailand"},{geoAreaCode:"626",geoAreaName:"Timor-Leste"},{geoAreaCode:"768",geoAreaName:"Togo"},{geoAreaCode:"772",geoAreaName:"Tokelau"},{geoAreaCode:"776",geoAreaName:"Tonga"},{geoAreaCode:"780",geoAreaName:"Trinidad and Tobago"},{geoAreaCode:"788",geoAreaName:"Tunisia"},{geoAreaCode:"792",geoAreaName:"Turkey"},{geoAreaCode:"795",geoAreaName:"Turkmenistan"},{geoAreaCode:"796",geoAreaName:"Turks and Caicos Islands"},{geoAreaCode:"798",geoAreaName:"Tuvalu"},{geoAreaCode:"800",geoAreaName:"Uganda"},{geoAreaCode:"804",geoAreaName:"Ukraine"},{geoAreaCode:"784",geoAreaName:"United Arab Emirates"},{geoAreaCode:"826",geoAreaName:"United Kingdom of Great Britain and Northern Ireland"},{geoAreaCode:"840",geoAreaName:"United States of America"},{geoAreaCode:"581",geoAreaName:"United States Minor Outlying Islands"},{geoAreaCode:"858",geoAreaName:"Uruguay"},{geoAreaCode:"860",geoAreaName:"Uzbekistan"},{geoAreaCode:"548",geoAreaName:"Vanuatu"},{geoAreaCode:"862",geoAreaName:"Venezuela (Bolivarian Republic of)"},{geoAreaCode:"704",geoAreaName:"Viet Nam"},{geoAreaCode:"876",geoAreaName:"Wallis and Futuna Islands"},{geoAreaCode:"732",geoAreaName:"Western Sahara"},{geoAreaCode:"887",geoAreaName:"Yemen"},{geoAreaCode:"894",geoAreaName:"Zambia"},{geoAreaCode:"716",geoAreaName:"Zimbabwe"},{geoAreaCode:"14",geoAreaName:"Eastern Africa"},{geoAreaCode:"17",geoAreaName:"Middle Africa"},{geoAreaCode:"18",geoAreaName:"Southern Africa"},{geoAreaCode:"11",geoAreaName:"Western Africa"},{geoAreaCode:"29",geoAreaName:"Caribbean"},{geoAreaCode:"13",geoAreaName:"Central America"},{geoAreaCode:"5",geoAreaName:"South America"},{geoAreaCode:"15",geoAreaName:"Northern Africa"},{geoAreaCode:"202",geoAreaName:"Sub-Saharan Africa"},{geoAreaCode:"419",geoAreaName:"Latin America and the Caribbean"},{geoAreaCode:"21",geoAreaName:"Northern America"},{geoAreaCode:"2",geoAreaName:"Africa"},{geoAreaCode:"19",geoAreaName:"Americas"},{geoAreaCode:"1",geoAreaName:"World"},{geoAreaCode:"143",geoAreaName:"Central Asia"},{geoAreaCode:"30",geoAreaName:"Eastern Asia"},{geoAreaCode:"35",geoAreaName:"South-Eastern Asia"},{geoAreaCode:"34",geoAreaName:"Southern Asia"},{geoAreaCode:"145",geoAreaName:"Western Asia"},{geoAreaCode:"151",geoAreaName:"Eastern Europe"},{geoAreaCode:"154",geoAreaName:"Northern Europe"},{geoAreaCode:"39",geoAreaName:"Southern Europe"},{geoAreaCode:"155",geoAreaName:"Western Europe"},{geoAreaCode:"53",geoAreaName:"Australia and New Zealand"},{geoAreaCode:"54",geoAreaName:"Melanesia"},{geoAreaCode:"57",geoAreaName:"Micronesia"},{geoAreaCode:"61",geoAreaName:"Polynesia"},{geoAreaCode:"150",geoAreaName:"Europe"},{geoAreaCode:"142",geoAreaName:"Asia"},{geoAreaCode:"9",geoAreaName:"Oceania"},{geoAreaCode:"830",geoAreaName:"Channel Islands"},{geoAreaCode:"535",geoAreaName:"Bonaire, Sint Eustatius and Saba"},{geoAreaCode:"531",geoAreaName:"Curaçao"},{geoAreaCode:"652",geoAreaName:"Saint Barthélemy"},{geoAreaCode:"663",geoAreaName:"Saint Martin (French Part)"},{geoAreaCode:"670",geoAreaName:"Saint Vincent and the Grenadines"},{geoAreaCode:"534",geoAreaName:"Sint Maarten (Dutch part)"},{geoAreaCode:"850",geoAreaName:"United States Virgin Islands"},{geoAreaCode:"680",geoAreaName:"Sark"},{geoAreaCode:"199",geoAreaName:"Least Developed Countries (LDCs)"},{geoAreaCode:"722",geoAreaName:"Small island developing States (SIDS)"},{geoAreaCode:"432",geoAreaName:"Landlocked developing countries (LLDCs)"},{geoAreaCode:"514",geoAreaName:"Developed regions (Europe, Cyprus, Israel, Northern America, Japan, Australia & New Zealand)"},{geoAreaCode:"515",geoAreaName:"Developing regions"},{geoAreaCode:"412",geoAreaName:"Kosovo"},{geoAreaCode:"62",geoAreaName:"Central and Southern Asia"},{geoAreaCode:"127",geoAreaName:"Southern Asia (excluding India)"},{geoAreaCode:"135",geoAreaName:"Caucasus and Central Asia"},{geoAreaCode:"198",geoAreaName:"Organisation for Economic Co-operation and Development (OECD) Member States"},{geoAreaCode:"223",geoAreaName:"Eastern Asia (excluding Japan and China)"},{geoAreaCode:"420",geoAreaName:"Latin America"},{geoAreaCode:"485",geoAreaName:"Western Asia (exc. Armenia, Azerbaijan, Cyprus, Israel and Georgia)"},{geoAreaCode:"513",geoAreaName:"Europe and Northern America"},{geoAreaCode:"518",geoAreaName:"Eastern Asia (excluding Japan)"},{geoAreaCode:"543",geoAreaName:"Oceania (exc. Australia and New Zealand)"},{geoAreaCode:"593",geoAreaName:"Development Assistance Committee members (DAC)"},{geoAreaCode:"738",geoAreaName:"Sub-Saharan Africa (inc. Sudan)"},{geoAreaCode:"746",geoAreaName:"Northern Africa (exc. Sudan)"},{geoAreaCode:"747",geoAreaName:"Northern Africa and Western Asia"},{geoAreaCode:"753",geoAreaName:"Eastern and South-Eastern Asia"},{geoAreaCode:"889",geoAreaName:"World Trade Organization (WTO) Member States"},{geoAreaCode:"891",geoAreaName:"Serbia and Montenegro [former]"},{geoAreaCode:"901",geoAreaName:"Africa (ILO)"},{geoAreaCode:"902",geoAreaName:"Asia and the Pacific (ILO)"},{geoAreaCode:"903",geoAreaName:"Central and Eastern Europe (ILO)"},{geoAreaCode:"904",geoAreaName:"Middle East and North Africa (ILO)"},{geoAreaCode:"905",geoAreaName:"Middle East (ILO)"},{geoAreaCode:"906",geoAreaName:"North America (ILO)"},{geoAreaCode:"907",geoAreaName:"Other regions (ILO)"},{geoAreaCode:"908",geoAreaName:"Western Europe (ILO)"},{geoAreaCode:"910",geoAreaName:"High income economies (WB)"},{geoAreaCode:"911",geoAreaName:"Low income economies (WB)"},{geoAreaCode:"912",geoAreaName:"Lower middle economies (WB)"},{geoAreaCode:"913",geoAreaName:"Low and middle income economies (WB)"},{geoAreaCode:"914",geoAreaName:"Upper middle economies (WB)"},{geoAreaCode:"915",geoAreaName:"WTO Developing Member States"},{geoAreaCode:"916",geoAreaName:"WTO Developed Member States"},{geoAreaCode:"917",geoAreaName:"International Centers (FAO)"},{geoAreaCode:"736",geoAreaName:"Sudan [former]"},{geoAreaCode:"918",geoAreaName:"European Union (EU) Institutions"},{geoAreaCode:"97",geoAreaName:"European Union"},{geoAreaCode:"919",geoAreaName:"Regional Centres (FAO)"},{geoAreaCode:"920",geoAreaName:"Azores Islands"},{geoAreaCode:"921",geoAreaName:"ODA residual"},{geoAreaCode:"922",geoAreaName:"Custom groupings of data providers"},{geoAreaCode:"827",geoAreaName:"United Kingdom (England and Wales)"},{geoAreaCode:"828",geoAreaName:"United Kingdom (Northern Ireland)"},{geoAreaCode:"829",geoAreaName:"United Kingdom (Scotland)"},{geoAreaCode:"369",geoAreaName:" Iraq (Central Iraq) "},{geoAreaCode:"370",geoAreaName:"Iraq (Kurdistan Region)"}]}});