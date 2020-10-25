import { getToken } from '../src/utils/auth.js'
console.log(getToken('successOrder'))
export default getToken('successOrder') === null ? [] : JSON.parse(getToken('successOrder'))