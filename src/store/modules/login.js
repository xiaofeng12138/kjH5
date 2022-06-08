import { getUsername } from '@/utils/cookie'

const state ={
    token:'',
    userName:''
}

const mutations ={
    SET_TOKEN(state,value){
        state.token = value
  },
    SET_USERNAME(state,value){
      state.userName = value
    },
}

export default {
  namespaced:true,  
  state,
  mutations,
};