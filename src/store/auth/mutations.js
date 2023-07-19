export function setAuth (auth, data) {
    auth.user = data.user
if (data.user.brand === null) {
    auth.user.brand = {}
    auth.user.brand.user_id = data.user.id
}
    auth.token = data.token
    auth.state = true
}

export function setUser (auth, data) {
    auth.user = data
}

export function setNewsLetter (auth, data) {
    auth.newsletters = data
}

export function setAllUser (auth, data) {
    auth.allUser = data
}

export function logout (auth, data) {
    auth.user = {}
    auth.state = false
}

export function setFilter (auth, data) {
    auth.filter = data
}

export function setNotifications (auth, data) {
    auth.notifications = data
}

export function spliceNotification (auth, idx) {
    auth.notifications.splice(idx, 1)
}

export function removeUserAndSetNew(auth, data) {
    localStorage.removeItem('user')
    auth.user = data
    localStorage.setItem('user', JSON.stringify(data))
}  