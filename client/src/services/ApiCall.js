import axios from "axios";

// Whenever we want to create API call we will call this function commonrequest.
// This will request backend for data and return that data to frontend.
export const commonrequest = async(methods,url,body,header) => {
    
    // config -> object
    let config = {
        method:methods,
        url,
        headers:header ?
        header:{
            "Content-Type":"application/json"
        },
        data:body
    }

    // axios instance
    return axios(config).then((data) => {
        return data
    }).catch((error)=>{
        return error
    })
}