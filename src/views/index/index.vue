<template>
  <div class="index">
    <div class="navBar">
      <van-row>
        <van-col span="4">
          <img src="../../assets/common_icon_nav@2x.png" alt @click="showOpenStatus = true" />
        </van-col>
        <van-col span="16" class="title">快速提离(靠泊直提/机坪直提/卡口直放)</van-col>
        <van-col span="4">
          <img src="../../assets/common_icon_search@2x.png" alt @click="showTop = true" />
        </van-col>
      </van-row>
    </div>
    <div class="content">
      <template v-if="this.infoList.length > 0">
        <li v-for="(item,index) in infoList" :key="index">
          <div class="conHeader" @click="godetail(item.CERTIFICATENO)">
            <p class="spanLeft">{{item.CERTIFICATENO}}</p>
            <span class="spanRight">报关单号</span>
          </div>
          <div class="conContent">
            <div class="ccTop">
              <span class="cctLeft">提运单号:</span>
              <span class="cctRight">{{item.BILLNO}}</span>
            </div>
            <div class="ccTop">
              <span class="cctLeft">处理状态:</span>
              <span class="ccbRight" v-if="item.DEALFLAG == 0 ">未申请</span>
              <span class="ccbRight" v-else style="background-color:#60D000">已申请</span>
            </div>
          </div>
        </li>
      </template>
      <li v-else class="noInfo">无相关记录</li>
    </div>
    <div class="page">
      <page-component :page-config="pageConfigTotal" @changeCurrentPage="changePage"></page-component>
    </div>
   
    <!-- 顶部弹出层 -->
    <van-popup v-model="showTop" position="top" :style="{ width: '100%',height:'47%' }">
      <div class="navBar">
        <van-row>
          <van-col span="4">
            <!-- <img src="../../assets/common_icon_nav@2x.png" alt @click="showLeft = true" /> -->
          </van-col>
          <van-col span="16" class="title">快速提离(靠泊直提/机坪直提/卡口直放)</van-col>
          <van-col span="4">
            <img src="../../assets/common_icon_close@2x.png" alt @click="showTop = false" />
          </van-col>
        </van-row>
      </div>
      <van-form>
        <van-field v-model="tydNum" label="提运单号:" placeholder="请输入提运单号" />
        <van-field v-model="bgdNum" label="报关单号:" placeholder="请输入报关单号" />
        <van-field
          readonly
          clickable
          name="picker"
          :value="value"
          label="处理状态:"
          placeholder="请选择处理状态"
          @click="showPicker = true"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" @click="queryInfo">查 询</van-button>
        </div>
      </van-form>
      <div class="total">
        <div>共 {{ allTotal }} 条数据</div>
        <div>当前查询到 {{queryTotal}} 条数据</div>
      </div>
    </van-popup>

    <!-- 处理状态选择器 -->
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <!-- 侧边栏导航 -->
   <sidebar :openStatus.sync="showOpenStatus" @updateStatus = 'closeSidebar'/>
  </div>
</template>

