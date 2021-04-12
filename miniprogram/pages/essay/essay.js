const app = getApp();
import timeformat from '../../utils/timeformat';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    essay: null,
    article: null,
    newCommentTxt: null //用户提交的评论
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let res = JSON.parse(decodeURIComponent(options.essay))
    this.setData({
      "essay": res
    });
    let s = app.towxml(this.data.essay.content, 'markdown');
    this.setData({
      "article": s
    })
  },

  publishComment() {
    if (this.data.newCommentTxt === null) {
      wx.showToast({
        title: '请先输入内容',
        icon: 'none'
      })
      return;
    }
    let timestamp = new Date().getTime();
    timestamp = timeformat(timestamp)
    let newtemp = {
      nickName: app.globalData.nickName,
      avatarUrl: app.globalData.avatarUrl,
      txt: this.data.newCommentTxt,
      timestamp: timestamp
    }
    const db = wx.cloud.database();
    const _ = db.command
    db.collection('articles').doc(this.data.essay._id).update({
      data: {
        comment: _.unshift(newtemp)
      },
      success: console.log,
      fail: console.error
    });
    let temp = this.data.essay;
    temp.comment.unshift(newtemp);
    this.setData({
      essay: temp,
      newCommentTxt: ""
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