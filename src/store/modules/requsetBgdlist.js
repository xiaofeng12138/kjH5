
//保存报关单相关联的信息
const state = {
    bgdRequestInfo:''
 }

 const getters = {
    bgdRequestInfo:state => state.bgdRequestInfo
 }
 
 const mutations ={
     SET_BGDINFO(state,value){
         state.bgdRequestInfo = value
   },
 }
 
 export default {
   namespaced:true,  
   state,
   mutations,
   getters
 };