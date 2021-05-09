const app = getApp();
const db = wx.cloud.database();
const _ = db.command
Page({
  data: {
    loading: true,
    essays1: [],
    essays2: [],
    essays3: [],
    haveloadall1: false, //是否全部加载完成
    haveloadall2: false,
    haveloadall3: false,
    scrollTop: undefined,
    activekey: "0",
    currentIndex: "0",
    bulletin: "欢迎来到笔记碎片", //公告栏
    triggered: true, //自定义scrol-lview下拉刷新
    inputShowed: false, //searchbar
    inputVal: "", //searchbar
    tag1: 1,
    tag2: 2,
    tag3: 3,

  },
  changeTabs(activeKey) {
    this.setData({
      "currentIndex": activeKey.detail.activeKey
    })
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
    wx.navigateTo({
      url: '/pages/essay/essay?num=' + encodeURIComponent(num) + '&tag=' + encodeURIComponent(tag)
    })
  },
  //自定义下拉刷新事件
  refresh1() {
    console.log("下拉刷新1");
    wx.showLoading({
      title: '加载中',
    });
    this.getAllArticles(9, 0, 1, true).then(res => {
      app.globalData.essays1 = res.list;
      this.setData({
        essays1: res.list,
      });
      wx.hideLoading({
        success: (res) => {
          console.log("加载成功");
        },
      })
      this.setData({
        triggered: false
      })
    });
  },
  refresh2() {
    wx.showLoading({
      title: '加载中',
    });
    this.getAllArticles(9, 0, 2, true).then(res => {
      app.globalData.essays2 = res.list;
      this.setData({
        essays2: res.list,
      });
      wx.hideLoading({
        success: (res) => {
          console.log("加载成功");
        },
      })
    });
  },
  refresh3() {
    wx.showLoading({
      title: '加载中',
    });
    this.getAllArticles(9, 0, 3, true).then(res => {
      app.globalData.essays3 = res.list;
      this.setData({
        essays3: res.list,
      });
      wx.hideLoading({
        success: (res) => {
          console.log("加载成功");
        },
      })
    });
  },
  /*
   *自定义下拉触底事件
   */
  scrolltolower1() {
    console.log("触底了");
    if (this.data.haveloadall1 === true) {
      console.log("已经加载全部");
      return;
    }
    this.getAllArticles(9, this.data.essays1.length, 1, true).then(res => {
      if (res.list.length === 0) {
        this.setData({
          haveloadall1: true,
        })
        console.log("已经全部加载完成了");
        return;
      }
      app.globalData.essays1 = app.globalData.essays1.concat(res.list);
      this.setData({
        essays1: app.globalData.essays1,
      })
    });
  },
  // scrolltolower2() {
  //   console.log("触底了");
  //   if (this.data.haveloadall2 === true) {
  //     console.log("已经加载全部");
  //     return;
  //   }
  //   this.getAllArticles(9, this.data.essays2.length, 2, true).then(res => {
  //     if (res.list.length === 0) {
  //       this.setData({
  //         haveloadall2: true,
  //       })
  //       console.log("已经全部加载完成了");
  //       return;
  //     }
  //     app.globalData.essays2 = app.globalData.essays2.concat(res.list);
  //     this.setData({
  //       essays2: app.globalData.essays2,
  //     })
  //   });
  // },
  // scrolltolower3() {
  //   console.log("触底了");
  //   if (this.data.haveloadall3 === true) {
  //     console.log("已经加载全部");
  //     return;
  //   }
  //   this.getAllArticles(9, this.data.essays3.length, 3, true).then(res => {
  //     if (res.list.length === 0) {
  //       this.setData({
  //         haveloadall3: true,
  //       })
  //       console.log("已经全部加载完成了");
  //       return;
  //     }
  //     app.globalData.essays3 = app.globalData.essays3.concat(res.list);
  //     this.setData({
  //       essays3: app.globalData.essays3,
  //     })
  //   });
  // },

  //获取文章函数
  getAllArticles(count, skipNum, tag, overt) {
    // return db.collection('articles').where({
    //   overt: overt,
    //   tag: tag,
    // }).orderBy('top', 'desc').orderBy('timestamp', 'desc').skip(skipNum).limit(count).get()
    return db.collection('articles').aggregate().match({
      overt: overt,
      tag: tag
    }).sort({
      top: -1,
      timestamp: -1
    }).limit(count).skip(skipNum).end()
  },

  search: function (value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{
          text: '搜索结果1',
          value: 1
        }, {
          text: '搜索结果2',
          value: 2
        }])
      }, 200)
    })
  },
  selectResult: function (e) {
    console.log('select result', e.detail)
  },
  getNavigationBarHeight() {
    const capsuleBarHeight = deviceUtil.getNavigationBarHeight()
    console.log(`CapsuleBar 的高度为${capsuleBarHeight}rpx`)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    this.getAllArticles(6, 0, 1, true).then(res => {
      app.globalData.essays1 = res.list;
      this.setData({
        essays1: res.list,
        loading: false,
      })
      wx.hideNavigationBarLoading({
        success: (res) => {},
      })
    }).catch(res => {
      console.log(res);
      this.setData({
        loading: false
      })
    });
    // this.getAllArticles(6, 0, 2, true).then(res => {
    //   app.globalData.essays2 = res.list;
    //   this.setData({
    //     essays2: res.list,
    //     loading: false,
    //   })
    // });
    // this.getAllArticles(6, 0, 3, true).then(res => {
    //   app.globalData.essays3 = res.list;
    //   this.setData({
    //     essays3: res.list,
    //     loading: false,
    //   })
    // });
  }
})