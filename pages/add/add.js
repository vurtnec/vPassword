// pages/add/add.js
var pageData = {};

pageData.data = {};

pageData.onLoad = function(e) {
  if (e.password){
    pageData.data = JSON.parse(e.password);
    this.setData(pageData.data);
  }
};

pageData.onShow = function(e) {
  pageData.data = {};
  this.setData(pageData.data);
}

pageData.formSubmit = function (e) {
  var passwordItem = e.detail.value;
  if (!passwordItem.name || !passwordItem.password || !passwordItem.account) {
    return;
  }
  passwordItem.name = passwordItem.name.trim();
  passwordItem.account = passwordItem.account.trim();
  passwordItem.password = passwordItem.password.trim();

  var passwordStr = JSON.stringify(passwordItem);

  var pages = getCurrentPages();
  var prevPage = pages[pages.length - 2];
  prevPage.setData({
    password: passwordItem
  }); 
  wx.navigateBack();
};

pageData.formReset = function(e) {

}

pageData.onShareAppMessage = function () {
  return {
    title: '密码管理小程序',
    desc: '本地密码管理小程序',
    path: '/pages/index/index'
  }
}

Page(pageData)