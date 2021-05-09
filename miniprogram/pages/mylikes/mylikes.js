const app = getApp();
const db = wx.cloud.database();
const _ = db.command
Page({
  data: {
    mylikes: [],
    haveloadall: false,
  },

  clickCard(e) {
    let num = JSON.stringify(e.currentTarget.dataset.num);
    let tag = JSON.stringify(e.currentTarget.dataset.pagenum);
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
    db.collection('articles').where({
      _id: _.in(app.globalData.likes)
    }).limit(this.data.mylikes.length).get().then(res => {
      if (res.data.length === 0) {
        this.setData({
          haveloadall: true
        })
        return;
      }
      app.globalData.essays4 = app.globalData.essays4.concat(res.data)
      this.setData({
        mylikes: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('articles').where({
      _id: _.in(app.globalData.likes)
    }).limit(6).get().then(res => {
      this.setData({
        mylikes: res.data
      })
      app.globalData.essays4 = res.data
    })
  }
})