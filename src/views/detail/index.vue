<template>
  <div class="detail">
    <div class="navBar">
      <van-row>
        <van-col span="4">
          <img src="../../assets/common_icon_back@2x.png" alt @click="goback" />
        </van-col>
        <van-col span="18" class="title">{{ title }}</van-col>
      </van-row>
    </div>
    <div class="content">
      <li class="first">
        <span>报关单号:</span>
        <span>{{infoList[0].CERTIFICATENO}}</span>
      </li>
      <li>
        <span>产销国:</span>
        <span>{{infoList[0].COUNTRYCODE}}</span>
      </li>
      <li>
        <span>船名:</span>
        <span>{{infoList[0].TRANSPORTNAME}}</span>
      </li>
      <li>
        <span>进境日期:</span>
        <span>{{infoList[0].IMPORTDATE}}</span>
      </li>
      <li>
        <span>提运单号:</span>
        <span>{{infoList[0].BILLNO}}</span>
      </li>
      <li>
        <span>毛重:</span>
        <span>{{infoList[0].WEIGHT}}</span>
      </li>
      <li>
        <span>件数:</span>
        <span>{{infoList[0].PACKAGEQUANTITY}}</span>
      </li>
      <li>
        <span>经营单位名称:</span>
        <span>{{infoList[0].COMPANYNAME}}</span>
      </li>
      <li>
        <span>经营单位代码:</span>
        <span>{{infoList[0].COMPANYCODE}}</span>
      </li>
      <li>
        <span>申报单位名称:</span>
        <span>{{infoList[0].AGENTNAME}}</span>
      </li>
      <li>
        <span>申报单位代码:</span>
        <span>{{infoList[0].AGENTCODE}}</span>
      </li>
      <li>
        <span>运输方式:</span>
        <span>{{infoList[0].CONTACTNAME}}</span>
      </li>
      <li class="last">
        <span>处理状态:</span>
        <span class="ccbRight" v-if="infoList[0].DEALFLAG == 0 ">未申请</span>
        <span class="ccbRight" v-else>已申请</span>
      </li>
      <van-button
        v-if="infoList[0].DEALFLAG == 0 "
        round
        block
        type="info"
        native-type="submit"
        style="margin-top:10px"
        @click="submit"
      >提 交</van-button>
      <van-button
        v-else
        disabled
        round
        block
        type="info"
        native-type="submit"
        style="margin-top:10px"
        @click="submit"
      >提 交</van-button>
    </div>
  </div>
</template>
<script>
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import { Dialog } from "vant";
import { getInfo } from "@/utils/cookie";
import { Toast } from "vant";
export default {
  data() {
    return {
      title: this.$route.params.bgdId || getInfo("bgdId"),
      infoList: this.$route.params.info || JSON.parse(getInfo("saveList"))
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    submit() {
      Dialog.confirm({
        message: "您确认提交吗"
      })
        .then(() => {
          let data = {
            billno: this.infoList[0].BILLNO,
            certificateno: this.infoList[0].CERTIFICATENO
          };
          console.log(data);
          publicInter(interfaceUrl.dealMaterialLift, data).then(res => {
            console.log(res);
            if (res.code == 200) {
              Toast.success("提交成功");
              // this.this.infoList[0].DEALFLAG = 1;
              setTimeout(() => {
                this.$router.push("/");
              }, 1500);
            } else {
              Toast.fail("提交失败");
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  mounted() {
    console.log(this.infoList);
  }
};
</script>
<style lang="scss">
.detail {
  min-height: 100vh;
  .navBar {
    width: 100%;
    height: 0.6rem;
    background: linear-gradient(to right, #2467f3, #4697fd, #2467f3);
  }
  .content {
    width: 90%;
    margin: auto;
    margin-top: 0.2rem;
    .first {
      border-top: 1px solid #ccc;
    }
    .last {
      border-bottom: 1px solid #ccc;
    }
    li {
      display: flex;
      height: 0.4rem;
      background-color: #fff;
      border-top: 0.01rem solid #eee;
      border-bottom: 0.01rem solid #eee;

      span:nth-child(1) {
        width: 30%;
        height: 0.38rem;
        font-size: 0.14rem;
        font-weight: 500;
        color: #000;
        text-align: right;
        line-height: 0.38rem;
        padding-right: 0.05rem;
        border-right: 1px solid #ccc;
        background-color: #e2e4e7;
        border-left: 1px solid #ccc;
      }
      span:nth-child(2) {
        width: 70%;
        height: 0.4rem;
        font-size: 0.14rem;
        color: #000;
        text-align: left;
        padding-left: 0.05rem;
        line-height: 0.4rem;
        border-right: 1px solid #ccc;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .van-row {
    height: 0.6rem;
    .title {
      margin-top: 0rem !important;
      color: #fff;
      font-size: 0.18rem;
      margin-left: 0.2rem;
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
  .ccbRight {
    width: 18%;
    height: 0.25rem;
    font-size: 0.15rem;
    line-height: 0.25rem;
    color: #fff;
    margin-top: 0.025rem;
    text-align: center;
    border-radius: 0.05rem;
  }
}
</style>