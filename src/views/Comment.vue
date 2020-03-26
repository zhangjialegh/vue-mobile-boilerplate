<template>
  <div class="comment" v-wechat-title="$route.meta.title">
    <div class="textarea-wrap">
      <div class="textarea-box">
        <van-field
          v-model="value"
          rows="4"
          type="textarea"
          :maxlength="maxNum"
          placeholder="请介绍下自己吧"
          @input="handleInput"
        />
        <p class="left-words">
          加油，还差<span>{{ leftNum }}</span
          >个字
        </p>
        <i v-show="!value" class="icon icon-comment"></i>
      </div>
    </div>
    <div class="float-footer-box">
      <div class="float-footer center">
        <van-button type="danger" style="width:100%" @click="putMemo"
          >提交</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import {updateMemo} from "@api/index"
export default {
  data() {
    return {
      value: "",
      maxNum: 50,
      leftNum: 50
    };
  },
  methods: {
    handleInput(val) {
      this.leftNum = this.maxNum - val.length;
    },
    putMemo() {
      if (!this.value.trim()) {
        this.$toast("个人简介不能为空");
        return;
      }
      updateMemo({
        memo: this.value
      }).then(res => {
          if (res.data.resultCode === 0) {
            const t = setTimeout(() => {
              this.$gb.updateMemo(this.value);
              this.$router.go(-1);
              clearTimeout(t);
            }, 500);
            this.$toast.success({
              duration: 500,
              message: "保存成功"
            });
          } else {
            this.$toast(res.data.errMsg);
          }
        });
    }
  }
};
</script>
<style lang="less">
.comment {
  .textarea-wrap {
    padding: 15px;
    .textarea-box {
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.05);
      overflow: hidden;
      position: relative;
      > .icon-comment {
        content: "";
        display: block;
        width: 15px;
        height: 15px;
        position: absolute;
        left: 15px;
        top: 12px;
        background: url("../assets/img/comment.png") no-repeat center center;
        background-size: contain;
        z-index: 999;
      }
    }
    .van-cell {
      &.van-field {
        background-color: transparent;
        padding-bottom: 0;
        textarea {
          opacity: 0.8;
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #000000;
          letter-spacing: 0;
          line-height: 26px;
          &::placeholder {
            opacity: 0.4;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #000000;
            letter-spacing: 0;
            line-height: 16px;
            text-indent: 20px;
          }
        }
      }
    }
    .left-words {
      text-align: right;
      opacity: 0.4;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #000000;
      letter-spacing: 0;
      text-align: right;
      line-height: 12px;
      padding-right: 15px;
      padding-bottom: 15px;
      > span {
        color: #fd5056;
        display: inline-block;
        width: 15px;
        text-align: center;
      }
    }
  }
}
</style>
