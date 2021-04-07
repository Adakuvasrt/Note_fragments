// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {
    count,
    skipNum
  } = event;
  let res = db.collection('articles').limit(count).skip(skipNum).get()
  return res;
}