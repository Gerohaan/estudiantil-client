import { register, edit, getAllLapses, deleteLapse, showLapse } from 'src/api/lapses'

export function registerLapse ({ commit }, lapse) {
  return new Promise((resolve, reject) => {
    return register(lapse, (response) => {
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}


export function editLapse ({ commit }, data) {
    return new Promise((resolve, reject) => {
        return edit(data, (response) => {
        resolve(response)
        }, (err) => {
        reject(err)
        })
    })
}


export function filterLapse ({ commit }, data) {
  return new Promise((resolve, reject) => {
    commit('setFilterLapse', data)
    resolve()
  })
}

export function getLapsesAll ({ commit }) {
  return new Promise((resolve, reject) => {
    return getAllLapses((response) => {
      commit('setAllLapses', response.data)
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}

export function deletes ({ commit }, data) {
  return new Promise((resolve, reject) => {
    return deleteLapse(data, (response) => {
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}


