import jwt from 'jsonwebtoken'
import {api_url, secret_token_string} from '../../config'
import axios from 'axios'

export default function checkToken(token, callback){
    let user = jwt.verify(token, secret_token_string)
    
    let isValidUser = axios.post(api_url + '/login', {
        email: user.email,
        password: user.password
    }).then(response => {
        callback(true)
        return
    }).catch(error => {
        console.log('error: ', error)
        return
    })
}