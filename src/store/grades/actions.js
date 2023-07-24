import { getAllGrades, showGrade } from 'src/api/grades'



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



