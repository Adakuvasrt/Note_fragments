// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openId = wxContext.OPENID;
  const {
    avatarUrl,
    nickName,
    content
  } = event;
  var timestamp = new Date().getTime();
  db.collection('articles').add({
    data: {
      openId: openId,
      avatarUrl: avatarUrl,
      nickName: nickName,
      content: content,
      likenum: 0,
      comment: 0,
      timestamp: timestamp,
    }
  });
  console.log("1");
};