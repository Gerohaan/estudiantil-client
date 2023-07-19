export default function () {
  return {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
    token: localStorage.getItem('token') || '',
    state: false,
    newsletters: [],
    allUser: [],
    filter: {},
    notifications: []
  }
}
