// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {
      id: 2,
      image: 'cloud://cloud-demo-2qtck.636c-cloud-demo-2qtck-1302904475/products/product2.jpg',
      name: 'Guitar',
      price: 480.50,
      source: 'SWEDEN'
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: 'Loading...',
    })

    wx.cloud.callFunction({
      name: 'productDetail',
      data: {
        id: options.id
      },
    }).then(result => {

      wx.hideLoading()
      const data = result.result

      if (data) {
        this.setData({
          product: data
        })
      } else {
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }


    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      setTimeout(() => {
        wx.navigateBack()
      }, 2000)
    })
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