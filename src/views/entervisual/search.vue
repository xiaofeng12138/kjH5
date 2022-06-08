<template>
    <div class="search">
        <Header :configData="bannerTitle"/>
        <div class="searchBody">
           <van-form>
                <!-- <van-field v-model="startTime" label="开始时间:" placeholder="请选择开始时间" />
                <van-field v-model="endTime" label="结束时间:" placeholder="请选择结束时间" /> -->
                <van-field
                    readonly
                    clickable
                    name="picker"
                    :value="startTime"
                    label="开始时间："
                    placeholder="请选择开始时间"
                    @click="showStartTimeValue = true"
                />
                <van-field
                    readonly
                    clickable
                    name="picker"
                    :value="endTime"
                    label="结束时间："
                    placeholder="请选择结束时间"
                    @click="showEndTimeValue = true"
                />
                <van-field
                    readonly
                    clickable
                    name="picker"
                    :value="enterValue"
                    label="进出口类型："
                    placeholder="默认查询所有，可选择进口或出口"
                    @click="showEnterValue = true"
                />
                 <van-field
                    readonly
                    clickable
                    name="picker"
                    :value="tradewayValue"
                    label="运输方式："
                    placeholder="默认查询所有，可选择海运、空运或其他"
                    @click="showTradeWay = true"
                />
                 <van-field
                    v-model="bgdNum"
                    label="报关单号："
                    placeholder="查单票可输入单号,反之根据条件查询"
                /> 
                <van-field
                    v-model="billNo"
                    label="提运单号："
                    placeholder="查单票可输入提单号,反之根据条件查询"
                />

                <!-- <van-field
                    v-model="bgdNum"
                    name="报关单号",
                    label="报关单号"
                    placeholder="请输入报关单号"
                /> -->
                <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" @click="queryInfo">查 询</van-button>
                </div>
            </van-form>
        </div>
        <div class="searchList">
                <div class="searchTop">
                     <div class="title">搜索历史</div>
                     <div class="img" @click="delHistory">
                         <img src="@/assets/common_icon_delete@3x.png" alt="">
                     </div>
                </div>
                <div class="noserachHistory" v-if="historyList.length == 0">
                    暂无历史记录
                </div>
                <div class="serachHistory" v-else>
                    <li v-for="(item,index) in historyList" :key="index" @click="godetailed(item)">{{item.SEARCH_WORD}}</li>
                </div>
        </div>
       
            <!-- 进出口类型选择 -->
            <van-popup v-model="showEnterValue" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="columnsEnter"
                    @confirm="onConfirm"
                    @cancel="showEnterValue = false"
                />
            </van-popup>

            <!-- 开始时间选择 -->
            <van-popup v-model="showStartTimeValue" position="bottom">
               <van-datetime-picker
                v-model="currentDatee"
                @confirm ='changeStartTime'
                @cancel = 'showStartTimeValue = false'
                type="date"
                 :min-date="minDate"
                />
            </van-popup>
            <!-- 结束时间选择 -->
            <van-popup v-model="showEndTimeValue" position="bottom">
               <van-datetime-picker
                v-model="currentDate"
                @confirm ='changeEndTime'
                @cancel = "showEndTimeValue = false"
                type="date"
                 :min-date="minDate"
                />
            </van-popup>

             <!-- 运输方式 -->
            <van-popup v-model="showTradeWay" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="columnsTrade"
                    @confirm="ConfirmTradeway"
                    @cancel="showTradeWay = false"
                />
            </van-popup>
    </div>
</template>

