import jwt from 'jsonwebtoken'
import {api_url, secret_token_string, token_expire_time} from '../../config'
import axios from 'axios'

export default function getArticlesBrief(callback){
    axios.get(api_url + '/news/brief').then(response => {
        callback(response.data)
        return
    }).catch(error => {
        console.log('error: ', error)
        return
    })
}   