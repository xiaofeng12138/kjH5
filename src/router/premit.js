import router from "./index";
import {getCookie,removeCookie} from '@/utils/cookie'
import  store  from '@/store/index'
import { Toast } from "vant";

const whiteRouter = ['/login']

router.beforeEach((to,form,next)=>{
    if(getCookie()){
       if(to.path == '/login'){
          removeCookie()
          store.commit("login/SET_TOKEN","");
          store.commit("login/SET_USERNAME","");
          next()
        }else{
          next()
        }
    }else{
       if(whiteRouter.indexOf(to.path) !== -1){  
            next() 
        }else{
            next('/login')  
            // Toast.fail("您暂无权限访问该页面");
        }
    }
})