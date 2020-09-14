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
        this.setData({
          cartTotal: util.formatPrice(0),
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

  onTapCheck(event) {
    const checkId = event.currentTarget.dataset.id
    const cartCheckMap = this.data.cartCheckMap
    let isSelectAllChecked = this.data.isSelectAllChecked
    const cartList = this.data.cartList
    let cartTotal = 0

    if (checkId === 'selectAll') {
      isSelectAllChecked = !isSelectAllChecked //布尔值反转
      cartList.forEach(product => {
        cartCheckMap[product.productId] = isSelectAllChecked
      })
    } else {
      cartCheckMap[checkId] = !cartCheckMap[checkId]
      isSelectAllChecked = true
      cartList.forEach(product => {
        if (!cartCheckMap[product.productId]) {
          // not all product selected
          isSelectAllChecked = false
        }
      })
    }
    cartTotal = this.updateTotalPrice(cartList, cartCheckMap)

    this.setData({
      cartTotal,
      isSelectAllChecked,
      cartCheckMap
    })

  },

  updateTotalPrice(cartList, cartCheckMap) {
    let checkout = 0
    cartList.forEach(product => {
      if (cartCheckMap[product.productId]) checkout += product.price * product.count
    })

    return util.formatPrice(checkout)
  },
})