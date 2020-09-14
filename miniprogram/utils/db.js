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
}