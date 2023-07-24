export function setNewsLetter (state, data) {
    state.newsletters = data
}

export function setAllGrades (state, data) {
    state.allGrades = data
}

export function setFilterGrade (state, data) {
    state.filterGrade = data
}

export function setNotifications (state, data) {
    state.notifications = data
}

export function spliceNotification (state, idx) {
    state.notifications.splice(idx, 1)
}
