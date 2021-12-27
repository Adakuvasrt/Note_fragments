const app = getApp();
const db = wx.cloud.database();
const _ = db.command
Page({
  data: {
    loading: true,
    haveloadall1: false,
    haveloadall2: false,
    essays1: [], //个人笔记
    essays2: [], //笔记广场笔记
    activekey: "0",
    currentIndex: "0",
    triggered: true, //自定义scrol-lview下拉刷新
    tag1: 1,
    tag2: 2,
    isloading: false
  },
  changeTabs(activeKey) {
    this.setData({
      "currentIndex": activeKey.detail.activeKey
    });


  },
  scollTab(e) {
    let current = e.detail.current;
    this.setData({
      "activekey": current
    });
  },

  clickCard(e) {
    let num = JSON.stringify(e.currentTarget.dataset.num);
    let tag = JSON.stringify(e.currentTarget.dataset.pagenum);
    console.log("tag:"+tag+", num: "+num);
    wx.navigateTo({
      url: '/pages/essay/essay?num=' + encodeURIComponent(num) + '&tag=' + encodeURIComponent(tag)
    })
  },
  //自定义下拉刷新事件
  refresh1() {
    db.collection('articles').aggregate().match({
        openId: app.globalData.openId,
      }).sort({
        timestamp: -1
      }).limit(3).end()
      .then(res => {
        if (res.list.length === 0) {
          console.log("已经获取全部笔记,没有新笔记了");
          wx.showToast({
            title: '没有新笔记了, 等会再来吧',
          })
          return;
        } else {
          this.setData({
            essays1: []
          })
          for (let index = 0; index < res.list.length; index++) {
            res.list[index].article = app.towxml(res.list[index].content, 'markdown')

            this.setData({
              essays1: this.data.essays1.concat(res.list[index])
            })
          }
          app.globalData.essays1 = this.data.essays1;
          console.log("获取新笔记成功");
          wx.showToast({
            title: '刷新笔记列表成功',
          })
        }
      })
      .finally(res => {
        this.setData({
          triggered: false,
          haveloadall1: false
        })
      })
  },
  refresh2() {
    db.collection('articles').aggregate().match({
        openId: _.neq(app.globalData.openId),
        overt: true
      }).sort({
        timestamp: -1
      }).limit(2).end()
      .then(res => {
        this.setData({
          essays2: []
        })
        for (let index = 0; index < res.list.length; index++) {
          res.list[index].article = app.towxml(res.list[index].content, 'markdown')

          this.setData({
            essays2: this.data.essays2.concat(res.list[index])
          })
        }
        app.globalData.essays2 = this.data.essays2;
        console.log("获取新笔记成功");
        wx.showToast({
          title: '刷新笔记列表成功',
        })
      }).finally(res => {
        this.setData({
          triggered: false,
          haveloadall2: false
        })
      })
  },

  /*
   *自定义下拉触底事件
   */
  scrolltolower1() {
    console.log("触底了");
    if (this.data.isloading == true) return;
    this.setData({
      isloading: true
    })
    db.collection('articles').aggregate().match({
      openId: app.globalData.openId,
    }).sort({
      timestamp: -1
    }).skip(this.data.essays1.length).limit(2).end().then(res => {
      if (res.list.length === 0) {
        this.setData({
          haveloadall1: true
        })
        console.log("已经获取全部笔记,没有新笔记了");
        wx.showToast({
          title: '没有新笔记了, 等会再来吧',
        })
        this.setData({
          haveloadall1: true
        })
        return;
      } else {
        for (let index = 0; index < res.list.length; index++) {
          res.list[index].article = app.towxml(res.list[index].content, 'markdown')
          this.setData({
            essays1: this.data.essays1.concat(res.list[index])
          })
        }
        app.globalData.essays1 = this.data.essays1;
        console.log("获取新笔记成功");
      }
    }).finally(() => {
      this.setData({
        isloading: false
      })
    })
  },


  scrolltolower2() {
    console.log("触底了");
    if (this.data.isloading == true) return;
    this.setData({
      isloading: true
    })
    db.collection('articles').aggregate().match({
      openId: _.neq(app.globalData.openId),
      overt: true
    }).sort({
      top: -1,
      timestamp: -1
    }).skip(this.data.essays2.length).limit(2).end().then(res => {
      if (res.list.length === 0) {
        console.log("已经获取全部笔记,没有新笔记了");
        wx.showToast({
          title: '没有新笔记了, 等会再来吧',
        })
        this.setData({
          haveloadall2: true
        })
        return;
      } else {
        for (let index = 0; index < res.list.length; index++) {
          res.list[index].article = app.towxml(res.list[index].content, 'markdown')
          this.setData({
            essays2: this.data.essays2.concat(res.list[index])
          })
        }
        app.globalData.essays2 = this.data.essays2;
        console.log("获取新笔记成功");
      }

    }).finally(() => {
      this.setData({
        isloading: false
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onReady: function (options) {
    wx.showNavigationBarLoading();

    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      console.log(res);
      console.log("启动: 获取个人笔记");
      db.collection('articles').aggregate().match({
        openId: _.eq(res.result.openid),
      }).sort({
        timestamp: -1
      }).limit(3).end().then(res => {
        this.setData({
          loading: false
        })
        console.log("获取数据成功");
        if (res.list.length == 0) {
          wx.showToast({
            title: '未获取到数据',
          })
          x
        }
        this.setData({
          loading: false
        })
        for (let index = 0; index < res.list.length; index++) {
          res.list[index].article = app.towxml(res.list[index].content, 'markdown')
          this.setData({
            essays1: this.data.essays1.concat(res.list[index])
          })
        }
        app.globalData.essays1 = this.data.essays1
        console.log("获取笔记完成");
      })
    })
    wx.hideNavigationBarLoading();
    this.setData({
      loading: false
    })
    db.collection('articles').aggregate().match({
      openId: _.neq(app.globalData.openId),
      overt: true
    }).sort({
      timestamp: -1
    }).limit(3).end().then(res => {
      for (let index = 0; index < res.list.length; index++) {
        res.list[index].article = app.towxml(res.list[index].content, 'markdown')
        this.setData({
          essays2: this.data.essays2.concat(res.list[index])
        })
      }
      this.setData({
        loading: false
      })
      app.globalData.essays2 = this.data.essays2;
      console.log("获取笔记广场成功");
    })


  }
})
