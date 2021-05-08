App({
  towxml: require('/towxml/index'),
  onLaunch: function () {
    this.globalData = {
      _openId: "",
      isLogin: false,
      loading: true,
      likes: [],
      essays1: [],
      essays2: [],
      essays3: [],
      essays0: [],
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
        }).catch(err => {
          db.collection('users').add({
            data: {
              _id: this.globalData._openId,
              likes: []
            }
          })
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