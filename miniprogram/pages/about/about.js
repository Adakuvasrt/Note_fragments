// pages/about/about.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "/img/头像修改.png",
    nickName: " 点击登录",
    vipLevel: "未登录"
  },

  toLogin() {
    if (app.globalData.isLogin) return;
    wx.getUserProfile({
      desc: "获取头像昵称"

    }).then(res => {
      this.setData({
        nickName: res.userInfo.nickName,
        avatarUrl: res.userInfo.avatarUrl
      })
      app.globalData.nickName = res.userInfo.nickName;
      app.globalData.avatarUrl = res.userInfo.avatarUrl;
      app.globalData.isLogin = true;
      wx.showToast({
        title: '登陆成功',
        icon: 'success'
      })
      console.log(this.data.nickName + " 登陆成功");
    }).catch(res => {
      wx.showToast({
        title: '取消登陆',
        icon: 'error'
      })
      console.log("登陆失败");
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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