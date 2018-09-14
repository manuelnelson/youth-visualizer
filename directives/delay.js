import Vue from 'vue';
Vue.directive('delay', {
  bind(el, binding, vnode) {
  },
  inserted(el, binding, vnode) {
    setTimeout(() => {
      el.classList.add(binding.value.cssClass)
    }, binding.value.delay)
  }
});