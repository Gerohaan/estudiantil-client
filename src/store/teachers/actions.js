import { getAllTeachers, showTeacher } from 'src/api/teachers'



export function allTeachers ({ commit }) {
  return new Promise((resolve, reject) => {
    return getAllTeachers((response) => {
      commit('setAllT', response.data)
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}


export function show ({ commit }) {
  return new Promise((resolve, reject) => {
    return showTeacher((response) => {
      commit('setAllT', response.data)
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}