<script>
import pageComponent from "@/components/page/index.vue";
import sidebar from '@/components/sidebar';
import {removeCookie, removeUsername,getUsername,setBgdId,setSaveList} from "@/utils/cookie";
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import { Dialog ,Toast,Sidebar, SidebarItem} from "vant";
export default {
  components: { pageComponent, Sidebar, SidebarItem ,sidebar},
  data() {
    return {
      showOpenStatus:false,
      infoList: [],
      columns: ["全部", "已申请", "未申请"],
      showTop: false,
      tydNum: "",
      bgdNum: "",
      showPicker: false,
      value: "",
      allTotal: 0,
      queryTotal: 0,
      pageConfigTotal: {
        //分页传参数
        total: 0,
        pageSize: 10,
        pageNo: 1
      }
    };
  },
  methods: {
    //分页点击函数
    changePage(page) {
      this.pageConfigTotal.pageNo = page;
      this.queryList(page);
    },
    godetail(value) {
      setSaveList("saveList", JSON.stringify(this.infoList));
      setBgdId("bgdId", value);
      // localStorage.setItem("tt", this.infoList);
      this.$router.push({
        name: "bgddetail",
        params: {
          info: this.infoList,
          bgdId: value
        }
      });
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    
    closeSidebar(val){
         this.showOpenStatus = val
      },

    //加载显示
    queryList(page) {
      let data = {
        pageNum: page,
        pageSize: 10,
        billno: "",
        certificateno: "",
        status: ""
      };
      publicInter(interfaceUrl.qryMaterialLiftlist, data).then(res => {
        this.pageConfigTotal.total = res.totalRow;
        this.allTotal = res.totalRow;
        this.infoList = res.list;
      });
    },

    //查询接口
    queryInfo() {
      let status = "";
      if (this.value == "已申请") {
        status = 1;
      } else if (this.value == "未申请") {
        status = 0;
      } else {
        status = "";
      }
      let data = {
        pageNum: 1,
        pageSize: 10,
        billno: this.tydNum,
        certificateno: this.bgdNum,
        status: status
      };
      publicInter(interfaceUrl.qryMaterialLiftlist, data).then(res => {
        this.tydNum = "";
        this.bgdNum = "";
        this.pageConfigTotal.total = res.totalRow;
        this.infoList = res.list;
        this.queryTotal = res.totalRow;
      });
    },
  },

  mounted() {
    this.queryList(1);
  }
};
</script>

<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
.index {
  height: 100vh;
  background-color: #fff;
  .navBar {
    width: 100%;
    height: 0.6rem;
    background: linear-gradient(to right, #2467f3, #4697fd, #2467f3);
  }
  .content {
    width: 90%;
    margin: auto;
    li {
      height: 1rem;
      margin-top: 0.2rem;
      .conHeader {
        display: flex;
        width: 100%;
        height: 0.4rem;
        background: linear-gradient(to right, #2467f3, #4697fd);
        .spanLeft {
          display: inline-block;
          width: 70%;
          height: 0.4rem;
          font-size: 0.18rem;
          line-height: 0.4rem;
          text-align: center;
          color: #fff;
          font-weight: 500;
        }
        .spanRight {
          width: 20%;
          height: 0.2rem;
          font-size: 0.12rem;
          background-color: #fff;
          line-height: 0.2rem;
          margin-top: 0.1rem;
          text-align: center;
          border-radius: 0.05rem;
          color: #395eef;
        }
      }
      .conContent {
        width: 100%;
        height: 0.6rem;
        background-color: #fff;
        .ccTop {
          display: flex;
          height: 50%;
          width: 100%;
          line-height: 0.6rem;
          .cctLeft {
            width: 25%;
            height: 0.3rem;
            font-size: 0.16rem;
            text-align: center;
            line-height: 0.3rem;
            font-weight: 500;
            color: #000;
          }
          .cctRight {
            width: 70%;
            height: 0.3rem;
            font-size: 0.15rem;
            line-height: 0.3rem;
            color: #666666;
          }
          .ccbRight {
            width: 18%;
            height: 0.25rem;
            font-size: 0.15rem;
            line-height: 0.25rem;
            color: #fff;
            background-color: #ed4721;
            margin-top: 0.025rem;
            text-align: center;
            border-radius: 0.05rem;
          }
        }
      }
    }
    .noInfo {
      height: 5.3rem;
      margin-top: 0.5rem;
      font-size: 0.2rem;
      text-align: center;
      line-height: 5.3rem;
      margin: auto;
    }
  }
  .van-row {
    height: 0.6rem;
    .title {
      margin-top: 0rem !important;
      color: #fff;
      text-align: center;
      font-size: 0.18rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
    // li {
    //   display: flex;
    //   height: 0.5rem;
    //   border: 1px solid #eee;
    //   .close {
    //     display: block;
    //     width: 0.3rem;
    //     height: 0.3rem;
    //     line-height: 0.5rem;
    //     margin-top: 0.1rem;
    //     margin-left: 0.05rem;
    //     img {
    //       width: 0.3rem;
    //       height: 0.3rem;
    //       margin: auto;
    //     }
    //   }
    //   .navList {
    //     width: 80%;
    //     font-size: 0.16rem;
    //     margin-left: 0.1rem;
    //     text-align: center;
    //     color: #949699;
    //   }
    // }
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
  .page {
    width: 90%;
    height: 50px;
    margin: auto;
    margin-top: 20px;
    line-height: 50px;
    text-align: center;
  }
  .total {
    width: 90%;
    height: 0.3rem;
    display: flex;
    justify-content: space-around;
    margin: auto;
    div {
      text-align: center;
      line-height: 0.3rem;
      font-size: 0.15rem;
    }
  }
}
</style>