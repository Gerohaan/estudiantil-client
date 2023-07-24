import { register, edit, getAllSections, deleteSection, showLapse } from 'src/api/sections'

export function registerS ({ commit }, lapse) {
  return new Promise((resolve, reject) => {
    return register(lapse, (response) => {
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}


export function editS ({ commit }, data) {
    return new Promise((resolve, reject) => {
        return edit(data, (response) => {
        resolve(response)
        }, (err) => {
        reject(err)
        })
    })
}


export function filterS ({ commit }, data) {
  return new Promise((resolve, reject) => {
    commit('setFilterS', data)
    resolve()
  })
}

export function getSectionsAll ({ commit }) {
  return new Promise((resolve, reject) => {
    return getAllSections((response) => {
      commit('setAllS', response.data)
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}

export function deletes ({ commit }, data) {
  return new Promise((resolve, reject) => {
    return deleteSection(data, (response) => {
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}


