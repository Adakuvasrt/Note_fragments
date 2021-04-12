const app = getApp();
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
      app.globalData.essays1 = res.result.data;
      this.setData({
        essays1: res.result.data,
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
      app.globalData.essays2 = res.result.data;
      this.setData({
        essays2: res.result.data,
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
      app.globalData.essays3 = res.result.data;
      this.setData({
        essays3: res.result.data,
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
      if (res.result.data.length === 0) {
        this.setData({
          haveloadall1: true,
        })
        console.log("已经全部加载完成了");
        return;
      }
      app.globalData.essays1 = app.globalData.essays1.concat(res.result.data);
      this.setData({
        essays1: app.globalData.essays1,
      })
    });
  },
  scrolltolower2() {
    console.log("触底了");
    if (this.data.haveloadall2 === true) {
      console.log("已经加载全部");
      return;
    }
    this.getAllArticles(9, this.data.essays2.length, 2, true).then(res => {
      if (res.result.data.length === 0) {
        this.setData({
          haveloadall2: true,
        })
        console.log("已经全部加载完成了");
        return;
      }
      app.globalData.essays2 = app.globalData.essays2.concat(res.result.data);
      this.setData({
        essays2: app.globalData.essays2,
      })
    });
  },
  scrolltolower3() {
    console.log("触底了");
    if (this.data.haveloadall3 === true) {
      console.log("已经加载全部");
      return;
    }
    this.getAllArticles(9, this.data.essays3.length, 3, true).then(res => {
      if (res.result.data.length === 0) {
        this.setData({
          haveloadall3: true,
        })
        console.log("已经全部加载完成了");
        return;
      }
      app.globalData.essays3 = app.globalData.essays3.concat(res.result.data);
      this.setData({
        essays3: app.globalData.essays3,
      })
    });
  },

  //获取文章函数
  getAllArticles(count, skipNum, tag, overt) {
    return wx.cloud.callFunction({
      name: "getArticle",
      data: {
        count: count,
        skipNum: skipNum,
        tag: tag,
        overt: overt
      },
    })
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
    this.getAllArticles(9, 0, 1, true).then(res => {
      app.globalData.essays1 = res.result.data;
      this.setData({
        essays1: res.result.data,
        loading: false,
      })
      wx.hideNavigationBarLoading({
        success: (res) => {},
      })
    });
    this.getAllArticles(9, 0, 2, true).then(res => {
      app.globalData.essays2 = res.result.data;
      this.setData({
        essays2: res.result.data,
        loading: false,
      })
    });
    this.getAllArticles(9, 0, 3, true).then(res => {
      app.globalData.essays3 = res.result.data;
      this.setData({
        essays3: res.result.data,
        loading: false,
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideNavigationBarLoading();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      essays1: app.globalData.essays1,
      essays2: app.globalData.essays2,
      essays3: app.globalData.essays3,
    })
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

    // 用户触发了下拉刷新操作
    // wx.showNavigationBarLoading();
    // 拉取新数据重新渲染界面
    setTimeout(() => {
      wx.stopPullDownRefresh();
      // wx.hideNavigationBarLoading();
    }, 500)

    // wx.stopPullDownRefresh() // 可以停止当前页面的下拉刷新。

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上拉触底")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})