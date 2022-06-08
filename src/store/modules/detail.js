
//保存报关单相关联的信息
const state = {
   saveList:'',
   bgdId:''
}

const mutations ={
    SET_SAVELIST(state,value){
        state.saveList = value
  },
    SET_BGDID(state,value){
            state.bgdId = value
    },
}

export default {
  namespaced:true,  
  state,
  mutations,
};