const app = getApp();
Page({
  data: {

    // article: {},
    val: ""
  },

  // toTowxml(e) {
  //   let res = app.towxml(this.data.val, 'markdown');
  //   this.setData({
  //     article: res
  //   })
  // },

  toDetail() {
    if (app.globalData.isLogin === false) {
      wx.showToast({
        title: '请先行登陆',
        icon: 'error'
      })
      return;
    }
    let c = JSON.stringify(this.data.val)
    wx.navigateTo({
      url: '/pages/details/details?essay=' + encodeURIComponent(c),
    })
  },

  onLoad(options) {},


})