import { register, login, logouts, deleteUser, getAllUser, editProfile, changePassword } from 'src/api/auth'

export function registerUser ({ commit }, user) {
  return new Promise((resolve, reject) => {
    return register(user, (response) => {
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}

export function loginUser ({ commit }, user) {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  return new Promise((resolve, reject) => {
    return login(user, (response) => {
      if (response.data.user.id) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)
      }
      commit('setAuth', response.data)
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}

export function logout ({ commit }, data) {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  return new Promise((resolve, reject) => {
    return logouts(data, (response) => {
      commit('logout')
      resolve()
    }, (err) => {
      reject(err)
    })
  })
}

export function editProfiles ({ commit }, data) {
    return new Promise((resolve, reject) => {
        return editProfile(data, (response) => {
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(response.data.user))
        commit('setUser', response.data.user)
        resolve(response)
        }, (err) => {
        reject(err)
        })
    })
}

export function editPassword ({ commit }, data) {
  return new Promise((resolve, reject) => {
    return changePassword(data, (response) => {
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}

export function filterUser ({ commit }, data) {
  return new Promise((resolve, reject) => {
    commit('setFilter', data)
    resolve()
  })
}

// get user request action
export function getAllUsers ({ commit }) {
  return new Promise((resolve, reject) => {
    return getAllUser((response) => {
      commit('setAllUser', response.data.users.data)
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}

export function deletes ({ commit }, data) {
  return new Promise((resolve, reject) => {
    return deleteUser(data, (response) => {
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}

export function forceLogout ({ commit }) {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  return new Promise((resolve, reject) => {
    commit('logout')
    resolve()
  })
}

