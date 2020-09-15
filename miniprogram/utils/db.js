const db = wx.cloud.database({
  env: "cloud-demo-2qtck"
})

const util = require("./util")

module.exports = {
  getProductList() { //调用数据库的函数
    return db.collection("product").get()
  },

  async getProductDetail(id) {//获取商品详情信息
    return await wx.cloud.callFunction({
      name: "productDetail",
      data:{
        id: id
      }
    })
  },

  addToOrder(data) { //加入判断是否授权
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: "addToOrder",
          data,
        })
      })
      .catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please login first'
        })
        return {}
      })
    
  },

  getOrders() {
    return util.isAuthenticated() //检查用户时候授权
      .then(() => {
        return wx.cloud.callFunction({ //调用getOrders云函数
          name: 'getOrders',
        })
      })
      .catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {}
      })
  },

  addToCart(data) {
    return util.isAuthenticated() //检查用户时候授权
    .then(() => {
      return wx.cloud.callFunction({ //调用addToCart云函数
        name: 'addToCart',
        data,
      })
    }).catch(() => {
      wx.showToast({
        icon: 'none',
        title: 'Please Login First'
      })
      return {}
    })
  },

  getCart() {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'getCart',
      })
      }).catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {}
      })
  },

  updateCart(list) {
    return util.isAuthenticated()
    .then(() => {
      return wx.cloud.callFunction({
        name: 'updateCart',
        data: {
          list,
        },
      })
    }).catch(() => {
      wx.showToast({
        icon: 'none',
        title: 'Please Login First'
      })
      return {}
    })
  },

  addReview(data) {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
            name: 'addReview',
            data,
          })
      }).catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {}
      })
  },

  getReviews(productId) {
    return db.collection('review').where({
      productId,
    }).get()
  },

  uploadImage(imgPath) {
    return wx.cloud.uploadFile({
      cloudPath: `review/${util.getId()}`, //云文件存储地址：review/随机id
      filePath: imgPath,
    })
  },
  
}