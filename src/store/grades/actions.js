import { getAllSubjectGrades, getGradeSubjectAll, storeSubjectAsigned, getAllGrades, showGrade, register, edit, deleteGrade, getGradeStudent, getGradeStudentAsigned } from 'src/api/grades'

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

export function getSubjectGrades ({ commit }) {
  return new Promise((resolve, reject) => {
    return getAllSubjectGrades((response) => {
      commit('setAllSubjectGrades', response.data)
      resolve(response)
    }, (err) => {
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

export function gradeStudent ({ commit }, data) {
  return new Promise((resolve, reject) => {
    return getGradeStudent(data, (response) => {
      commit('setGradeStudent', response.data)
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}

export function gradeStudentAsigned ({ commit }, data) {
  return new Promise((resolve, reject) => {
    return getGradeStudentAsigned(data, (response) => {
      commit('setGradeStudent', response.data)
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}

export function gradeSubjectAll ({ commit }) {
  return new Promise((resolve, reject) => {
    return getGradeSubjectAll((response) => {
      //commit('setAllS', response.data)
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}


export function gradeSubjectAsigned ({ commit }, data) {
  return new Promise((resolve, reject) => {
    return storeSubjectAsigned(data, (response) => {
      //commit('setAllS', response.data)
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



