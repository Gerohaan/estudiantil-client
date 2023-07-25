import axios from 'axios'

import { domain } from './data'

var url = domain


export function register (data, callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/grades/add',  data: data, method: 'POST', headers: { 'Accept': 'application/json;charset=utf-8', Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (errorCallBack != null) {
        errorCallBack(err.response.data.errors)
      }
    })
}

export function edit (data, callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/grades/update/'+data.id, data: data, method: 'PUT', headers: { 'Accept': 'application/json;charset=utf-8', Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (errorCallBack != null) {
        errorCallBack(err.response.data.errors)
      }
    })
}

export function getAllGrades (callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/grades/list', method: 'GET', headers: { 'Accept': 'application/json;charset=utf-8', Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (errorCallBack != null) {
        errorCallBack(err.response.data.error)
      }
    })
}

export function getGradeStudent (data, callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/grades/show/student/'+data, method: 'GET', headers: { Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (errorCallBack != null) {
        errorCallBack(err.response.data.error)
      }
    })
}

export function storeSubjectAsigned (data, callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/grades/add/subjectGrade/', data: data, method: 'POST', headers: { Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (errorCallBack != null) {
        errorCallBack(err.response.data.error)
      }
    })
}

export function getGradeStudentAsigned (data, callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/grades/add/studentGrade/', data: data, method: 'POST', headers: { Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (errorCallBack != null) {
        errorCallBack(err.response.data.error)
      }
    })
}

export function getAllSubjectGrades (callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/grades/showSubjectGrades', method: 'GET', headers: { Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (errorCallBack != null) {
        errorCallBack(err.response.data.error)
      }
    })
}

export function showGrade (callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/grades/show', method: 'GET', headers: { Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (errorCallBack != null) {
        errorCallBack(err.response.data.error)
      }
    })
}

export function deleteGrade (data, callBack, errorCallBack) {
  var token = localStorage.getItem('token') || ''
  const newToken = token.replace('"', ' ')
  axios({ url: url + '/grades/delete/'+data, method: 'DELETE', headers: { Authorization: 'Bearer ' + newToken } })
    .then(response => {
      callBack(response)
    })
    .catch(err => {
      if (errorCallBack != null) {
        errorCallBack(err.response.data.error)
      }
    })
}