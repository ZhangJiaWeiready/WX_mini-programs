// pages/detail/detail.js
const datas = require("../../datas/list-data")
const app = getApp()
let {isPlay,playIndex} = app
console.log(app)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCollected: false,
    index: 0, // 定义下标
    detailList:{},  //
    switchMusicIcon: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取到跳转到那个板块的信息
    console.log(options)
    const {index} = options
    const detailList = datas.list_data[index]
      // 可以不用初始化也可以 直接更就增加到data中了
    this.setData({
        detailList, index
    })

    let obj = wx.getStorageSync('isCollected') //同步获取 这个值

    if(!obj){
      // 如果这个值不存在的话 说明没点击过，需要初始化这个对象
        obj = {}
        wx.setStorage({
            key: "isCollected",
            data: obj
        })

    } else{
      /*
      说明有obj了 所以需要更新初始的状态 ，点击进去的时候要读取状态
        但是可能有三个请况 -- undefined / false / true
       */
      //   if(!obj){
      //       isCollected= false
      //   } else{
      //       isCollected= true
      //   }
        let isCollected = obj[index]
        isCollected = isCollected ? true: false
        //设置改变刚开始进去的状态
        this.setData({isCollected})
    }

    // 监听音乐的播放与暂停
    wx.onBackgroundAudioPlay(() =>{
      this.setData({switchMusicIcon:true})
      console.log("音乐播放")
      isPlay = true
      playIndex = index
    })
    wx.onBackgroundAudioPause(() =>{
      console.log("音乐暂停")
      this.setData({switchMusicIcon:false})
      isPlay = false
    })

    if (isPlay && playIndex===index){
        this.setData({switchMusicIcon:true})
    }
    
  },
  // 切换点击收藏的方法
  handleCollect (){
      let isCollected = !this.data.isCollected
      this.setData({isCollected})
      let index = this.data.index
      wx.showToast({
      // wx.showModal({
          title: isCollected? '收藏成功' : '取消收藏'
      })
      //从本地缓存中获取 这个key 的值 -- 是一个对象
      /*
      getStorageSync 同步读取
      getStorage 异步读取 会有回调函数
       */
      let obj = wx.getStorageSync('isCollected')
      /*
      如果只是定义了obj的话 每个板块共用的都是这一个obj
      解决 ： 需要每次点击的时候都给他加个标识
        data:{0:isCollected}
        给这个obj设置值  值：{key：下标，value: 现在点击的值
       */
      obj[index] = isCollected
      wx.setStorage({
          key: 'isCollected',
          data: obj
      })
  },
  // 点击切换播放音乐
  switchMusicPlay () {
    const switchMusicIcon = !this.data.switchMusicIcon
    this.setData({switchMusicIcon})
    const {dataUrl,title} = this.data.detailList.music
      // 添加音乐
    if (switchMusicIcon){
      wx.playBackgroundAudio({
          dataUrl,
          title
      })
    } else{
        wx.pauseBackgroundAudio()
    }
  },
  // 点击分享
  handleShare () {
      wx.showActionSheet({
          itemList:[
              "分享给微信好友",
              "分享到朋友圈",
              "分享到世界"
          ],
          itemColor: "#333"
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