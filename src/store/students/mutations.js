export function setNewsLetter (state, data) {
    state.newsletters = data
}

export function setAllStu (state, data) {
    state.allStu = data
}

export function setFilterStu (state, data) {
    state.filterStu = data
}

export function setNotifications (state, data) {
    state.notifications = data
}

export function spliceNotification (state, idx) {
    state.notifications.splice(idx, 1)
}
