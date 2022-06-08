<template>
  <div class="login">
    <div class="header">
      <img src="../../assets/bg3.png" alt />
      <div class="headerWrap">
        <div class="headerTop">登 录</div>
        <div class="headerTitle">
          <span class="firstTitle">智 慧 通</span>
          <span class="secondTitle">--进出口贸易企业--</span>
        </div>
      </div>
    </div>
    <div class="loginForm">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名:"
          placeholder="请输入跨境贸易大数据平台用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码:"
          placeholder="请输入跨境贸易大数据平台密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
        <van-row>
          <van-col span="16">
            <van-field
              v-model="repass"
              name="验证码"
              label="验证码:"
              placeholder="验证码"
              :rules="[{ required: true, message: '请填写验证码' }]"
            />
          </van-col>
          <van-col span="8">
            <img :src="imgUrl" alt @click="change" />
          </van-col>
        </van-row>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">登 录</van-button>
        </div>
      </van-form>
    </div>
    <div class="img">
      <img src="@/assets/ksh.png" alt="">
    </div>
  </div>
</template>

<script>
import { setCookie, setUsername, setNewCook } from "@/utils/cookie";
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import { JSEncrypt } from "jsencrypt";
import axios from "axios";
import { Toast } from "vant";
import BASEURL from '@/utils/env.js'

export default {
  data() {
    return {
      username: "",
      password: "",
      repass: "",
      imgUrl: "",
      sign: "",
      retail:
        "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh/PSTjHMsAhzbUMDGl1f0BugdXtOJneQi02ecca4qxsv5qZPIdO/MWM01S1XZ0o/4BF6hlxp8b7opmILkGroJ2lguMr5CiY6cRE6gsCD+Aw3EpLFDtvwEuvLG4ZJcuuvN5GVd4efc9sYJGS1gUWKsJWCnUf/a3c6f1wTR2APB+5kr9rIfRjPbrwf6DQGjiRQZ4gB+gj0uiUWy3XnDKhIqVe0tFUaOtzYgStMm2ItV2Mqh3JdFrVg0Fd6hirHaGv/q8BIOo1NDVSWHkHAZk6/YFU3ASU+CXglOjTUmFFw+ALklzuaM4C5hXH3qmBzUlmdI5RIYxuyBacxI4F9DbegSQIDAQAB"
    };
  },
  methods: {
    onSubmit() {
      //用户角色区分
      function urlSearchParmas(dataObj) {
        let qs = "",
          split = "&",
          keys = Object.keys(dataObj);
        for (let i = 0; i < keys.length; i++) {
          if (i === keys.length - 1) {
            split = "";
          }
          qs += keys[i] + "=" + dataObj[keys[i]] + split;
        }
        return qs;
      }

      //密码加密
      var encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.retail);
      var d = encrypt.encrypt(this.password);
      var ps = encodeURI(d).replace(/\+/g, "%2B");

      let data = urlSearchParmas({
        username: this.username,
        password: ps,
        client_id: "m1",
        client_secret: "s1",
        grant_type: "password",
        scope: "read",
        f1: true,
        sign: this.sign,
        kaptcha: this.repass, //验证码
        expoStartTime: "2019-01-01",
        expoEndTime: "2019-12-31",
        app_type:'appForPhoneno'  //判断企业是否绑定手机号码 
      });
      axios({
        method: "post",
        url: BASEURL+ interfaceUrl.login,
        data: data,
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          Accept: "*/*"
        }
      }).then(res => {
        console.log(res)
        return false
        if (res.data.code == "411") {
           Toast({
               message:res.data.msg,
               duration:'3000'
           });
            setTimeout(() => {
              this.$router.go(0);
            }, 3000);
            return false;
        }else if(res.data.code == "400"){
            Toast.fail(res.data.msg);
           return false;
        } else {
          setCookie(res.data.token); //设置用户的token值
          setUsername(this.username); //保存用户的用户名
          setNewCook("roler", res.data.role);
          setNewCook("shiroCookie", res.data.token);
          setNewCook("ACCESS_TOKEN", "bearer " + res["data"]["token"], 0);
          this.$store.commit("login/SET_TOKEN", res.data.token); //存储用户token到vuex
          this.$store.commit("login/SET_USERNAME", this.username); //存储用户名到Vuex
          Toast.success("登陆成功");
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        }
      }).catch(err=>{
        console.log(err)
      });
    },
    change() {
      publicInter(interfaceUrl.kaptcha + new Date()).then(res => {
        this.imgUrl = res.imageCode;
        this.sign = res.sign;
      });
    }
  },
  mounted() {
    this.change();
  }
};
</script>

<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
.login {
  .header {
    position: relative;
    width: 100%;
    height: 2.8rem;
    img {
      display: block;
      width: 100%;
      height: 2.8rem;
      opacity: 0.8;
    }
    .headerWrap {
      position: absolute;
      top: 0.3rem;
      left: 0;
      width: 100%;
      height: 2rem;
      .headerTop {
        font-size: 0.18rem;
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: center;
        font-weight: 500;
        color: #fff;
      }
      .headerTitle {
        margin-top: 0.1rem;
        height: 0.8rem;
        .firstTitle{
          font-size: 0.32rem;
        }
        .secondTitle{
          font-size: 0.2rem;
          margin-top: 0.12rem;
        }
        span {
          display: block;
          height: 0.4rem;
          font-size: 0.22rem;
          line-height: 0.4rem;
          text-align: center;
          font-weight: 500;
          color: #fff;
        }
      }
    }
  }
  .loginForm {
    position: absolute;
    top: 2.6rem;
    left: 0;
    width: 100%;
    height: 3rem;
    background-color: #fff;
    margin-top: -0.5rem;
    z-index: 999;
    border-radius: 0.3rem 0.3rem 0 0;
    .van-form {
      padding-top: 0.5rem;
      width: 90%;
      margin: auto;
    }
  }
  .img{
    position: fixed;
    bottom: 5%;
    left: 40%;
    width: 1rem;
    height: 1rem;
    img{
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .van-row .van-col {
    font-size: 0.2rem;
    img {
      width: 1rem;
      height: 0.5rem;
    }
  }
}
</style>