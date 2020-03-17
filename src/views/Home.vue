<template>
  <div class="home" v-wechat-title="$route.meta.title">
    <div class="home-container">
      <h2 class="common-title">上海最新房价动态</h2>
      <div class="card agent">
        <div class="left">
          <p class="info">
            <strong class="name">张合</strong>
            <span class="desc">有家房产经纪人</span>
          </p>
          <p class="location">
            <img src="" alt="" class="loc-icon" />
            <span class="address">上海普陀-万里门店</span>
          </p>
          <p class="abstract">
            本人井坑普陀万里板块10年 熟知张江板块小区、配陀万里板块10年
          </p>
          <div class="action">
            <button>主动咨询</button>
          </div>
        </div>
        <div class="agent-avatar-box">
          <img src="../assets/img/defaul-avatar.png" alt="" />
        </div>
      </div>

      <h2 class="common-title">上海最新房价动态-样式</h2>
      <div class="card padding">
        <van-tabs v-model="active" swipeable animated @change="tabChange">
          <van-tab :title="'选项 1'">
            <house-tab />
          </van-tab>
          <van-tab :title="'选项 2'">
            <house-tab />
          </van-tab>
          <van-tab :title="'选项 3'">
            <estate-tab />
          </van-tab>
        </van-tabs>
      </div>

      <h2 class="common-title">地产头条</h2>
      <div>
        <head-line-item />
        <head-line-item />
        <head-line-item />
      </div>
    </div>
  </div>
</template>

<script>
import HouseTab from "@components/HouseTab";
import EstateTab from "@components/EstateTab";
import HeadLineItem from "@components/HeadLineItem";
export default {
  name: "Home",
  components: { HouseTab, EstateTab, HeadLineItem },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    tabChange(e) {
      console.log(e, "e");
    }
  }
};
</script>
<style lang="less">
.home {
  background: #f5f5f5;
  min-height: 100%;
  width: 100%;
  .left {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    .info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      > .name {
        opacity: 0.8;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #000000;
        line-height: 16px;
      }
      > .desc {
        opacity: 0.8;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #000000;
        line-height: 12px;
        display: inline-block;
        padding: 0 5px;
        margin-left: 5px;
        border-left: 1px solid rgba(0, 0, 0, 0.8);
      }
    }
    .location {
      line-height: 12px;
      > .loc-icon {
        height: 12px;
        width: 12px;
      }
      > .address {
        opacity: 0.8;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #000000;
        line-height: 12px;
      }
    }
    .abstract {
      // padding: 8px 0;
      margin: 8px 0;
      opacity: 0.4;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #000000;
      line-height: 16px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .action {
      height: 24px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      > button {
        background: #fd5056;
        border-radius: 14px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #ffffff;
        width: 78px;
        height: 100%;
      }
    }
  }
  .agent-avatar-box {
    text-align: right;

    img {
      width: 200px;
      height: 150px;
    }
  }
}
</style>
