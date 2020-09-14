// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() //获取云数据库

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID //获取用户OPENID

  //Order list
  const orderRes = await db.collection('order').where({
    user,
  }).get() //从数据库中获取订单信息
  const orderList = orderRes.data 

  return orderList
}