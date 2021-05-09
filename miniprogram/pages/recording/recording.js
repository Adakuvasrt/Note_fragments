const app = getApp();
const db = wx.cloud.database();
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    essay: null,
    temp: {}
  },
  gogo() {
    let res = app.towxml('Loading...', 'markdown');
    let temp = {
      article: res
    }
    this.setData({
      essay: temp
    })
    db.collection('articles').aggregate().match({
      openId: _.eq(app.globalData._openId)
    }).sample({
      size: 1
    }).end().then(res => {
      this.setData({
        essay: res.list[0]
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('articles').aggregate().match({
      openId: _.eq(app.globalData._openId)
    }).sample({
      size: 1
    }).end().then(res => {
      this.setData({
        essay: res.list[0]
      })
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