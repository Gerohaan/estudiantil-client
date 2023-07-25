import { register, edit, getAllSubjects, deleteSubject, storeSubjectAsigned, showLapse } from 'src/api/subjects'

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

export function getSubjectAll ({ commit }) {
  return new Promise((resolve, reject) => {
    return getAllSubjects((response) => {
      commit('setAllS', response.data)
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}



export function deletes ({ commit }, data) {
  return new Promise((resolve, reject) => {
    return deleteSubject(data, (response) => {
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}


