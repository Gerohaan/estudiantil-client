import axios from 'axios'

import { domain } from './data'

var url = domain

export function register (data, callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/lapses/add', data: data, method: 'POST', headers: { 'Accept': 'application/json;charset=utf-8', Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (err) {
        errorCallBack(err.response.data)
      }
    })
}


export function edit (data, callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/lapses/update/'+data.id, data: data, method: 'PUT', headers: { 'Accept': 'application/json;charset=utf-8', Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (err) {
        errorCallBack(err.response.data)
      }
    })
}


export function getAllLapses (callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/lapses/list', method: 'GET', headers: { 'Accept': 'application/json;charset=utf-8', Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (errorCallBack != null) {
        errorCallBack(err.response.data.error)
      }
    })
}


export function deleteLapse (data, callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/lapses/delete/'+data, method: 'DELETE', headers: { Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (errorCallBack != null) {
        errorCallBack(err.response.data.error)
      }
    })
}

export function showLapse (callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/lapses/show', method: 'GET', headers: { Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (errorCallBack != null) {
        errorCallBack(err.response.data.error)
      }
    })
}

