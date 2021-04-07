const app = getApp();
Page({
  data: {

    // article: {},
    val: ""
  },

  // toTowxml(e) {
  //   console.log(this.data.val);
  // },

  toDetail() {
    if (app.globalData.isLogin !== true) {
      wx.getUserProfile({
        desc: "获取头像及昵称,展示个人笔记",
        success: (res) => {
          wx.setStorage({
            key: "nickName",
            data: res.userInfo.nickName,
          });
          wx.setStorage({
            key: "avatarUrl",
            data: res.userInfo.avatarUrl,
          });
          wx.setStorage({
            key: "isLogin",
            data: true,
          });
          app.globalData.isLogin = true;
          app.globalData.avatarUrl = res.userInfo.avatarUrl;
          app.globalData.nickName = res.userInfo.nickName;
          let c = JSON.stringify(this.data.val)
          wx.navigateTo({
            url: '/pages/details/details?essay=' + encodeURIComponent(c),
          });
        },
        fail: (res) => {
          console.log(res);
          wx.showToast({
            title: '授权失败',
            icon: 'error'
          })
        }
      })
    } else {
      let c = JSON.stringify(this.data.val)
      wx.navigateTo({
        url: '/pages/details/details?essay=' + encodeURIComponent(c),
      })
    }
  },

  onLoad(options) {},


})