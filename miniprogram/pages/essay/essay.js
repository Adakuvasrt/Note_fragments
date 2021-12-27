const app = getApp();
import timeformat from "../../utils/timeformat";
const db = wx.cloud.database();
const _ = db.command;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tag: null,
    num: null,
    essay: null,
    newCommentTxt: "", //用户提交的评论
    isLike: false,
    isShow: true, //互动图标是否显示,查看自己喜欢和笔记时不显示
  },

  like() {
    if (this.data.isLike == true) return;
    this.setData({
      isLike: true,
    });
    wx.lin.showMessage({
      type: "success",
      icon: "success",
      content: "❤",
    });
    db.collection("articles")
      .doc(this.data.essay._id)
      .update({
        data: {
          likenum: _.inc(1),
        },
      });
    if(this.data.tag==="1"){
      app.globalData.essays1[num].like+=1
    }
    if(this.data.tag==="2"){
      app.globalData.essays2[num].like+=1
    }
  },
  getinput(e) {
    this.setData({
      newCommentTxt: e.detail.value,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let num = JSON.parse(decodeURIComponent(options.num));
    let tag = JSON.parse(decodeURIComponent(options.tag));
    if (tag === "1") {
      this.setData({
        essay: app.globalData.essays1[num],
        num: num,
        tag: tag,
      });
    }
    if (tag === "2") {
      this.setData({
        essay: app.globalData.essays2[num],
        num: num,
        tag: tag,
      });
    }
    let likes = app.globalData.likes;
    let res = likes.includes(this.data.essay._id);
    this.setData({
      isLike: res,
    });
  },

  publishComment() {
    if (this.data.newCommentTxt === null || this.data.newCommentTxt === "") {
      wx.showToast({
        title: "请先输入内容",
        icon: "none",
      });
      return;

    }
    let timestamp = new Date().getTime();
    timestamp = timeformat(timestamp);
    let newtemp = {
      nickName: app.globalData.nickName,
      avatarUrl: app.globalData.avatarUrl,
      txt: this.data.newCommentTxt,
      timestamp: timestamp,
    };
    console.log(newtemp);

    db.collection("articles").where({
      _id: this.data.essay._id
    }).update({
      data: {
        comment: _.unshift(newtemp)
      }
    }).then(res => {
      console.log(res);
    }).catch(res => {
      console.log(res);
    })
    let temp = this.data.essay;
    temp.comment.unshift(newtemp);
    if(this.data.tag==="1"){app.globalData.essays1[this.data.num] = temp;}
    else if(this.data.tag==="2"){app.globalData.essays2[this.data.num] = temp;}

    this.setData({
      essay: temp,
      newCommentTxt: "",
    });

    // if (this.data.tag === "0") {
    //   app.globalData.essays0[this.data.num].comment.unshift(newtemp);
    //   this.setData({
    //     essay: app.globalData.essays0[this.data.num],
    //     newCommentTxt: "",
    //   });
    // }
    // app.globalData.score = app.globalData.score + 4;
    // db.collection("users")
    //   .doc(app.globalData.openId)
    //   .update({
    //     data: {
    //       score: app.globalData.score,
    //     },
    //   });
  },
});
