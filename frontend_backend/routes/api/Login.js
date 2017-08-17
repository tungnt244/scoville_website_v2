import jwt from 'jsonwebtoken'
import {api_url, secret_token_string, token_expire_time} from '../../config'
import axios from 'axios'

export default function login(user, callback){
    let isValidUser = axios.post(api_url + '/login', {
        email: user.email,
        password: user.password
    }).then(response => {
        let token = jwt.sign(user, secret_token_string, {expiresIn:token_expire_time})
        callback({token: token, email: user.email})
        return
    }).catch(error => {
        console.log('error: ', error)
        callback({error: error.response.data})
        return
    })
}   