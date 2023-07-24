import { getAllStudent, showStudent } from 'src/api/students'



export function allStudents ({ commit }) {
  return new Promise((resolve, reject) => {
    return getAllStudent((response) => {
      commit('setAllStu', response.data)
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}


export function show ({ commit }) {
  return new Promise((resolve, reject) => {
    return showStudent((response) => {
      commit('setFilterStu', response.data)
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}



