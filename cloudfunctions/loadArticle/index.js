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
    content,
    tag,
    overt,
  } = event;
  var timestamp = new Date().getTime();
  var date = new Date(timestamp + 8 * 3600 * 1000);
  let timestampf = date.toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '/');
  db.collection('articles').add({
    data: {
      openId: openId,
      avatarUrl: avatarUrl,
      nickName: nickName,
      tag: tag,
      overt: overt,
      content: content,
      likenum: 0,
      comment: [],
      timestamp: timestampf,
    }
  });
  return 1;
};