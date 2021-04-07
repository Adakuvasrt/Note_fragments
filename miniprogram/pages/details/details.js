const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: "",
    val: ""
  },

  returnBack() {
    wx.navigateBack({
      delta: 0,
    })
  },
  publish() {
    wx.showToast({
      title: '发表成功',
    });
    wx.cloud.callFunction({
      name: "loadArticle",
      data: {
        avatarUrl: app.globalData.avatarUrl,
        nickName: app.globalData.nickName,
        content: this.data.val
      }
    }).then((res) => {
      console.log(res);
    }).catch(res => {
      console.log(res);
    });

    wx.reLaunch({
      url: '/pages/note/note',
    });
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let res = JSON.parse(decodeURIComponent(options.essay));
    this.setData({
        val: res
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