<template>
  <div class="card padding headline-item">
    <div class="top">
      <div class="top-left">
        <h2 class="title">
          公办民办一律摇号，学区公办民办一律摇号，学区一律摇号，学区
        </h2>
        <ul class="tag-wrap">
          <li class="tag">xxx</li>
          <li class="tag">xxx</li>
          <li class="tag">xxx</li>
        </ul>
      </div>
      <div class="top-right">
        <div class="img-box">
          <img src="../assets/img/logo.png" alt="" />
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-left">
        <div class="avatar-box">
          <img src="../assets/img/upload-avatar.png" alt="" />
        </div>
        <span class="avatar-name margin-left">xxxxx</span>
      </div>
      <div class="bottom-right">
        <p class="text">465人看过</p>
        <p class="text margin-left large">发布于07月22日</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
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
