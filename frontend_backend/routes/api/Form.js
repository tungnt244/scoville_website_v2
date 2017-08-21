import jwt from 'jsonwebtoken'
import {api_url, secret_token_string, token_expire_time} from '../../config'
import axios from 'axios'

export function getSingleForm(formId, callback){
    axios.get(api_url + '/forms/recruitment/' + formId).then(response => {
        callback(response.data)
        return
    }).catch(error => {
        console.log('error: ', error)
        return
    })
}  

export function putSingleForm(formId, status, callback){
    axios.put(api_url +'/forms/recruitment/' + formId, {status}).then(response => {
        callback("Ok")
        return
    }).catch(error => {
        console.log('error: ', error)
        return
    })
}

export function deleteSingleForm(formId, callback){
    axios.delete(api_url +'/forms/recruitment/'+formId).then(response => {
        callback("deleted")
        return
    }).catch(error => {
        console.log('error: ', error)
        return
    })
}

export function getForms(callback){
    axios.get(api_url + '/forms/recruitment').then(response => {
        callback(response.data)
        return
    }).catch(error => {
        console.log('error: ', error)
        return
    })
}

