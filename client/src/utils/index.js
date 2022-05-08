// import jwt from 'jsonwebtoken'

// export const decodedJWT = (token) => {
//   return jwt.verify(token, process.env.VUE_APP_JWTSECRET)
// }

export const isTokenExist = _ => localStorage.token ? true : false

export const removeToken = _ => delete localStorage.token