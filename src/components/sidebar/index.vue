<template>
    <div class="sidebar">
         <van-popup v-model="showLeft" position="left" :style="{ width: '60%',height:'100%' }" :close-on-click-overlay=false>
            <div class="modelHeader">
                <span class="user">
                <img src="../../assets/user.png" alt />
                  {{LoginUser}}
                </span>
                <span class="close" @click="openSidebar">
                <img src="../../assets/common_icon_close@2x.png" alt />
                </span>
            </div>
            <div class="modelList">
                <van-sidebar v-model="activeKey" >
                  <!-- <van-sidebar-item title="快速提离(靠泊直提/机坪直提/卡口直放)" to='/' />
                  <van-sidebar-item title="通关全程可视化" to='enterVisual'/> -->
                  <van-sidebar-item  v-for="(item,index) in leftMenu" :key="index" :title="item.name" :to="item.url" @click="clickMenu(index)"/>
                </van-sidebar>
            </div>
            <div class="modelLogout" @click="logout">退出账号</div>
        </van-popup>
    </div>
</template>
<script>
import {removeCookie, removeUsername,getUsername,setBgdId,setSaveList,setSideId,getSideId,setInfo} from "@/utils/cookie";
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import { Dialog ,Toast,Sidebar, SidebarItem,} from "vant";

export default {
    props:{
        openStatus:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
             activeKey: getSideId('sideId')  ||  0 ,
             showLeft:false, //控制左侧弹出层是否显示
             LoginUser: getUsername() || this.$store.state.login.userName,
             leftMenu :[
                 {
                   name:'首页',
                   url:'/'
                 },
                 {
                    name:'快速提离状态申请查看(靠泊直提/机坪直提/卡口直放)',
                    url:'liftoff'
                 },
                {
                    name:'通关状态全程可视化',
                    url:'enterVisual'
                },
                //  {
                //     name:'XF_GG',
                //     url:'enterVisual'
                // },
                //  {
                //     name:'TTT',
                //     url:'enterVisual'
                // },
             ],
        }
    },
    methods:{
        logout() {
            Dialog.confirm({
                message: "您确认退出吗"
              }) .then(() => {
                    Toast.success("退出成功");
                    removeUsername();
                    removeCookie();
                    setInfo('showMessage','')
                    setSideId('sideId','')
                    this.$router.push("/login");
                  }).catch(() => {});
        },
        openSidebar(){
            this.$emit('updateStatus',false)
        },
        clickMenu(index){
            setSideId('sideId',index)
        }
    },
    watch:{
      openStatus:{
          handler(newVlaue,oldValue){
               this.showLeft = newVlaue
          },
          immediate:true
      },
    
    }
}
</script>
<style lang="scss" scoped>

  .modelHeader {
        margin-top: 0.4rem;
        height: 0.5rem;
        width: 100%;
        display: flex;
        .user {
        display: block;
        width: 80%;
        font-size: 0.16rem;
        line-height: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        img {
            width: 0.3rem;
            height: 0.3rem;
            margin-top: 0.1rem;
            margin-left: 0.05rem;
        }
        }
        .close {
        display: block;
        width: 0.3rem;
        height: 0.3rem;
        background-color: #ccc;
        line-height: 0.5rem;
        margin-top: 0.1rem;
        img {
            width: 0.3rem;
            height: 0.3rem;
            margin: auto;
        }
     }
  }
   .modelList {
    width: 100%;
    margin-top: 0.5rem;
    .van-sidebar {
      width: 100%;
      .van-sidebar-item--select {
        color: #fff;
        background-color: #175ef1;
        border-left: none;
      }
    }
  }
  .modelLogout {
    position: absolute;
    left: 0;
    bottom: 0.1rem;
    width: 100%;
    height: 0.5rem;
    background-color: #fef9f8;
    font-size: 0.2rem;
    color: #c33040;
    text-align: center;
    line-height: 0.5rem;
  }
</style>


