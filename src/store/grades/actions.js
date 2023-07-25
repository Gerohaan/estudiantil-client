import { getAllGrades, showGrade, register, edit, deleteGrade } from 'src/api/grades'

export function registerGrade ({ commit }, data) {
  return new Promise((resolve, reject) => {
    return register(data, (response) => {
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}

export function editGrade ({ commit }, data) {
  return new Promise((resolve, reject) => {
      return edit(data, (response) => {
      resolve(response)
      }, (err) => {
        console.log(err)
      reject(err)
      })
  })
}

export function deletes ({ commit }, data) {
  return new Promise((resolve, reject) => {
      return deleteGrade(data, (response) => {
      resolve(response)
      }, (err) => {
        console.log(err)
      reject(err)
      })
  })
}

export function allGrades ({ commit }) {
  return new Promise((resolve, reject) => {
    return getAllGrades((response) => {
      commit('setAllGrades', response.data)
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}


export function show ({ commit }) {
  return new Promise((resolve, reject) => {
    return showGrade((response) => {
      commit('setFilterGrade', response.data)
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}



