import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import lapses from './lapses'
import sections from './sections'
import subjects from './subjects'
import teachers from './teachers'
import students from './students'
import grades from './grades'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      lapses,
      sections,
      subjects,
      teachers,
      students,
      grades
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
