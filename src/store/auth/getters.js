export function getUserData (auth) {
    return auth.user
}

export function token (user) {
    return user.token
}

export function getAuthState (auth) {
    return auth.state
}

export function getNewsLetters (auth) {
    return auth.newsletters
}

export function getAllUser (auth) {
    return auth.allUser
}

export function filter (auth) {
    return auth.filter
}

export function notifications(auth) {
    return auth.notifications
}
  