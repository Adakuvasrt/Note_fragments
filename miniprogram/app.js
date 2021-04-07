//app.js
import deviceUtil from "/miniprogram_npm/lin-ui/utils/device-util"
App({
  towxml: require('/towxml/index'),
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'note-fragments-1g0a4wvo15edfd42',
        traceUser: true,
      })
      wx.cloud.callFunction({
        name: 'login'
      }).then(res => {
        this.globalData._openId = res.result.openid
      })

    }

    this.globalData = {
      _openId: "",
      isLogin: false,
      avatarUrl: "/img/头像修改.png",
      nickName: " 点击登录",
      vipLevel: "    "
    }
  },
  getNavigationBarHeight() {
    const capsuleBarHeight = deviceUtil.getNavigationBarHeight()
    console.log(`CapsuleBar 的高度为${capsuleBarHeight}rpx`)
  },
})