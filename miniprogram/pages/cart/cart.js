// pages/cart/cart.js
const util = require("../../utils/util")
const db = require("../../utils/db")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    cartList: [],
    isSelectAllChecked: false,
    isCartEdit: false,
    cartCheckMap: {},
    cartTotal: '0.00',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      }),

      this.getCart()

    }).catch(err => {
      console.log("Not authenticated yet");
    })
  },

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })

    this.getCart()
  },

  getCart() {
    wx.showLoading({
      title: 'Loading...',
    })

    //const cartCheckMap = this.data.cartCheckMap
    db.getCart().then(result => {
      wx.hideLoading()
      
      const data = result.result
      
      if (data.length) {
        // update the total price for cart
        
        let checkout = 0;
        data.forEach(product => {
          checkout+= product.price * product.count
        })

        this.setData({
          cartTotal: util.formatPrice(checkout),
          cartList: data
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
      
      wx.showToast({
        icon: 'none',
        title: 'Failed'
      })
    })
  },
})