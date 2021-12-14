// pages/about/about.js
const app = getApp();
const db = wx.cloud.database();
const _ = db.command
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
    let badge = this.data.vipBadges[app.globalData.vipLevel]
    let color = this.data.vipColors[app.globalData.vipLevel]
    this.setData({
      score: app.globalData.score,
      vipLevel: app.globalData.vipLevel,
      vipBadge: badge,
      vipColor: color,
    })

  },
})
