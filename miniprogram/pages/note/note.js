const app = getApp();
const db = wx.cloud.database();
const _ = db.command
Page({
  data: {
    content: "",

    overt: true,
    radioItems: [{
        name: ' 公开',
        value: 1,
        checked: true
      },
      {
        name: ' 私密',
        value: 2
      }
    ],
  },

  radioChange: function (e) {
    var radioItems = this.data.radioItems;
    if (e.detail.value == 1) {
      radioItems[0].checked = true
      radioItems[1].checked = false
    } else {
      radioItems[0].checked = false
      radioItems[1].checked = true
    }
    this.setData({
      radioItems: radioItems,
      overt: e.detail.value == 1
    });
  },

  bindinput(e) {
    this.setData({
      content: e.detail.value
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
            tag = 1
          } else if (this.data.select2) {
            tag = 2
          } else {
            tag = 3
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
      let tag = 1
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
