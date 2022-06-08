<template>
     <div class="noInfo" v-if="allStep.length == 0">
         {{showMessage}}
     </div>
    <div class="wrap" v-else>
        <li v-for="(item,index) in allStep" :key="index">
           <div class="wrapTop">
               <img src="@/assets/pass_icon_dot@2x.png" alt="">
               <p style="color:#B5B5B5">{{ item.STEP_MESSAGE}}</p>
           </div>
           <div class="wrapBody">
                <div class="time">
                     <img src="@/assets/pass_icon_time@2x.png" alt="">
                      <p>{{ item.CREATE_DATE}}</p>
                </div>
                <div class="time">
                     <img src="@/assets/pass_icon_depart@2x.png" alt="">
                     <p>{{ item.DEPARTMENT}}</p>
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
      passentryData:{
           type:Array,
           default:[]
      }
    },
    data(){
        return{
             allStep:[],
             showMessage:'正在查询中',
        }
    },
    methods:{
    },
    watch:{
       passentryData:{
         handler(newValue,oldValue){
             this.allStep = newValue
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
        height: 5rem;
        font-size: 0.15rem;
        line-height: 5rem;
        text-align: center;
        color: #DCDCDC;  
        }
    .wrap{
        width: 100%;
        li{
            height: 1rem;
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
                    color: #2D8CF0;
                    font-weight: bold;
                    margin-left: 0.1rem;
                }
                span{
                    width: 1rem;
                    height: 0.25rem;
                    margin-top: 0.025rem;
                    background-color: #2F8EF1;
                    border-radius: 0.2rem;
                    font-size: 0.14rem;
                    line-height: 0.25rem;
                    text-align: center;
                    color: #fff;
                    margin-left: 0.15rem;
                }
            }
            .wrapBody{
                height: 0.7rem;
                width: 87%;
                margin: auto;
                border-left: 0.03rem dotted #C7C9CC;
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
                        font-size: 0.12rem;
                        line-height: 0.3rem;
                        color: #919191;
                        font-weight: bold;
                        margin-left: 0.05rem;
                    }
                }
            }
        }
    }
</style>


