<template>
    <div class="entrylist" >
         <Header :configData="bannerTitle"/>
        <div class="noInfo" v-if="bgdList.length == 0">
              {{showMessage}}
        </div>
         <div class="list" v-else>
               <li v-for="(item,index) in bgdList" :key="index"  @click="goresult(item)">
                 <div class="left">
                     <span class="bgdNum">{{item.ENTRY_ID}}</span>
                     <span class="tydNum">提运单号：{{item.BILL_NO}}</span>
                     <span class="tydNum">申报日期：{{item.D_DATE}}</span>
                 </div>
                 <div class="right">
                     <span>
                          <img src="@/assets/tg_icon_trans_ship.png"  alt="" v-if=" item.TRAF_MODE == '2'">
                          <img src="@/assets/tg_icon_trans_plane.png" alt="" v-if="item.TRAF_MODE == '5'">
                          <img src="@/assets/tg_icon_trans_other.png" alt="" v-if="item.TRAF_MODE == '99'">
                          <p v-if=" item.TRAF_MODE == 2">海运</p>
                          <p v-if=" item.TRAF_MODE == 5">空运</p>
                          <p v-if=" item.TRAF_MODE == 99">其他</p>
                     </span>
                     <span>
                          <img src="@/assets/tg_icon_iae_export.png" alt="" v-if="item.I_E_FLAG == 'I'">
                          <img src="@/assets/tg_icon_iae_import.png" alt="" v-else>
                          <p v-if="item.I_E_FLAG == 'I'">进口</p>
                          <p v-else>出口</p>
                     </span>
                 </div>
             </li>
              

              <!-- 页面分页 -->
             <div class="page">
                <page-component :page-config="pageConfigTotal" @changeCurrentPage="changePage"></page-component>
            </div>
         </div>
          <!-- 遮罩层 -->
         <van-overlay :show="show" >
            <div class="wrapper">
                <div class="block" >正在查询中</div>
            </div>
        </van-overlay>

    </div>
</template>

<script>
import pageComponent from "@/components/page/index.vue";
import { Dialog ,Toast,Overlay } from "vant";
import Header from '@/components/header/backHeader.vue'
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
import {setBgdId,getInfo} from '@/utils/cookie.js'


export default {
     components:{Header,pageComponent},
     data(){
         return{
            //   app_height:`${window.screen.availHeight}px`,
              show:true,
              bannerTitle:'搜 索 结 果',
              bgdList:[],
              showMessage:'',
               pageConfigTotal: {
                    //分页传参数
                    total: 0,
                    pageSize: 5,
                    pageNo: 1
                 }
            }
     },
     methods:{
          //分页点击函数
            changePage(page) {
                this.show = true
                let requestData =  this.$route.params.data || this.$store.getters["requsetBgdlist/bgdRequestInfo"]
                requestData.pageNum = page
                this.pageConfigTotal.page = page
                publicInter(interfaceUrl.queryCusEntryLst,requestData).then(r=>{
                 this.show = false
                 this.bgdList = r.data
                 this.pageConfigTotal.total = r.total
                 if(r.data.length == 0){
                    this.showMessage = '无相关记录'
                 }
             })
          },
         queryInfo(){
             let requestData =  this.$route.params.data || this.$store.getters["requsetBgdlist/bgdRequestInfo"]
             if(requestData){
                this.show = true
                 publicInter(interfaceUrl.queryCusEntryLst,requestData).then(r=>{
                 this.bgdList = r.data
                 this.pageConfigTotal.total = r.total
                 this.show = false
                 if(r.data.length == 0){
                    this.showMessage = '暂无数据'
                 }
             })
             }else{
                this.$router.go('-1')
             }
         },

         goresult(item){
            setBgdId('bgdId',item.ENTRY_ID)
            this.$router.push({
                name:'searchResult',
                params:{
                    bgdId:item.ENTRY_ID
                }
            })
         }
     },
     mounted(){
         this.queryInfo()
     }
}
</script>

<style lang="scss" scoped>
.entrylist{
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
   .noInfo{
            width: 100%;
            font-size: 0.2rem;
            line-height: 6rem;
            text-align: center;
            color: #DCDCDC;  
        }
  .list{
      width: 100%;
      li{
          height: 1rem;
          margin: 0.1rem auto ;
          width: 94%;
          display: flex;
          background-color: #FAFAFA;
          .left{
              width: 75%;
              height: 100%;
              .bgdNum{
                  display: block;
                  height: 0.25rem;
                  line-height: 0.25rem;
                  font-size: 0.18rem;
                  font-weight: bold;
                  border-left: 0.03rem solid #155FF2;
                  padding-left: 0.18rem;
                  margin-top: 0.05rem;
              }
              .tydNum{
                  display: block;
                  height: 0.3rem;
                  line-height: 0.3rem;
                  font-size: 0.12rem;
                  padding-left: 0.18rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
              }
          }
          .right{
              width: 25%;
              height: 100%;
              span{
                  display: block;
                  height: 50%;
                  display: flex;
                  img{
                    display: inline-block;
                    width: 0.4rem;
                    height: 0.4rem;
                    margin-top: 0.05rem;
                    margin-left: 0.06rem;
                  }
                  p{
                      font-size: 0.16rem;
                      line-height: 0.5rem;
                      margin-left: 0.05rem;
                  }
              }
              
          }
      }
      .total {
            width: 90%;
            height: 0.3rem;
            display: flex;
            justify-content: space-around;
            margin: auto;
            margin-bottom: 0.2rem;
            div {
            text-align: center;
            line-height: 0.3rem;
            font-size: 0.15rem;
            }
        }
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    }

    .block {
        width:100%;
        height: 0.5rem;
        text-align: center;
        line-height: 0.5rem;
        font-size: 0.2rem;
        color: #fff;
    }
    .page{
        width: 95%;
    }

}
</style>



