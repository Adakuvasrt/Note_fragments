App({
  towxml: require('/towxml/index'),
  onLaunch: function () {
    this.globalData = {
      _openId: "",
      isLogin: false,
      loading: true,
      likes: [],
      score: 0,
      vipLevel:1,
      news: [],
      essays1: [], //分类1笔记
      essays2: [], //分类2笔记
      essays3: [], //分类3笔记
      essays0: [], //我的笔记
      essays4: [], //我的喜欢
      haveloadall1: false, //是否全部加载完成
      haveloadall2: false,
      haveloadall3: false,
    }
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'note-fragments-1g0a4wvo15edfd42',
        traceUser: true,
      })
      wx.cloud.callFunction({
        name: 'login'
      }).then(res => {
        const db = wx.cloud.database();
        const _ = db.command;
        this.globalData._openId = res.result.openid
        db.collection('users').doc(this.globalData._openId).get().then(res => {
          this.globalData.likes = res.data.likes
          this.globalData.score = res.data.score
          this.globalData.news = res.data.news
          this.globalData.vipLevel = res.data.vipLevel

        }).catch(err => {
          db.collection('users').add({
            data: {
              _id: this.globalData._openId,
              likes: [],
              score:100,
              news: [],
              vipLevel:1
            }
          })
          this.globalData.likes = []
          this.globalData.score = 100
          this.globalData.news = []
          this.globalData.vipLevel = 1
        })
      })
      var isLogin = wx.getStorageSync('isLogin');
      var avatarUrl = wx.getStorageSync('avatarUrl');
      var nickName = wx.getStorageSync('nickName');
      if (isLogin === true) {
        this.globalData.isLogin = true;
        this.globalData.avatarUrl = avatarUrl;
        this.globalData.nickName = nickName;
      }
    }


  },
})