<template>
   <div class="noInfo" v-if="allStep.length == 0">
            {{showMessage}}
    </div>
    <div class="wrap" v-else>
             <li v-for="(item,index) in allStep" :key="index">
                    <div class="wrapTop">
                        <img src="@/assets/pass_icon_dot@2x.png" alt="">
                        <p style="color:#B5B5B5">{{item.PROCESS_NODE_MESSAGE}}</p>
                    </div>
                    <div class="wrapBody">
                            <div class="time">
                                <img src="@/assets/pass_icon_time@2x.png" alt="">
                                    <p>{{item.OPER_DATE}} </p>
                            </div>
                            <div class="time">
                                <img src="@/assets/pass_icon_time@2x.png" alt="">
                                   <p>{{item.END_DATE}} </p>
                            </div>
                            <div class="time">
                                <img src="@/assets/pass_icon_depart@2x.png" alt="">
                               <p>{{item.TREA_ORG_CODE_NAME}}</p>
                            </div>
                    </div>
            </li>
    </div>
</template>
<script>
    import {publicGetInter} from '@/api/http'
    import interfaceUrl from '@/api/interfaceUrl'
    export default {
        props: {
            passeciqData:{
                type:Array,
                default:[]
            }
        },
        data(){
            return{
                allStep:[],
                showMessage:'正在查询中'
            }
        },
        methods:{
        },
        mounted(){
        },
        watch:{
        passeciqData:{
            handler(newValve,oldValue){
               this.allStep = newValve
               if(this.allStep.length == 0){
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
        height: 4rem;
        font-size: 0.15rem;
        line-height: 4rem;
        text-align: center;
        color: #DCDCDC;  
}

.wrap{
    width: 100%;
   
    li{
        height: 1.2rem;
        width: 100%;
        margin: 0.1rem 0;
        .wrapTop{
            height: 0.3rem;
            display: flex;
            img{
                display: block;
                width: 0.2rem;
                height: 0.2rem;
                margin-top: 0.05rem;
                margin-left: 0.15rem;
            }
            p{
                font-size: 0.14rem;
                line-height: 0.3rem;
                color: #F0A82D;
                font-weight: bold;
                margin-left: 0.1rem;
            }
            span{
                width: 1rem;
                height: 0.25rem;
                margin-top: 0.025rem;
                background-color: #ED9E25;
                border-radius: 0.2rem;
                font-size: 0.14rem;
                line-height: 0.25rem;
                text-align: center;
                color: #fff;
                margin-left: 0.15rem;
            }
        }
        .wrapBody{
            height: 1.2rem;
            width: 87%;
            margin: auto;
            border-left: 0.03rem dotted #C7C9CC;
            margin-bottom: 0.1rem;
            .time{
                height: 0.3rem;
                display: flex;
                img{
                    display: block;
                    width: 0.2rem;
                    height: 0.2rem;
                    margin-top: 0.05rem;
                    margin-left: 0.1rem;
                }
                p{
                    font-size: 0.1rem;
                    line-height: 0.3rem;
                    color: #919191;
                    font-weight: bold;
                    margin-left: 0.05rem;
                    display: block;
                }
            }
        }
    }
   
}
</style>


