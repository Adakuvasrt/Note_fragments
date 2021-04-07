import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"
const app = getApp();
Page({

  data: {
    essays: null,
    articles: null,
    scrollTop: undefined,
    activekey: "0",
    currentIndex: "0",
    bulletin: "欢迎来到笔记碎片", //公告栏
    triggered: true, //自定义scrol-lview下拉刷新
    inputShowed: false, //searchbar
    inputVal: "" //searchbar
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
    let c = JSON.stringify(this.data.essays[e.currentTarget.dataset.num])
    wx.navigateTo({
      url: '/pages/essay/essay?essay=' + encodeURIComponent(c),
    })
  },

  refresh() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: "getArticle",
      data: {
        count: 9,
        skipNum: 0
      },
    }).then(res => {
      this.setData({
        "essays": res.result.data,
      });
      let arr = this.data.essays;
      let s;
      let temp = [];
      arr.forEach((item, index) => {
        s = app.towxml(item.content, 'markdown', {
          events: { // 为元素绑定的事件方法
            tap: (e) => {
              // console.log(e);
              // this.clickCard(e);
            }
          }
        });
        temp.push(s)
        this.setData({
          articles: temp
        })
      })
      this.setData({
        triggered: false
      })
      wx.hideLoading({
        success: (res) => {
          console.log("加载成功")
        },
      })

    }).catch(res => {
      console.log(res);
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
    wx.cloud.callFunction({
      name: "getArticle",
      data: {
        count: 6,
        skipNum: 0
      },
    }).then(res => {
      this.setData({
        "essays": res.result.data,
      });
      let arr = this.data.essays;
      let s;
      let temp = [];
      arr.forEach((item, index) => {
        s = app.towxml(item.content, 'markdown', {
          events: { // 为元素绑定的事件方法
            tap: (e) => {
              // console.log(e);
              // this.clickCard(e);
            }
          }
        });
        temp.push(s)
        this.setData({
          articles: temp
        })
      })

    }).catch(res => {
      console.log(res);
    })

    this.setData({
      search: this.search.bind(this)
    })

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
    // let s
    // if (this.data.articles !== null) {
    //   let item = this.data.essays[0]
    //   s = app.towxml(item.content, 'markdown', {
    //     events: { // 为元素绑定的事件方法
    //       tap: (e) => {
    //         // console.log(e);
    //         // this.clickCard(e);
    //       }
    //     }
    //   });
    //   let temp = [s]
    //   this.setData({
    //     articles: temp
    //   })
    // }
    //   if (this.data.articles !== null) {
    //   let arr = this.data.essays;
    //   let s;
    //   let temp = [];
    //   arr.forEach((item, index) => {
    //     s = app.towxml(item.content, 'markdown', {
    //       events: { // 为元素绑定的事件方法
    //         tap: (e) => {
    //           // console.log(e);
    //           // this.clickCard(e);
    //         }
    //       }

    //     });
    //     temp.push(s)
    //     this.setData({
    //       articles: temp
    //     })
    //   })
    // }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})