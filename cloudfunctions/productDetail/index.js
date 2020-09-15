// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() //定义一个可调用数据库数据的变量

// 云函数入口函数
exports.main = async (event, context) => {
  const id = event.id

  //调用云数据库中数据
  const productRes = await db.collection("product").doc(id).get() //异步请求，请求数据库中的内容
  const product = productRes.data

  // get the total count of reviews for current product
  const reviewCountRes = await db.collection('review').where({
    productId: id,
  }).count()
  product.reviewCount = reviewCountRes.total

  // get the first review of current product
  const firstReviewRes = await db.collection('review').where({
    productId: id,
  }).limit(1).get() //limit1用来获取第一个评论对象
  product.firstReview = firstReviewRes.data[0]

  return product
}