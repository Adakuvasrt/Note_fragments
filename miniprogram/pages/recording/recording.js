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
    let res = app.towxml('# Loading...', 'markdown');
    let temp = {
      article: res
    }
    this.setData({
      essay: temp
    })
    db.collection('articles').aggregate().match({
      openId: _.or(_.eq(app.globalData.openId), _.in(app.globalData.likes))
    }).sample({
      size: 1
    }).end().then(res => {
      for (let index = 0; index < res.list.length; index++) {
        res.list[index].article = app.towxml(res.list[index].content, 'markdown')
      }
      this.setData({
        essay: res.list[0]
      })
    }).catch(res => {
      console.log(res);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let res = app.towxml('# Loading...', 'markdown');
    let temp = {
      article: res
    }
    this.setData({
      essay: temp
    })
    db.collection('articles').aggregate().match({
      openId: _.or(_.eq(app.globalData.openId), _.in(app.globalData.likes))
    }).sample({
      size: 1
    }).end().then(res => {
      for (let index = 0; index < res.list.length; index++) {
        res.list[index].article = app.towxml(res.list[index].content, 'markdown')
      }
      this.setData({
        essay: res.list[0]
      })
    }).finally(res => {
      this.setData({
        essay: app.towxml('## 获取失败', 'markdown'),
      })
    })
  },



})
