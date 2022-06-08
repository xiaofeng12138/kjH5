<template>
    <div class="noInfo" v-if="tableData.length == 0">
            {{showMessage}}
    </div>
    <div class="assay" v-else>
         <li class="theader">
             <div class="num">序号</div>
             <div class="name">品名</div>
             <div class="result">涉税化验结果</div>
         </li>
         <li v-for="(item,index) in tableData" :key="index">
             <div class="num">{{index +1 }}</div>
             <div class="name">{{item.G_NAME}}</div>
             <div class="result">{{item.STATE}}</div>
         </li>
    </div>
</template>
<script>
import {publicGetInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
     props: {
            taxAllData:{
                type:String,
                default:''
            }
        },
    data(){
        return{
            tableData:[],
            showMessage:'正在查询中'
        }
    },
    mounted(){
        // this.queryhyInfo()
    },
      watch:{
        taxAllData:{
            handler(newValve,oldValue){
              this.tableData = newValve
              if(this.tableData.length == 0){
                  this.showMessage = '暂无相关数据'
              }
            },
            immediate:true
        }
        }
}
</script>

<style lang="scss" scoped>
 .noInfo{
        width: 100%;
        height: 5rem;
        font-size: 0.15rem;
        line-height: 5rem;
        text-align: center;
        color: #DCDCDC;  
        }
.assay{
    margin-top: 0.1rem;
    .theader{
        list-style: none;
        height: 0.4rem;
        display: flex;
        width: 90%;
        margin: auto;
        div{
            font-size: 0.12rem;
            text-align:center;
            line-height: 0.4rem;
            background-color: #F2F4F7;
            border: 1px solid #ECECEC;
        }
        .num{
            width: 15%;
        }
        .name{
            width: 30%;
        }
        .result{
            width: 55%;
        }
    }
     li{
        list-style: none;
        height: 0.4rem;
        display: flex;
        width: 90%;
        margin: auto;
        div{
            font-size: 0.1rem;
            text-align:center;
            line-height: 0.4rem;
            border: 1px solid #ECECEC;
        }
        .num{
            width: 15%;
        }
        .name{
            width: 30%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .result{
            width: 55%;
        }
    }
}
</style>

