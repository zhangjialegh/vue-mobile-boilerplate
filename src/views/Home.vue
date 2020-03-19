<template>
  <div class="home" v-wechat-title="$route.meta.title">
    <van-sticky>
      <div class="header-card">
        <div class="left-item">
          <div class="img-box">
            <img class="avatar" src="../assets/img/logo.png" alt="" />
          </div>
          <div class="agent-info">
            <strong>张合为您提供咨询</strong>
            <span>友家房产经纪人</span>
          </div>
        </div>
        <ul class="right-item">
          <li>
            <img src="../assets/img/service.png" alt="service" />
            <span>咨询</span>
          </li>
          <li>
            <img src="../assets/img/shop.png" alt="shop" />
            <span>商城</span>
          </li>
        </ul>
      </div>
    </van-sticky>

    <div class="home-container">
      <div class="card agent">
        <div class="agent-avatar-box">
          <!-- <img src="../assets/img/defaul-avatar.png" alt="default" /> -->
          <van-uploader>
            <img src="../assets/img/upload-avatar.png" alt="upload" />
          </van-uploader>
        </div>
        <div class="left">
          <p class="info">
            <strong class="name">张合</strong>
            <span class="desc">有家房产经纪人</span>
          </p>
          <p class="location">
            <img src="../assets/img/location.png" alt="" class="loc-icon" />
            <span class="address">上海普陀-万里门店</span>
          </p>
          <p class="abstract">
            本人井坑普陀万里板块10年 熟知张江板块小区、配陀万里板块10年
            <i class="icon go-comment"></i>
          </p>
          <div class="action">
            <button @click="handleActionSheet">主动咨询</button>
          </div>
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

      <h2 class="common-title">独家报告推荐</h2>
      <div class="card padding exclusive-wrap">
        <div class="header">
          <h2 class="title">本月楼市行情报告</h2>
          <p class="to-view-box">
            <span class="text">246人看过</span>
            <i class="icon arrow"></i>
          </p>
        </div>
        <p class="content">
          不同于传统中介的两边居间，只服务买家。专业咨询师从了解需求，定制购买计划；到大数据精选合适房源，陪同带看杀价签约…绝对小白必选呢。
        </p>
        <ul class="report-wrap">
          <li class="report-item">
            <div class="report-shelf">
              <div class="report-box">
                <img
                  class="report-pic"
                  v-lazy="require('../assets/img/upload-avatar.png')"
                  alt="report"
                />
              </div>
              <span class="tag white">报告</span>
            </div>
          </li>
          <li class="report-item">
            <div class="report-shelf">
              <div class="report-box">
                <img
                  class="report-pic"
                  v-lazy="require('../assets/img/upload-avatar.png')"
                  alt="report"
                />
              </div>
              <span class="tag white">报告</span>
            </div>
          </li>
          <li class="report-item">
            <div class="report-shelf">
              <div class="report-box">
                <img
                  class="report-pic"
                  v-lazy="require('../assets/img/upload-avatar.png')"
                  alt="report"
                />
              </div>
              <span class="tag white">报告</span>
            </div>
          </li>
        </ul>
        <p class="recommend">
          <span class="tag-corn">推荐理由</span>
          <span class="text"
            >小白必选、大数据精选、专业咨询师、第一手数据、最全面分析、AI智能自动生成</span
          >
        </p>
      </div>

      <h2 class="common-title">每日最新房源</h2>
      <div class="card transparent my-house-source">
        <!-- <ul class="filter-wrap">
          <li class="filter-item start">
            <span class="label">最新挂牌</span>
            <i class="icon arrow-solid"></i>
          </li>
          <li class="filter-item">
            <span class="label">总价</span>
            <i class="icon arrow-solid"></i>
          </li>
          <li class="filter-item">
            <span class="label">户型</span>
            <i class="icon arrow-solid"></i>
          </li>
          <li class="filter-item">
            <span class="label">户型</span>
            <i class="icon arrow-solid"></i>
          </li>
        </ul> -->

        <div class="house-info-item">
          <div class="top">
            <div class="top-left">
              <img
                v-lazy="require('../assets/img/defaul-avatar.png')"
                alt="house"
              />
            </div>
            <div class="top-right">
              <div class="header">
                <h3 class="title">张江汤臣豪园二期</h3>
                <p class="location">
                  <span class="text">哈啊哈</span>
                  <i class="line"></i>
                  <span class="text">哈啊哈</span>
                </p>
              </div>
              <div class="neck">
                <ul class="tag-wrap">
                  <li class="tag grey">房龄19年</li>
                </ul>
                <p class="hangout">ss<span class="hangday">3</span>tian</p>
              </div>
              <div class="lumbar">
                <span class="text">4是3厅</span>
                <i class="line"></i>
                <span class="text">333㎡</span>
                <i class="line"></i>
                <span class="text">无线</span>
              </div>
              <div class="footer">
                <div class="left">
                  <span class="num">324</span>
                  <span class="unit">完</span>
                </div>
                <div class="right">
                  <i class="icon up"></i>
                  <span class="persent">53%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="will sold">
              <span class="text">我有，直接定价</span>
              <img src="../assets/img/go.png" alt="will" />
            </div>
            <div class="will buy">
              <span class="text">我要，出价求购</span>
              <img src="../assets/img/go.png" alt="will" />
            </div>
          </div>
        </div>
        <div class="house-info-item">
          <div class="top">
            <div class="top-left">
              <img
                v-lazy="require('../assets/img/defaul-avatar.png')"
                alt="house"
              />
            </div>
            <div class="top-right">
              <div class="header">
                <h3 class="title">张江汤臣豪园二期</h3>
                <p class="location">
                  <span class="text">哈啊哈</span>
                  <i class="line"></i>
                  <span class="text">哈啊哈</span>
                </p>
              </div>
              <div class="neck">
                <ul class="tag-wrap">
                  <li class="tag grey">房龄19年</li>
                </ul>
                <p class="hangout">ss<span class="hangday">3</span>tian</p>
              </div>
              <div class="lumbar">
                <span class="text">4是3厅</span>
                <i class="line"></i>
                <span class="text">333㎡</span>
                <i class="line"></i>
                <span class="text">无线</span>
              </div>
              <div class="footer">
                <div class="left">
                  <span class="num">324</span>
                  <span class="unit">完</span>
                </div>
                <div class="right">
                  <i class="icon up"></i>
                  <span class="persent">53%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="will sold">
              <span class="text">我有，直接定价</span>
              <img src="../assets/img/go.png" alt="will" />
            </div>
            <div class="will buy">
              <span class="text">我要，出价求购</span>
              <img src="../assets/img/go.png" alt="will" />
            </div>
          </div>
        </div>
      </div>
      <van-divider :hairline="false" :style="{ borderColor: '#979797' }"
        >下载兔博士APP，查看更多精彩内容</van-divider
      >
    </div>
    <div class="float-footer-box">
      <div class="float-footer">
        <div class="shop-box">
          <img v-lazy="require('../assets/img/shop.png')" alt="shop" />
          <span>商城</span>
        </div>
        <van-button type="danger">转发获客</van-button>
      </div>
    </div>

    <van-action-sheet
      v-model="showActionSheet"
      :actions="actions"
      cancel-text="取消"
      @select="selectActionSheet"
      safe-area-inset-bottom
    >
    </van-action-sheet>
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
      active: 0,
      showActionSheet: false,
      actions: [
        { name: "微信咨询", className: "wechat" },
        { name: "电话咨询", className: "phone" }
      ]
    };
  },
  methods: {
    tabChange(e) {
      console.log(e, "e");
    },
    handleActionSheet() {
      this.showActionSheet = true;
    },
    selectActionSheet(a, b) {
      console.log(a, b, "jjj");
      this.showActionSheet = true;
    }
  },
  created() {
    console.log(this.$gb.thousandFormat("fgrtwwtyewe"));
  }
};
</script>
<style lang="less">
.home {
  min-height: 100%;
  width: 100%;
  .agent {
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
        display: flex;
        justify-content: flex-start;
        align-items: center;
        > .loc-icon {
          height: 12px;
          width: 12px;
        }
        > .address {
          margin-left: 3px;
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
        position: relative;
        > .go-comment {
          display: block;
          position: absolute;
          bottom: 2px;
          right: 0;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ffffff url("../assets/img/will-icon.png") no-repeat
            center center;
          background-size: contain;
        }
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
  }

  .agent-avatar-box {
    text-align: right;
    img {
      width: 200px;
      height: 150px;
    }
  }
  .van-action-sheet__item {
    .van-action-sheet__name {
      margin-left: 50px;
      position: relative;
      display: block;
      &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-65px, -50%);
        content: "";
        width: 25px;
        height: 25px;
      }
    }
    &.wechat {
      > .van-action-sheet__name {
        &::before {
          background: url("../assets/img/wechat.png") no-repeat center center;
          background-size: contain;
        }
      }
    }
    &.phone {
      > .van-action-sheet__name {
        &::before {
          background: url("../assets/img/phone.png") no-repeat center center;
          background-size: contain;
        }
      }
    }
  }
  .van-action-sheet__cancel {
    color: #fd5056;
    background-color: #f7f8fa;
  }
}
</style>
