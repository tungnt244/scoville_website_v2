import axios from 'axios'
import {url} from '../config'

export default function checkValidToken(callback){
    let token = localStorage.getItem('token')
    if(token){
        var instance = axios.create({
            baseURL: url + '/cms/checktoken',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': token
            }
        });
        
        instance.get()
        .then(response => {
            if(response.data.isValid){
                callback()
                return
            }
        }).catch(error => {
            console.log('error: ' + error)
            return
        })
    }
    return
}