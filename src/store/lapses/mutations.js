export function setNewsLetter (state, data) {
    state.newsletters = data
}

export function setAllLapses (state, data) {
    state.allLapses = data
}

export function setFilterLapse (state, data) {
    state.filterLapse = data
}

export function setNotifications (state, data) {
    state.notifications = data
}

export function spliceNotification (state, idx) {
    state.notifications.splice(idx, 1)
}
