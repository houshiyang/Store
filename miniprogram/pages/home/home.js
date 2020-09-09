// pages/home/home.js
const db = require('../../utils/db') //引用封装的云开发功能

const util = require("../../utils/util") //引用封装的保留两位小数功能

Page({
  data: {
    productList: [],
  },

  onLoad: function (options) {
    this.getProductList()
  },

  getProductList() { //调用云数据库中的数据
    wx.showLoading({
      title: 'Loading...'
    })

    db.getProductList().then(result => { //??
      wx.hideLoading()

      const productList = result.data
      productList.forEach(product => product.price = util.formatPrice(product.price)) //???
      
      if (productList.length) {
        this.setData({
          productList
        })
      }
    }).catch(err => { //???
      console.error(err)
      wx.hideLoading()
    })
  },
})