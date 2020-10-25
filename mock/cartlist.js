import { getToken } from '../src/utils/auth.js'
console.log(getToken('goodsList'))
export default getToken('goodsList') === null ? [] : JSON.parse(getToken('goodsList'))