import axios from 'axios'

import { domain } from './data'

var url = domain

export function register (data, callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/user/add', data: data, method: 'POST', headers: { 'Accept': 'application/json;charset=utf-8', Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (err) {
        errorCallBack(err.response.data)
      }
    })
}

export function recoveryPassword (data, callBack, errorCallBack) {
  axios({ url: url + '/recovery', data: data, method: 'POST' })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (errorCallBack != null) {
        errorCallBack(err.response.data.error)
      }
    })
}

export function changePasswordToken (data, callBack, errorCallBack) {
  axios({ url: url + '/change/password', data: data, method: 'POST' })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (errorCallBack != null) {
        errorCallBack(err.response.data.error)
      }
    })
}

export function changePassword (data, callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/editUser', data: data, method: 'POST', headers: { 'Accept': 'application/json;charset=utf-8', Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (err) {
        errorCallBack(err.response.data)
      }
    })
}

export async function login (data, callBack, errorCallBack) {
 
  try {
   let response = await axios({ url: url + '/user/login', data: data, method: 'POST' })
   return callBack(response)

  } catch (error) {
    return errorCallBack(error)
  }
}

export function logouts (data, callBack, errorCallBack) {
  const newToken = data.token.replace('"', ' ')
  axios({ url: url + '/user/logout', data: data, method: 'POST', headers: { 'Accept': 'application/json;charset=utf-8', Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (errorCallBack != null) {
        console.log(err)
        errorCallBack(err.response.data.error)
      }
    })
}


export function editProfile (data, callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/user/edit', data: data, method: 'POST', headers: { 'Accept': 'application/json;charset=utf-8', Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (err) {
        errorCallBack(err.response.data)
      }
    })
}


export function getAllUser (callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/user/list', method: 'GET', headers: { 'Accept': 'application/json;charset=utf-8', Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (errorCallBack != null) {
        errorCallBack(err.response.data.error)
      }
    })
}


export function deleteUser (data, callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/user/delete/'+data, method: 'DELETE', headers: { Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (errorCallBack != null) {
        errorCallBack(err.response.data.error)
      }
    })
}

export function showUser (callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/user/show', method: 'GET', headers: { Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (errorCallBack != null) {
        errorCallBack(err.response.data.error)
      }
    })
}

export function singUp (data) {
  return new Promise((resolve, reject) => {
    axios({ url: url + '/singup', data: data, method: 'POST' })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err.response.data)
      })
  })
}

export function activateCatalogWhatsapp (data) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  return new Promise((resolve, reject) => {
    axios({ url: url + `/generate-token?activate_catalog_whatsapp=${data}`, method: 'GET', headers: { 'Accept': 'application/json;charset=utf-8', Authorization: 'Bearer ' + newToken } })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        if (err) {
          reject(err.response.data)
        }
      })
  })
}
