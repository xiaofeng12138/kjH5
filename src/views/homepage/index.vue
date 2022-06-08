<template>
    <div class="homepage">
       <Header :bannerTitle="bannerTitle"/>
       <div class="bg">
           
       </div>
    </div>
</template>

<script>
import Header from '@/components/header/index.vue'
import {setInfo,getInfo} from '@/utils/cookie'
import { Toast } from 'vant';
export default {
   components:{Header},
   data(){
       return{
           bannerTitle:'智慧通首页',
       }
   },
   mounted(){
       if(getInfo('showMessage')){
           return false
       }else{
           setInfo('showMessage','第一次设置')
           Toast({
               message:'请点击左上角选择需要办理的业务',
               duration:'3000'
           });
       }
           
   }
}
</script>

<style lang="scss" scoped>
.homepage{
   .bg{
       width: 100%;
       height: calc(100vh - 0.6rem);
       background-image: url('./img/indexbg.png');
       background-repeat: no-repeat;
       background-position: center;
       background-size: cover;
   }
}
</style>


