import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
Vue.use(Router);
export default (function (routerConfig) {
  return new Router(Object.assign({
    scrollBehavior: function scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }

      return {
        x: 0,
        y: 0
      };
    }
  }, routerConfig, {
    routes: [{
      path: '*',
      component: Home
    }]
  }));
});