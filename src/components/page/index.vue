<template>
  <div class="pageComponent" v-if="pageConfig.total">
    <button @click="prePage" :disabled="currentPage === 1"><</button>
    <button @click="preFivePage"  v-if ='currentPage >5 '><<</button>
    <template v-if="pageTotal <= showPageNo">
      <button
        v-for="i in pageTotal"
        @click="changeCurrentPage(i)"
        :class="{active:i === currentPage}"
        :key="i"
      >{{i}}</button>
    </template>
    <template v-else-if="currentPage < 4">
      <button
        v-for="i in 6"
        @click="changeCurrentPage(i)"
        :class="{active:i === currentPage}"
        :key="i"
      >{{i}}</button>
      <button :disabled="true">···</button>
      <button @click="changeCurrentPage(pageTotal)">{{pageTotal}}</button>
    </template>
    <template v-else-if="currentPage > pageTotal - 4">
      <button @click="changeCurrentPage(1)">1</button>
      <button :disabled="true">···</button>
      <button
        v-for="i in 6"
        @click="changeCurrentPage(i + (pageTotal - 6))"
        :class="{active:(i + (pageTotal - 6)) === currentPage}"
        :key="i"
      >{{i + (pageTotal - 6)}}</button>
    </template>
    <template v-else>
      <button @click="changeCurrentPage(1)">1</button>
      <button :disabled="true">···</button>
      <button @click="changeCurrentPage(currentPage - 2)">{{currentPage - 2}}</button>
      <button @click="changeCurrentPage(currentPage - 1)">{{currentPage - 1}}</button>
      <button class="active">{{currentPage}}</button>
      <button @click="changeCurrentPage(currentPage + 1)">{{currentPage + 1}}</button>
      <button @click="changeCurrentPage(currentPage + 2)">{{currentPage + 2}}</button>
      <button :disabled="true">···</button>
      <button @click="changeCurrentPage(pageTotal)">{{pageTotal}}</button>
    </template>
    <!--下一页-->
    <button @click="nextFivePage" v-if=" pageTotal - currentPage >5">>></button>
    <button @click="nextPage" :disabled="currentPage === pageTotal">></button>
  </div>
</template>

<script>
export default {
  name: "pageComponent",
  props: {
    pageConfig: {
      type: Object,
      require: true,
      default() {
        return {
          pageSize: 10,
          pageNo: 0,
          total: 0,
          pageTotal: 0
        };
      }
    }
  },
  data() {
    return {
      showPageNo: 8,
      currentPage: 0
    };
  },
  methods: {
    nextFivePage(){
      this.currentPage += 5;
      this.$emit("changeCurrentPage", this.currentPage);
    },
    preFivePage(){
      this.currentPage -= 5;
      this.$emit("changeCurrentPage", this.currentPage);
    },
    prePage() {
      this.currentPage -= 1;
      this.$emit("changeCurrentPage", this.currentPage);
    },
    nextPage() {
      this.currentPage += 1;
      this.$emit("changeCurrentPage", this.currentPage);
    },
    changeCurrentPage(i) {
      this.currentPage = i;
      this.$emit("changeCurrentPage", this.currentPage);
    }
  },
  computed: {
    pageTotal() {
      const config = this.pageConfig;
      if (config.pageTotal) {
        return config.pageTotal;
      } else {
        if (config.pageSize && config.total) {
          return Math.ceil(config.total / config.pageSize);
        } else {
          return 0;
        }
      }
    }
  },
  created: function() {
    this.currentPage = this.pageConfig.pageNo || 0;
  }
};
</script>

<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
.pageComponent {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 0.2rem;
  overflow: hidden;
  button {
    margin: 0 3px;
    background-color: #f4f4f5;
    color: #404244;
    outline: none;
    border-radius: 2px;
    padding: 0 2px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 25px;
    height: 0.35rem;
    width: 0.25rem;
    line-height: 0.35rem;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
