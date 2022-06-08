import Cookie from 'cookie_js'

const toKen = 'userToken'
const username = 'userName'


export  function setCookie(value){
   return Cookie.set(toKen,value)
};


export  function getCookie(){
    return Cookie.get(toKen)
}

export  function removeCookie(){
    return Cookie.remove(toKen)
}

export  function setUsername(value){
    return Cookie.set(username,value)
 };

export  function getUsername(){
    return Cookie.get(username)
}

export  function removeUsername(){
    return Cookie.remove(username)
}

export  function setNewCook(r,value){
    return Cookie.set(r,value)
}

export  function setSaveList(r,value){
    return Cookie.set(r,value)
}


//保存报关单相关信息
export  function setBgdId(r,value){
    return Cookie.set(r,value)
}

//存储信息
export  function setInfo(r,value){
    return Cookie.set(r,value)
}

//获取报关单信息
export  function getInfo(r){
    return Cookie.get(r)
}

//保存侧边栏导航ID
export  function setSideId(r,value){
    return Cookie.set(r,value)
}

//获取侧边栏导航ID
export  function getSideId(r){
    return Cookie.get(r)
}