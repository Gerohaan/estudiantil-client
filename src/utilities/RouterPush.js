import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const PushRoute = function (key) {
  this.$router.push(key)
}
export default PushRoute
