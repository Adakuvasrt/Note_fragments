const app = getApp();
import timeformat from '../../utils/timeformat';
const db = wx.cloud.database();
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag: null,
    num: null,
    essay: {},
    newCommentTxt: null, //用户提交的评论
    isLike: false,
    isShow: true //互动图标是否显示,查看自己喜欢和笔记时不显示
  },

  like() {
    if (this.data.isLike == true) return;
    this.setData({
      isLike: true
    })
    wx.lin.showMessage({
      type: 'success',
      icon: 'success',
      content: '操作成功'
    })
    db.collection('articles').doc(this.data.essay._id).update({
      data: {
        likenum: _.inc(1)
      }
    })
    db.collection('users').doc(app.globalData._openId).update({
      data: {
        likes: _.addToSet(this.data.essay._id)
      }
    })
    if (this.data.tag === "1") {
      app.globalData.essays1[this.data.num].likenum++;
    }
    if (this.data.tag === "2") {
      app.globalData.essays2[this.data.num].likenum++;
    }
    if (this.data.tag === "3") {
      app.globalData.essays3[this.data.num].likenum++;
    }
    if (this.data.tag === "0") {
      app.globalData.essays0[this.data.num].likenum++;
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let num = JSON.parse(decodeURIComponent(options.num));
    let tag = JSON.parse(decodeURIComponent(options.tag));
    if (tag === "1") {
      this.setData({
        essay: app.globalData.essays1[num],
        num: num,
        tag: tag,
      })
    }
    if (tag === "2") {
      this.setData({
        essay: app.globalData.essays2[num],
        num: num,
        tag: tag,
      })
    }
    if (tag === "3") {
      this.setData({
        essay: app.globalData.essays3[num],
        num: num,
        tag: tag,
      })
    }
    if (tag === "0") {
      this.setData({
        essay: app.globalData.essays0[num],
        num: num,
        tag: tag,
        isShow: false
      })
    }
    let likes = app.globalData.likes;
    let res = likes.includes(this.data.essay._id);
    this.setData({
      isLike: res
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

    db.collection('articles').doc(this.data.essay._id).update({
      data: {
        comment: _.unshift(newtemp)
      },
      success: console.log,
      fail: console.error
    });
    if (this.data.tag === "1") {
      let temp = this.data.essay
      temp.comment.unshift(newtemp);
      app.globalData.essays1[this.data.num] = temp
      this.setData({
        essay: temp,
        newCommentTxt: ""
      })
    }
    if (this.data.tag === "2") {
      let temp = app.globalData.essays2[this.data.num]
      temp.comment.unshift(newtemp);
      this.setData({
        essay: app.globalData.essays2[this.data.num],
        newCommentTxt: ""
      })
    }
    if (this.data.tag === "3") {
      let temp = app.globalData.essays3[this.data.num]
      temp.comment.unshift(newtemp)
      this.setData({
        essay: app.globalData.essays3[this.data.num],
        newCommentTxt: ""
      })
    }
    if (this.data.tag === "0") {
      app.globalData.essays0[this.data.num].comment.unshift(newtemp)
      this.setData({
        essay: app.globalData.essays0[this.data.num],
        newCommentTxt: ""
      })
    }

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