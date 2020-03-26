<template>
  <div class="home" v-wechat-title="$route.meta.title">
    <van-pull-refresh
      v-model="isRefresh"
      :head-height="80"
      @refresh="onRefresh"
    >
      <van-sticky v-if="accessType === 'customer'">
        <div class="header-card">
          <div class="left-item">
            <div class="img-box">
              <img class="avatar" src="../assets/img/logo.png" alt="" />
            </div>
            <div class="agent-info">
              <strong>{{ agentInfo.superiorName }}为您提供咨询</strong>
              <span>{{ agentInfo.agentName }}经纪人</span>
            </div>
          </div>
          <ul class="right-item">
            <li @click="handleActionSheet">
              <img src="../assets/img/service.png" alt="service" />
              <span>咨询</span>
            </li>
            <li @click="navigateToShop">
              <img src="../assets/img/shop.png" alt="shop" />
              <span>商城</span>
            </li>
          </ul>
        </div>
      </van-sticky>

      <div class="home-container">
        <div class="card agent">
          <div
            class="agent-avatar-box"
            :class="{ 'grey-bg': agentInfo.headImgUrl }"
          >
            <img
              class="head-img-url"
              v-if="agentInfo.headImgUrl"
              :src="agentInfo.headImgUrl"
              alt="avatar"
            />
            <img
              class="default-img"
              v-else-if="accessType === 'customer'"
              src="../assets/img/defaul-avatar.png"
              alt="avatar"
            />
            <van-uploader
              v-else-if="accessType === 'agent'"
              result-type="dataUrl"
              :after-read="handleUpoload"
            >
              <img
                class="default-img"
                src="../assets/img/upload-avatar.png"
                alt="default"
              />
            </van-uploader>
          </div>
          <div class="left">
            <p class="info">
              <strong class="name">{{ agentInfo.superiorName }}</strong>
              <span class="desc">{{ agentInfo.agentName }}</span>
            </p>
            <p class="location">
              <img src="../assets/img/location.png" alt="" class="loc-icon" />
              <span class="address">{{ agentInfo.storeName }}</span>
            </p>
            <p class="abstract" @click="navigateToComment">
              {{
                abstractText || "个人简介：主动填写，可以获得更多用户的信任哦"
              }}
              <i class="icon go-comment" v-if="!abstractText"></i>
            </p>
            <div class="action">
              <button @click="handleActionSheet">主动咨询</button>
            </div>
          </div>
        </div>
        <template v-if="JSON.stringify(propertyDynamic) !== '{}'">
          <h2 class="common-title">上海最新房价动态</h2>
          <div class="card padding">
            <van-tabs v-model="active" swipeable animated :lazy-render="false">
              <van-tab title="二手房" v-if="propertyDynamic.secondHandContent">
                <house-tab
                  type="second-hand"
                  :data="propertyDynamic.secondHandContent"
                />
              </van-tab>
              <van-tab title="新房" v-if="propertyDynamic.newHouseCentent">
                <house-tab
                  type="new-house"
                  :data="propertyDynamic.newHouseCentent"
                />
              </van-tab>
              <van-tab title="主营小区" v-if="propertyDynamic.houseContent">
                <estate-tab :data="propertyDynamic.houseContent" />
              </van-tab>
            </van-tabs>
          </div>
        </template>

        <template v-if="recommendList && recommendList.length">
          <h2 class="common-title">地产头条</h2>
          <div>
            <head-line-item
              :data="item"
              v-for="(item, index) in recommendList"
              :key="index"
              @click.native="navigateToRecommend(item)"
            />
          </div>
        </template>

        <template v-if="onlyReportInfo.hadoop && onlyReportInfo.hadoop.length">
          <h2 class="common-title">独家报告推荐</h2>
          <div class="card padding exclusive-wrap">
            <div class="header">
              <h2 class="title">{{ onlyReportInfo.title }}</h2>
              <p class="to-view-box">
                <span class="text">{{ onlyReportInfo.viewCount }}人看过</span>
                <i class="icon arrow"></i>
              </p>
            </div>
            <p class="content">
              {{ onlyReportInfo.desc }}
            </p>
            <ul class="report-wrap">
              <li
                class="report-item"
                v-for="(item, index) in onlyReportInfo.hadoop"
                :key="index"
              >
                <div class="report-shelf" @click="navigateToReportItem(item)">
                  <div class="report-box">
                    <img
                      class="report-pic"
                      v-lazy="item.standardCover"
                      alt="report"
                    />
                  </div>
                  <span class="tag white">报告</span>
                </div>
              </li>
            </ul>
          </div>
        </template>

        <template v-if="myEstateHouse && myEstateHouse.length">
          <h2 class="common-title">每日最新房源</h2>
          <div class="card transparent my-house-source">
            <div
              class="house-info-item"
              v-for="(item, index) in myEstateHouse"
              :key="index"
            >
              <div class="top">
                <div class="top-left">
                  <img v-lazy="item.picList[0]" alt="house" />
                </div>
                <div class="top-right">
                  <div class="header">
                    <h3 class="title">{{ item.houseName }}</h3>
                    <p class="location">
                      <span class="text">{{ item.plateName }}</span>
                      <i class="line"></i>
                      <span class="text">{{ item.districtName }}</span>
                    </p>
                  </div>
                  <div class="neck">
                    <ul class="tag-wrap">
                      <li class="tag grey">房龄19年</li>
                    </ul>
                    <p class="hangout">
                      挂牌<span class="hangday">{{ item.listedDay }}</span
                      >天
                    </p>
                  </div>
                  <div class="lumbar">
                    <span class="text"
                      >{{ item.roomCount }}室{{ item.livingRoomCount }}厅</span
                    >
                    <i class="line"></i>
                    <span class="text"
                      >{{ $gb.thousandFormat(item.area) }}㎡</span
                    >
                    <i class="line"></i>
                    <span class="text"
                      >{{ $gb.thousandFormat(item.avgPrice) }}万/㎡</span
                    >
                  </div>
                  <div class="footer">
                    <div class="left">
                      <span class="num">{{
                        $gb.thousandFormat(item.totalPriceMillion)
                      }}</span>
                      <span class="unit">万</span>
                    </div>
                    <div class="right">
                      <!-- <i class="icon up"></i>
                      <span class="persent">53%</span> -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="bottom">
                <div class="will sold" @click="navigateToSold(item)">
                  <span class="text">我有，直接定价</span>
                  <img src="../assets/img/go.png" alt="will" />
                </div>
                <div class="will buy" @click="navigateToBuy(item)">
                  <span class="text">我要，出价求购</span>
                  <img src="../assets/img/go.png" alt="will" />
                </div>
              </div>
            </div>
          </div>
        </template>

        <van-divider :hairline="false" :style="{ borderColor: '#979797' }"
          >下载兔博士APP，查看更多精彩内容</van-divider
        >
        <p class="divider-bottom-text">
          经纪人可前往关注“兔博士超级经纪人”，获取更多免费工具
        </p>
      </div>
    </van-pull-refresh>

    <div class="float-footer-box" v-if="accessType === 'agent'">
      <div class="float-footer">
        <div class="shop-box" @click="navigateToShop">
          <img v-lazy="require('../assets/img/shop.png')" alt="shop" />
          <span>商城</span>
        </div>
        <van-button type="danger" @click="handleShare">转发获客</van-button>
      </div>
    </div>

    <van-action-sheet
      v-model="showActionSheet"
      v-if="actions"
      :actions="actions"
      cancel-text="取消"
      @select="selectActionSheet"
      safe-area-inset-bottom
    >
    </van-action-sheet>
    <share-overly ref="shareOverly" />
  </div>
