'use strict'
const formStringToObject = async (string) =>{
    const obj = {};
    let arr = string.split('&')
    console.log(arr)

    for(let i = 0; i < arr.length; i++){
        let item = arr[i];
        let pair = item.split('=');
        obj[pair[0]] = pair[1];
    }
    return obj;
}

module.exports = formStringToObject;
