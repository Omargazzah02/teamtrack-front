import api from './api.js'

export function login(email, password) {
  return api.post('/auth/login', { email, password })
}

export function register(email, password, name ) {
  return api.post('/auth/register', { email, password, name })
}


export function me()  {

  const res = api.get('/auth/me');
  return res
}



export function logout () {
   return api.post('/auth/logout')
}