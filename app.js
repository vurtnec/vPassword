//app.js
var appData = {};

appData.onLaunch = function () {
  console.log("onLaunch");
  this.globalData = wx.getStorageSync('passwords');
  if (!this.globalData) {
    this.globalData = [];
  }
};

App(appData)