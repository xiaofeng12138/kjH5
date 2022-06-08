<template>
    <div>
         <div class="navBar">
            <van-row>
                <van-col span="3">
                <img src="@/assets/common_icon_back@2x.png" alt @click="goback" />
                </van-col>
                <van-col span="18" class="title">{{ title }}</van-col>
                <van-col span="3">
                  <img src="@/assets/common_icon_click@2x.png" alt @click='showTotal' />
                </van-col>
            </van-row>
        </div>
         <div class="tabbar">
                <van-tabs v-model="active" animated color='#155FF2' title-active-color='#155FF2'>
                    <van-tab title="通关环节">
                        <Entercus :passentryData = entryAllData />
                    </van-tab>
                    <van-tab title="出证环节">
                        <div class="content">
                            <Hislink :passeciqData = eciqAllData />
                        </div>
                    </van-tab>
                    <van-tab title="涉税化验进度">
                        <Assay :passtaxData = taxAllData />
                    </van-tab>
                </van-tabs>
         </div>
         <van-popup v-model="show" closeable >
          <div class='showTotal'>
            <h2>提示</h2>
                <p>通关环节可获得两小时前最新状态</p>
                <p>出证环节状态每天凌晨更新一次</p>
                <p>涉税化验进度每周更新二次</p>
                <p>只能查询本企业状态</p>
          </div>
         </van-popup>
    </div>
</template>
<script>

import Header from '@/components/header/backHeader.vue'
import Entercus from './item/entercus'
import Hislink from './item/hislink'
import Assay from './item/assay'
import {getInfo} from '@/utils/cookie.js'
import { Popup } from 'vant';

import {publicGetInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'

export default {
    components:{Header,Entercus,Hislink,Assay},
    data(){
        return{
            active:0,
            title:this.$route.params.bgdId || getInfo('bgdId'),
            show:false,
            entryAllData:[],
            eciqAllData:[],
            taxAllData:[],
        }
    },
    mounted(){
        this.queryhyInfo()
    },
    methods: {
        goback(){
             this.$router.go(-1);
        },
        showTotal(){
            this.show = true
        },
        queryhyInfo(){
           let url = interfaceUrl.queryDec + this.title
           publicGetInter(url).then(r=>{
               this.entryAllData = r.entryData
               this.eciqAllData = r.eciqData
               this.taxAllData = r.taxData
           })
        }
    },
    watch:{
        title:{
            handler(newValue,oldValue){
               console.log(newValue)
            },
            immediate: true  //监听立即执行
        }
    }
}
</script>
<style lang="scss" scope>
    .navBar {
                    width: 100%;
                    height: 0.6rem;
                    background: linear-gradient(to right, #2467f3, #4697fd, #2467f3);
                }
                .van-row {
                    height: 0.6rem;
                        .title {
                            margin-top: 0rem !important;
                            color: #fff;
                            font-size: 0.18rem;
                            text-align: center;
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
    .tabbar{
        .content{
                width: 100%;
                background-color: #fff;
                font-size: 0.15rem;
                line-height: 5rem;
                text-align: center;
                color: #DCDCDC;
               }
    }
    .van-popup--center{
        width:90%;
        height:2rem;
        font-size:0.15rem;
        .showTotal{
            margin-top:0.3rem;
            text-align: center;
            h2{
                font-size: 0.16rem;
                margin: 0.1rem 0;
            }
            p{
                margin: 0.05rem 0;
            }
            p:last-child{
              font-size: 0.17rem;
              font-weight: bold;
              margin-top: 0.1rem;
            }
        }
    }
</style>


