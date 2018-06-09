//index.js
var util = require('../../utils/util.js');
var appInstance = getApp();
var pageData = {};

pageData.onLoad = function() {
  console.log("onLoad index");
};

pageData.onShow = function () {
  console.log("onShow index");
  wx.checkIsSupportSoterAuthentication({
    success(res) {
      // res.supportMode = [] 不具备任何被SOTER支持的生物识别方式
      // res.supportMode = ['fingerPrint'] 只支持指纹识别
      // res.supportMode = ['fingerPrint', 'facial'] 支持指纹识别和人脸识别
      if (res.supportMode[0] == "fingerPrint") {
        wx.startSoterAuthentication({
          requestAuthModes: ['fingerPrint'],
          challenge: '123456',
          authContent: '请用指纹解锁',
          success(res) {
            wx.redirectTo({
              url: '/pages/list/list'
            });
          },
          fail(res) {
            console.log('用户取消了识别，识别失败')
          }
        })
      }
    }
  });
};

pageData.onShareAppMessage = function () {
  return {
    title: '密码管理小程序',
    desc: '本地密码管理小程序',
    path: '/pages/index/index'
  }
}

Page(pageData)
