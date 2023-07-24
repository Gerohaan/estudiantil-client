export function setNewsLetter (state, data) {
    state.newsletters = data
}

export function setAllT (state, data) {
    state.allT = data
}

export function setFilterT (state, data) {
    state.filterT = data
}

export function setNotifications (state, data) {
    state.notifications = data
}

export function spliceNotification (state, idx) {
    state.notifications.splice(idx, 1)
}
