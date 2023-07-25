import axios from 'axios'

import { domain } from './data'

var url = domain

export function register (data, callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/subject/add', data: data, method: 'POST', headers: { 'Accept': 'application/json;charset=utf-8', Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (err) {
        errorCallBack(err.response.data)
      }
    })
}

export function storeSubjectAsigned (data, callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/subject/add', data: data, method: 'POST', headers: { 'Accept': 'application/json;charset=utf-8', Authorization: 'Bearer ' + newToken } })
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
  axios({ url: url + '/subject/update/'+data.id, data: data, method: 'PUT', headers: { 'Accept': 'application/json;charset=utf-8', Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (err) {
        errorCallBack(err.response.data)
      }
    })
}


export function getAllSubjects (callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/subject/list', method: 'GET', headers: { 'Accept': 'application/json;charset=utf-8', Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (errorCallBack != null) {
        errorCallBack(err.response.data.error)
      }
    })
}


export function deleteSubject (data, callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/subject/delete/'+data, method: 'DELETE', headers: { Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (errorCallBack != null) {
        errorCallBack(err.response.data.error)
      }
    })
}

export function showSubject (callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/subject/show', method: 'GET', headers: { Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (errorCallBack != null) {
        errorCallBack(err.response.data.error)
      }
    })
}

