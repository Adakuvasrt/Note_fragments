const app = getApp();
const db = wx.cloud.database();
const _ = db.command
Page({
  data: {
    myessays: [],
    haveloadall: false,
  },

  clickCard(e) {
    let num = JSON.stringify(e.currentTarget.dataset.num);
    let tag = JSON.stringify(e.currentTarget.dataset.pagenum);
    console.log(tag);
    wx.navigateTo({
      url: '/pages/essay/essay?num=' + encodeURIComponent(num) + '&tag=' + encodeURIComponent(tag)
    })
  },
  scrolltolower() {
    console.log("触底了");
    if (this.data.haveloadall === true) {
      wx.hideLoading({
        success: (res) => {
          console.log("加载完成")
        },
      })
      return;
    }
    this.getAllArticles(6, this.data.myessays.length).then(res => {
      if (res.list.length === 0) {
        this.setData({
          haveloadall: true
        })
        return;
      }
      app.globalData.essays0 = app.globalData.essays0.concat(res.list)
      this.setData({
        myessays: app.globalData.essays0
      })
    })
  },
  getAllArticles(count, skipNum) {
    return db.collection('articles').aggregate().match({
      openId: app.globalData.openId
    }).skip(skipNum).limit(count).end()
    // console.log(count, skipNum);
    // return wx.cloud.callFunction({
    //   name: "getMyArticle",
    //   data: {
    //     count: count,
    //     skipNum: skipNum,
    //   },
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllArticles(6, 0).then(res => {
      for (let index = 0; index < res.list.length; index++) {
        res.list[index].article = app.towxml(res.list[index].content, 'markdown')
      }
      app.globalData.essays0 = res.list;
      this.setData({
        myessays: res.list
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
