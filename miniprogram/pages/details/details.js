const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: null,
    val: null,
    tag: null,
    overt: null,
  },

  returnBack() {
    wx.navigateBack({
      delta: 0,
    })
  },
  publish() {
    if (this.data.val === "") {
      wx.showToast({
        title: '请先填写内容~',
        icon: 'error'
      })
      return;
    }
    wx.showLoading({
      title: '发表中',
    })
    var timestamp = new Date().getTime();
    var date = new Date(timestamp + 8 * 3600 * 1000);
    let timestampf = date.toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '/');
    let newArticle = {
      openId: app.globalData._openId,
      avatarUrl: app.globalData.avatarUrl,
      nickName: app.globalData.nickName,
      content: this.data.val,
      article: this.data.article,
      tag: this.data.tag,
      overt: this.data.overt,
      likenum: 0,
      comment: [],
      timestamp: timestampf,
    }
    wx.cloud.callFunction({
      name: "loadArticle",
      data: {
        avatarUrl: app.globalData.avatarUrl,
        nickName: app.globalData.nickName,
        content: this.data.val,
        article: this.data.article,
        tag: this.data.tag,
        overt: this.data.overt,
      }
    }).then((res) => {
      if (this.data.overt === true) {
        if (this.data.tag === 1) {
          app.globalData.essays1.unshift(newArticle);
        }
        if (this.data.tag === 2) {
          app.globalData.essays2.unshift(newArticle);
        }
        if (this.data.tag === 3) {
          app.globalData.essays3.unshift(newArticle);
        }
      }
      wx.hideLoading({
        success: (res) => {
          console.log("发表成功")
        },
      })
      wx.showToast({
        title: '发表成功',
      });
      wx.reLaunch({
        url: '/pages/note/note',
      });
    }).catch(res => {
      console.log(res);
    });
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let res = JSON.parse(decodeURIComponent(options.essay));
    let tag = JSON.parse(decodeURIComponent(options.tag));
    let overt = JSON.parse(decodeURIComponent(options.overt));
    this.setData({
        val: res,
        tag: tag,
        overt: overt
      }),
      res = app.towxml(res, 'markdown');
    this.setData({
      article: res
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})