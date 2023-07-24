export function setNewsLetter (state, data) {
    state.newsletters = data
}

export function setAllS (state, data) {
    state.allS = data
}

export function setFilterS (state, data) {
    state.filterS = data
}

export function setNotifications (state, data) {
    state.notifications = data
}

export function spliceNotification (state, idx) {
    state.notifications.splice(idx, 1)
}
