App({
  towxml: require('/towxml/index'),
  onLaunch: function () {
    this.globalData = {
      _openId: "",
      isLogin: false
    }

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
      var isLogin = wx.getStorageSync('isLogin');
      var avatarUrl = wx.getStorageSync('avatarUrl');
      var nickName = wx.getStorageSync('nickName');
      if (isLogin === true) {
        this.globalData.isLogin = true;
        this.globalData.avatarUrl = avatarUrl;
        this.globalData.nickName = nickName;
      }
    }
  },
})