import axios from 'axios'

import { domain } from './data'

var url = domain



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

