const app = getApp();
Page({
  data: {
    content: "",
    select1: true,
    select2: false,
    select3: false,
    overt: true
  },
  onSelect1() {
    this.setData({
      select1: true,
      select2: false,
      select3: false,
    })
  },
  onSelect2() {
    this.setData({
      select1: false,
      select2: true,
      select3: false,
    })
  },
  onSelect3() {
    this.setData({
      select1: false,
      select2: false,
      select3: true,
    })
  },
  onSelect4() {
    this.setData({
      overt: !this.data.overt
    })
  },

  toDetail() {
    if (app.globalData.isLogin !== true) {
      wx.getUserProfile({
        desc: "获取头像及昵称,展示个人笔记",
        success: (res) => {
          wx.setStorage({
            key: "nickName",
            data: res.userInfo.nickName,
            a
          });
          wx.setStorage({
            key: "avatarUrl",
            data: res.userInfo.avatarUrl,
          });
          wx.setStorage({
            key: "isLogin",
            data: true,
          });
          app.globalData.isLogin = true;
          app.globalData.avatarUrl = res.userInfo.avatarUrl;
          app.globalData.nickName = res.userInfo.nickName;
          let tag
          if (this.data.select1) {
            tag = 0
          } else if (this.data.select2) {
            tag = 1
          } else {
            tag = 2
          }
          let c = JSON.stringify(this.data.content)
          let t = JSON.stringify(tag)
          let p = JSON.stringify(this.data.overt)
          wx.navigateTo({
            url: '/pages/details/details?essay=' + encodeURIComponent(c) + '&tag=' + encodeURIComponent(t) + '&overt=' + encodeURIComponent(p),
          });
        },
        fail: (res) => {
          console.log(res);
          wx.showToast({
            title: '授权失败',
            icon: 'error'
          })
        }
      })
    } else {
      let tag
      if (this.data.select1) {
        tag = 0
      } else if (this.data.select2) {
        tag = 1
      } else {
        tag = 2
      }
      let c = JSON.stringify(this.data.content)
      let t = JSON.stringify(tag)
      let p = JSON.stringify(this.data.overt)
      wx.navigateTo({
        url: '/pages/details/details?essay=' + encodeURIComponent(c) + '&tag=' + encodeURIComponent(t) + '&overt=' + encodeURIComponent(p),
      });
    }
  },

  onLoad(options) {},


})