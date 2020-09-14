// pages/order/order.js
const util = require("../../utils/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    orderList: [{
      id: 0,
      productList: [{
        count: 1,
        image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product1.jpg',
        name: 'Product 1',
        price: "50.50",
      }]
    },
    {
      id: 1,
      productList: [{
          count: 1,
          image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product2.jpg',
          name: 'Product 2',
          price:  "40.10",
        },
        {
          count: 1,
          image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product3.jpg',
          name: 'Product 3',
          price: "30.50",
        }
      ]
    },
    {
      id: 2,
      productList: [{
        count: 2,
        image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product4.jpg',
        name: 'Product 4',
        price: "70.40",
      }]
    }]
  },

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
    }).catch(err => {
      console.log("Not Authenticated yet")
    })
    this.data.orderList.forEach(order => {
      order.productList.forEach(product => product.price = util.formatPrice(product.price))
    })
    this.setData({
      orderList: this.data.orderList
  })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})