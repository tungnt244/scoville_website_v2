import axios from 'axios'
import {api_url} from '../config'

export default function checkValidToken(callback){
    let token = localStorage.getItem('token')
    if(token){
        var instance = axios.create({
            baseURL: api_url + '/checkToken',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            }
        });

        return instance.post()
    }
    return false
}