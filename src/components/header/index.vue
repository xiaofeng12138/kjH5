<template>
    <div>
        <div class="navBar">
            <van-row>
                <van-col span="4">
                <img src="../../assets/common_icon_nav@2x.png" @click="showOpenStatus = true" alt   />
                </van-col>
                <van-col span="16" class="title">{{title}}</van-col>
                <!-- <van-col span="4">
                <img src="../../assets/common_icon_search@2x.png" alt @click="showTop = true" />
                </van-col> -->
            </van-row>
        </div>
        <sidebar :openStatus.sync="showOpenStatus" @updateStatus = 'closeSidebar'/>
    </div>
</template>
<script>
import sidebar from '@/components/sidebar'
export default {
props:{
  bannerTitle:{
    type:String,
    default:""
  }
},
components:{sidebar},
    data(){
         return{
            showOpenStatus:false,
            title:''
         }
    },
    methods:{
      closeSidebar(val){
         this.showOpenStatus = val
      }
        
    },
    mounted(){
        
    },

    watch:{
      bannerTitle:{
          handler(newVlaue,oldValue){
              this.title = newVlaue
          },
          immediate:true
      },
    
    }

}
</script>
<style lang="scss" scoped>
.navBar {
    width: 100%;
    height: 0.6rem;
    // background: linear-gradient(to right, #2467f3, #4697fd, #2467f3);
    background-color: #155FF2;
  }
   .van-row {
    height: 0.6rem;
    .title {
      margin-top: 0rem !important;
      color: #fff;
      text-align: center;
      font-size: 0.18rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .van-col {
      line-height: 0.6rem;
      margin-top: 0.15rem;
      img {
        display: block;
        width: 0.3rem;
        height: 0.3rem;
        margin: auto;
      }
    }
  }
</style>


