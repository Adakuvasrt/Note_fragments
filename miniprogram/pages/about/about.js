// pages/about/about.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipLevel: 1,
    vipBadge: "LV 0",
    vipBadges: ["Error", "LV 1", "LV 2", "LV 3", "LV 4", "LV 5"],
    vipColors: ["#d9ecf2", "#41aea9", "#0278ae", "#3d84b8", "#344fa1", "#3f3697"],
    vipColor: "",
    score: 0
  },

  toMynote() {
    wx.navigateTo({
      url: '/pages/mynote/mynote',
    })
  },
  toLikes() {
    wx.navigateTo({
      url: '/pages/mylikes/mylikes',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let badge = this.data.vipBadges[app.globalData.vipLevel]
    let color = this.data.vipColors[app.globalData.vipLevel]
    this.setData({
      score: app.globalData.score,
      vipLevel: app.globalData.vipLevel,
      vipBadge: badge,
      vipColor: color,
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
    this.setData({
      score: app.globalData.score,
      vipLevel: app.globalData.vipLevel
    })
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
  // onPullDownRefresh: function () {

  // },

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