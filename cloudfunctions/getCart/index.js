// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID

  //cart list
  const cartRes = await db.collection('cart').where({
    user,
  }).get() //以user为凭证获取数据库中商品信息
  
  const cartList = cartRes.data

  return cartList
}