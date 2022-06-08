<template>
    <div class="wrap">
        <Header :bannerTitle="bannerTitle"/>
        <div class="body">
            <div class="search">
               <van-search 
               placeholder="请输入搜索条件" 
               background="#155FF2" 
               shape="round"
               @focus="goSearch"
               >
               </van-search>
            </div>
            <div class="tabbar">
                <van-tabs v-model="active" animated color='#155FF2' title-active-color='#155FF2'>
                    <van-tab title="通关环节">
                        <div class="content">
                            无相关记录
                        </div>
                    </van-tab>
                    <van-tab title="出证环节">
                        <div class="content">
                            无相关记录
                        </div>
                    </van-tab>
                    <van-tab title="涉税化验进度">
                        <div class="content">
                            无相关记录
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '@/components/header/index.vue'
export default {
    components:{Header},
    data() {
        return {
            active:0,
            bannerTitle:'通关状态全程可视化'
        }
    },
    beforeCreate: function() {
        document.getElementsByTagName("body")[0].className="bgc";
        },
    beforeDestroy: function() {
        document.body.removeAttribute("class","bgc");
    },
    methods:{
        goSearch(){
            this.$router.push('/searchIndex')
        }
    }
    
}
</script>
<style lang="scss" scoped>
.wrap{
.body{
    
    .van-search__action{
        padding: 0;
    }
    .btn{
        background-color: #155FF2;
        color: #fff;
        padding: 0 !important;
        margin-right: 0.1rem;
        width: 100%;
        text-indent: 0.1rem;
        font-size: 0.14rem;
    }
    .tabbar{
        .content{
            width: 100%;
            height: calc(100vh - 3rem);
            //background-color: #fff;
            font-size: 0.15rem;
            line-height: 5rem;
            text-align: center;
            color: #DCDCDC;
            
        }
    }
}
}
</style>


