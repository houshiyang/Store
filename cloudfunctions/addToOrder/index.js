// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database() //调用云数据库


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID
  const productList = event.list || []
  const isCheckout = !!event.isCheckout //!!：将后面的表达式强制转换为布尔类型的数据

  await db.collection("order").add({ //将商品信息加入云数据库order的订单中
    data: {
      user, //订单变量一：用户信息
      createTime: +new Date(), //订单变量二：创建时间
      productList //商品列表
    },
  })

  if (isCheckout) {
    // if it's checked out from cart
    await db.collection('cart').where({
      productId: db.command.in(productList.map(product => product.productId)) //db.command：查询数据
    }).remove()
  }

  return {}
  
}