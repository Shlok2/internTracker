import {commonrequest} from "./ApiCall";
import {BASE_URL} from "./helper";

// 1) Response on clicking submit button then registerfunc is called -> (in register.js) -> (Apis.js)
// 2) (in Apis.js) -> commonrequest send data to (ApiCall.js) -> (body and data is same)

export const registerfunc = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/user/register`,data,header);
}

// No need to add header as our default Content-Type is application/json
export const usergetfunc = async() => {
    return await commonrequest("GET",`${BASE_URL}/user/details`,"")
}