// pages/list/list.js
const datas = require("../../datas/list-data")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr:datas.list_data
  },
  todetail (event) {
    // 获取到点击的下标 通过在遍历的时候增加 data-index ="{{index}}"
    const index = event.currentTarget.dataset.index
    console.log(index)
    wx.navigateTo({
        //注意加/
        url: "/pages/detail/detail?index=" + index
    })
  },
  toContent (event) {
    console.log(event)
      const index = event.target.dataset.index
      console.log(index)
      wx.navigateTo({
          //注意加/
          // index  -- 是由上面的 data-index传过来的
          url: "/pages/detail/detail?index=" + index
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //datas直接从实例对象的data中找数据
  console.log(this.data.listArr)
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