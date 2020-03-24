<template>
  <div class="card padding headline-item">
    <div class="top">
      <div class="top-left">
        <h2 class="title">
          {{ data.title }}
        </h2>
        <ul class="tag-wrap" v-if="data.tag && data.tag.length">
          <li class="tag grey" v-for="(item, index) in data.tag" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="top-right">
        <div class="img-box">
          <img v-lazy="data.image[0]" alt="pic" />
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-left">
        <div class="avatar-box">
          <img v-lazy="data.headUrl" alt="headUrl" />
        </div>
        <span class="avatar-name margin-left">{{ data.author }}</span>
      </div>
      <div class="bottom-right">
        <p class="text">{{ data.readCount || 0 }}人看过</p>
        <p class="text margin-left large">发布于{{ data.pubTime }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: function() {
        return {};
      }
    }
  }
};
</script>
<style lang="less">
.card {
  &.headline-item {
    > .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 83px;
      > .top-left {
        height: 100%;
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
        padding-right: 10px;
        .tag-wrap {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding-bottom: 10px;
        }
      }
      > .top-right {
        height: 100%;
      }
    }
    > .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 10px;
      > .bottom-left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      > .bottom-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      .margin-left {
        margin-left: 10px;
        &.large {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