<script>
import { Dialog ,Toast} from "vant";
import Header from '@/components/header/backHeader.vue'
import {setBgdId} from '@/utils/cookie.js'
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
     components:{Header},
     data(){
         return{
             bannerTitle:'搜  索',
             startTime:'',
             endTime:'',
             enterValue:'',
             showEnterValue:false,
             columnsEnter:["全部", "进口", "出口"],

             //开始时间选择
              currentDatee:new Date((new Date().getTime() - 3600 * 1000 * 24 * 7)),
              showStartTimeValue:false,
              currentDate: new Date(),
              thisYear:new Date().getFullYear,
              minDate: new Date((new Date().getTime() - 3*3600 * 1000 * 24 * 31)),
              maxDate: new Date(),

              //结束时间
              showEndTimeValue:false,

              //运输方式
              tradewayValue:'',
              showTradeWay:false,
              columnsTrade:["全部", "海运", "空运",'其他'],
              bgdNum:'',
              historyList:[],

              beginDate:this.startTime,
              endDate:'',
              trafMode:'',
              ieFlag:'',
              billNo:''
              

         }
     },
     methods:{
         //删除历史记录
            delHistory(){
                if(this.historyList.length == 0){
                    Toast('暂无历史记录');
                    return false
                    }else{
                        Dialog.confirm({message: "您确认删除搜索记录吗"}) .then(() => {
                            let data ={bizType:'CUSVISUAL_DEC'}
                            publicInter(interfaceUrl.clear,data).then(r=>{
                                    if(r.code == 200){
                                        Toast.success("删除成功");
                                        this.searchlist()
                                    }
                                })
                        }).catch(() => {});
                    }
            },
            queryInfo(){
                    if(!this.startTime){
                        Toast('请选择开始时间');
                        return false
                    } 
                    if(!this.endTime){
                        Toast('请选择结束时间');
                        return false
                    }
                    if(this.startTime >this.endTime){
                        Toast('开始时间不能大于结束时间');
                        return false
                    }
                    let data = {
                            beginDate:this.beginDate,
                            endDate:this.endDate,
                            trafMode:this.trafMode,
                            ieFlag:this.ieFlag,
                            entryId:this.bgdNum,
                            billNo:this.billNo,
                            pageNum:1,
                            pageSize:5
                    }
                    this.$store.commit("requsetBgdlist/SET_BGDINFO",data)
                    this.$router.push({
                        name:'entrylist',
                        params:{
                            data:data
                        }
                    })
            },
            //查询历史记录函数
                searchlist(){
                            let data ={
                                bizType:'CUSVISUAL_DEC'
                            }
                        publicInter(interfaceUrl.getHisWord,data).then(r=>{
                            this.historyList = r.data
                        })
                   },
            //进出口类型确认函数
            onConfirm(value) {
                    this.enterValue = value;
                    if(value == '进口'){
                            this.ieFlag = 'I'
                        }else if(value == '出口'){
                            this.ieFlag = 'E'
                        }else{
                            this.ieFlag = ''  
                        }
                    this.showEnterValue = false;
            },
            //开始时间确认函数
            changeStartTime(value){
                let year = value.getFullYear()
                let month = (value.getMonth() + 1) <10 ? '0'+ (value.getMonth() + 1):value.getMonth() + 1
                let day = value.getDate() < 10 ? '0' + value.getDate() : value.getDate()
                let showStartTime = year+' - '+ month + ' - ' + day
                this.startTime = showStartTime
                this.beginDate = JSON.stringify(year)+ month + day
                this.showStartTimeValue =false
            },
            //开始时间确认函数
            changeEndTime(value){
                let year = value.getFullYear()
                let month = (value.getMonth() + 1) <10 ? '0'+ (value.getMonth() + 1):value.getMonth() + 1
                let day = value.getDate() < 10 ? '0' + value.getDate() : value.getDate()
                let showEndTime = year+' - '+ month + ' - ' + day
                this.endTime = showEndTime
                this.endDate = JSON.stringify(year)+ month + day
                this.showEndTimeValue =false
            },
            //运输方式确认
            ConfirmTradeway(value){
                this.tradewayValue = value;
                if(value == '海运'){
                    this.trafMode = '2'
                }else if(value == '空运'){
                    this.trafMode = '5'
                }else if(value == '其他'){
                    this.trafMode = '99'
                }else{
                    this.trafMode = ''  
                }  
                this.showTradeWay = false;
            },
            godetailed(item){
                 this.$router.push({
                    name:'searchResult',
                    params:{
                        bgdId:item.SEARCH_WORD
                    }
                })
            },

            initDate(){
                let year = new Date().getFullYear()
                let month = (new Date().getMonth() + 1) < 10 ? '0'+ (new Date().getMonth() + 1):new Date().getMonth() + 1
                let monthh = (new Date().getMonth()+ 2) < 10 ? '0'+ (new Date().getMonth()):new Date().getMonth()
                let day = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
                let showStartTime = year+' - '+ month + ' - ' + day
                // let showStartTimelater = year+' - '+ monthh + ' - ' + day
                this.endTime = showStartTime +'   可查询近三个月时间范围'
                this.endDate = JSON.stringify(year)+ month + day

                let nowdate = new Date();
                let oneweekdate = new Date(nowdate-7*24*3600*1000);
                let y = oneweekdate.getFullYear();
                let m = oneweekdate.getMonth()+1 < 10 ?'0'+( oneweekdate.getMonth()+1) :  oneweekdate.getMonth()+1;
                let d = oneweekdate.getDate() < 10 ? '0'+(oneweekdate.getDate()) : oneweekdate.getDate();
                let showStartTimelater = y+' - '+m+' - '+d;
                this.startTime = showStartTimelater+'   可查询近三个月时间范围'
                this.beginDate = JSON.stringify(y)+ m + d 
                
            }
     },
     created(){
         this.initDate()
     },
     mounted(){
         this.searchlist()
     }
}
</script>

<style lang="scss" scoped>
 .search{
     .searchList{ 
        .searchTop{
            height: 0.5rem;
            line-height: 0.5rem;
            display: flex;
            .title{
                font-size: 0.14rem;
                color: #000; 
                font-weight: bold;
                width: 90%;
                padding-left: 0.2rem;
            }
            .img{
                width: 10%;
               img{
                display: block;
                width: 0.3rem;
                height: 0.3rem;
                margin-top: 0.1rem;
               }
            }
        }
        .serachHistory{
            overflow: hidden;
          li{
              width: 45%;
              height: 0.3rem;
              float: left;
              background-color: #F5F5F5;
              margin-left: 0.1rem;
              font-size: 0.14rem;
              line-height: 0.3rem;
              text-align: center;
              margin-bottom: 0.1rem;
              color: #BEBEBE;
              border-radius: 0.2rem;
          }
          li:nth-last-child(2n-1) {
              margin-left: 0.2rem
          }
          
        }
        .noserachHistory{
            width: 100%;
            height: 2rem;
            font-size: 0.15rem;
            line-height: 2rem;
            text-align: center;
            color: #dedede;
            // background-image: url("./img/swlogo @2x.png");
            // background-size: 40%;
            // background-repeat: no-repeat;
            // background-position: bottom left;
            
            
        }
    }
 }
</style>