</template>

<script>
import HouseTab from "@components/HouseTab";
import EstateTab from "@components/EstateTab";
import HeadLineItem from "@components/HeadLineItem";
import ShareOverly from "@components/ShareOverly";
import { wxConfig, wxShare, wxLocation } from "@assets/js/wxSdk";
import { shareDomin, defaultShareImgUrl, marketUrl } from "@config/index";
import {
  dailyQuotes,
  recommendTop,
  onlyReports,
  estateHouse,
  uploadImage,
  updateHeadUrl,
  wxAuth
} from "@api/index";
export default {
  name: "Home",
  components: { HouseTab, EstateTab, HeadLineItem, ShareOverly },
  data() {
    return {
      active: 0,
      showActionSheet: false,
      isRefresh: false,
      propertyDynamic: {},
      onlyReportInfo: {},
      recommendList: [],
      myEstateHouse: []
    };
  },
  computed: {
    cityId() {
      return this.$route.query.cityId || this.$store.state.userInfo.cityId;
    },
    superiorId() {
      return (
        this.$route.query.superiorId || this.$store.state.userInfo.superiorId
      );
    },
    accessType() {
      return this.$store.state.accessType;
    },
    abstractText() {
      return this.$store.state.abstractText;
    },
    agentInfo() {
      return this.$store.state.userInfo;
    },
    wxInit() {
      return this.$store.state.wxInit;
    },
    actions() {
      const agentInfo = this.$store.state.userInfo;
      const acs = [];
      if (agentInfo.weChatNum) {
        acs.push({ name: "微信咨询", className: "wechat" });
      }
      if (agentInfo.contactinfo) {
        acs.push({ name: "电话咨询", className: "phone" });
      }
      return acs;
    }
  },
  methods: {
    async initData(isRefresh) {
      const vm = this;
      this.getOnlyReports(isRefresh);
      this.getEstateHouse(isRefresh);
      if (this.wxInit) {
        const { lng, lat } = await wxLocation();
        this.getDailyQuotes(isRefresh, { lng, lat });
        this.getRecommendTop(isRefresh, { lng, lat });
      } else {
        try {
          const res = await wxAuth();
          if (res.data.code === 0) {
            await wxConfig(res.data.data);
            const { lng, lat } = await wxLocation();
            this.getDailyQuotes(isRefresh, { lng, lat });
            this.getRecommendTop(isRefresh, { lng, lat });
          } else {
            vm.$toast.fail(res.data.message);
          }
        } catch (error) {
          vm.$toast.fail("微信sdk注册失败!");
        }
      }
    },
    // 城市动态
    async getDailyQuotes(isRefresh = false, options) {
      if (this.wxInit) {
        try {
          const res = await dailyQuotes(isRefresh, {
            cityId: this.cityId,
            include: "1,2,5",
            ...options
          });
          this.isRefresh = false;
          this.propertyDynamic = res.data.body;
        } catch (err) {
          this.isRefresh = false;
        }
      }
    },
    // 地产头条
    getRecommendTop(isRefresh = false, options) {
      recommendTop(isRefresh, {
        cityId: this.cityId,
        ...options
      })
        .then(res => {
          this.isRefresh = false;
          const body = res.data.body;
          if (body && body.list) {
            this.recommendList = body.list.filter(
              item => item.type === "article"
            );
            const title = this.recommendList[0].title;
            this.initCustomShare(title);
          } else {
            this.recommendList = [];
          }
        })
        .catch(() => {
          this.isRefresh = false;
        });
    },
    // 独家报告
    getOnlyReports(isRefresh = false) {
      onlyReports(isRefresh, {
        cityId: this.cityId
      })
        .then(res => {
          this.isRefresh = false;
          const body = res.data.body;
          if (body.type == 3) {
            this.onlyReportInfo = body.onlyReports;
          } else {
            this.onlyReportInfo = {};
          }
        })
        .catch(() => {
          this.isRefresh = false;
        });
    },
    // 我的小区房源
    getEstateHouse(isRefresh = false) {
      estateHouse(isRefresh, {
        cityId: this.cityId,
        superiorId: this.superiorId
      })
        .then(res => {
          this.isRefresh = false;
          const body = res.data.body;
          if (body && body.estateList) {
            this.myEstateHouse = body.estateList;
          } else {
            this.myEstateHouse = [];
          }
        })
        .catch(() => {
          this.isRefresh = false;
        });
    },
    // 上传头像
    async handleUpoload(file) {
      const vm = this;
      try {
        const res = await uploadImage({ base64Data: file.content });
        const { url } = res.data.data;
        try {
          const res = await updateHeadUrl({ headUrl: url });
          console.log(res, "mmm");
        } catch (error) {
          vm.$toast.fail("图片上传失败!");
        }
      } catch (error) {
        vm.$toast.fail("图片上传失败!");
      }
    },
    handleActionSheet() {
      this.showActionSheet = true;
    },
    selectActionSheet(a) {
      if (a.className.includes("wechat")) {
        this.$gb.h5Copy(this.agentInfo.weChatNum);
        this.$toast.success("微信号复制成功!");
        this.showActionSheet = false;
      }
      if (a.className.includes("phone")) {
        this.$gb.makePhoneCall(this.agentInfo.contactinfo);
      }
    },
    onRefresh() {
      this.initData(true);
      this.isRefresh = true;
    },
    // 跳转个人简介
    navigateToComment() {
      if (this.abstractText || this.accessType === "customer") return;
      this.$router.push("/comment");
    },
    navigateToRecommend(item) {
      location.href = item.mUrl;
    },
    navigateToReportItem(item) {
      location.href = item.mUrl;
    },
    // 跳转商城
    navigateToShop() {
      location.href = marketUrl;
    },
    // 房东报价跳转
    navigateToSold(item) {
      location.href = item.landlordH5Url;
    },
    // 卖家报价跳转
    navigateToBuy(item) {
      location.href = item.buyerH5Url;
    },
    // 点击分享
    handleShare() {
      this.$refs.shareOverly.showOverly();
    },
    // 微信自定义分享 TODO:
    async initCustomShare(title) {
      const vm = this;
      try {
        await wxShare({
          title,
          imgUrl: vm.agentInfo.headImgUrl || defaultShareImgUrl,
          link: `${shareDomin}/?cityId=${vm.cityId}&superiorId=${vm.superiorId}`
        });
      } catch (error) {
        vm.$toast.fail("微信分享自定义失败!");
      }
    }
  },
  created() {
    this.initData();
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
          display: inline-block;
          // position: absolute;
          // bottom: 2px;
          // right: 0;
          vertical-align: middle;
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
      &.head-img-url {
        width: 124px;
        height: 142px;
        position: absolute;
        bottom: 1px;
        right: 30px;
      }
      &.default-img {
        width: 200px;
        height: 150px;
      }
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
  .van-divider {
    &.van-divider--content-center {
      opacity: 0.4;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #000000;
      letter-spacing: 0;
      text-align: center;
      line-height: 12px;
    }
  }

  .divider-bottom-text {
    opacity: 0.4;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #000000;
    letter-spacing: 0;
    text-align: center;
    line-height: 12px;
    margin-top: -6px;
    margin-bottom: 10px;
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
