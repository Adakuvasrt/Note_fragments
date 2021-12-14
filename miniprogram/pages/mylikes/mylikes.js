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
    db.collection('articles').aggregate().match({
      _id: _.in(app.globalData.likes)
    }).skip(this.data.mylikes.length).limit(6).end().then(res => {
      if (res.list.length === 0) {
        this.setData({
          haveloadall: true
        })
        return;
      }
      app.globalData.essays4 = app.globalData.essays4.concat(res.list)
      this.setData({
        mylikes: res.list
      })
    }).catch(res => {
      console.log(res);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.likes);
    db.collection('articles').aggregate().match({
      _id: _.in(app.globalData.likes)
    }).limit(6).end().then(res => {
      for (let index = 0; index < res.list.length; index++) {
        res.list[index].article = app.towxml(res.list[index].content, 'markdown')
      }
      this.setData({
        mylikes: res.list
      })
      app.globalData.essays4 = res.list
    }).catch(res => {
      console.log(res);
    })
  }
})
