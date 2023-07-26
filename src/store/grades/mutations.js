export function setNewsLetter (state, data) {
    state.newsletters = data
}

export function setAllGrades (state, data) {
    state.allGrades = data
}

export function setGradeStudent (state, data) {
    state.gradeStudent = data
}

export function setFilterGrade (state, data) {
    state.filterGrade = data
}

export function setNotifications (state, data) {
    state.notifications = data
}

export function setAllSubjectGrades (state, data) {
    state.allSubjectGrades = data
}

export function setAllStudentsGrades (state, data) {
    state.allStudentsGrades = data
}


export function spliceNotification (state, idx) {
    state.notifications.splice(idx, 1)
}
