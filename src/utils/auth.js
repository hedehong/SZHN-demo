const TokenKey = 'userInfo'

export function getToken(key = TokenKey) {
  return localStorage.getItem(key)
}

export function setToken(key = TokenKey, token) {
  return localStorage.setItem(key, token)
}

export function removeToken(key = TokenKey) {
  return localStorage.removeItem(key)
}
