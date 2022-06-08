import  service from './service'

export function publicInter(url,params) {
    return service({
       url: url,
       method:'post',
       data:JSON.stringify(params),
       headers:{
           'Content-type':'application/json;charset=UTF-8'
       }
   })
}

export function publicGetInter(url) {
    return service({
       url: url,
       method:'get',
       headers:{
           'Content-type':'application/json;charset=UTF-8'
       }
   })
}