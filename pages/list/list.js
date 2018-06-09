//index.js
var util = require('../../utils/util.js');
var appInstance = getApp();
var pageData = {};

pageData.onLoad = function () {
  console.log("onLoad list");
  var pages = getCurrentPages();
  var currPage = pages[pages.length - 1];
  if (currPage.data.password) {
    var passwordJson = currPage.data.password;
    var isExisted = util.checkExisted(pageData.data.passwords, passwordJson);
    if (isExisted) {
      util.updateItem(pageData.data.passwords, passwordJson);
    } else {
      pageData.data.passwords.push(passwordJson);
    }
    this.setData(pageData.data);

    wx.setStorageSync("passwords", pageData.data.passwords);
  }
  wx.setStorageSync("lastLoadDate", new Date());
};

pageData.onShow = function () {
  console.log("onShow list");

  var lastLoadDate = wx.getStorageSync("lastLoadDate");

  if (new Date().getTime() - lastLoadDate.getTime() > 300000) {
    wx.redirectTo({
      url: '/pages/index/index',
    });
  }
  var pages = getCurrentPages();
  var currPage = pages[pages.length - 1];
  if (currPage.data.password) {
    var passwordJson = currPage.data.password;
    var isExisted = util.checkExisted(pageData.data.passwords, passwordJson);
    if (isExisted) {
      util.updateItem(pageData.data.passwords, passwordJson);
    } else {
      pageData.data.passwords.push(passwordJson);
    }
    this.setData(pageData.data);

    wx.setStorageSync("passwords", pageData.data.passwords);
  }
};

pageData.data =
{
  passwords: getApp().globalData
};

pageData.widgetsToggle = function (e) {
  var id = e.currentTarget.id;

  for (var i = 0, len = pageData.data.passwords.length; i < len; ++i) {
    var name = pageData.data.passwords[i].name;
    if (name == id) {
      pageData.data.passwords[i].show = !pageData.data.passwords[i].show;
    }else {
      pageData.data.passwords[i].show = false;
    }
  }
  this.setData(pageData.data);
};

pageData.copyPass2CB = function (e) {
  var password = e.currentTarget.dataset.password.password;
  wx.setClipboardData({
    data: password,
    success: function (res) {
    }
  });
};

pageData.copyAcct2CB = function (e) {
  var account = e.currentTarget.dataset.password.account;
  wx.setClipboardData({
    data: account,
    success: function (res) {
    }
  });
};

pageData.backup = function (e) {
  for (var i = 0, len = pageData.data.passwords.length; i < len; i++) {
    pageData.data.passwords[i].password = util.encode(pageData.data.passwords[i].password);
  }
  wx.setClipboardData({
    data: JSON.stringify(pageData.data.passwords),
    success: function (res) {
      wx.showModal({
        title: '提示',
        content: '密码文件已经复制到当前剪贴板，请粘贴后备份保存。',
        showCancel: false
      });
    }
  });
  for (var i = 0, len = pageData.data.passwords.length; i < len; i++) {
    pageData.data.passwords[i].password = util.decode(pageData.data.passwords[i].password);
  }
}

pageData.restoreBackup = function (e) {
  var self = this;
  wx.showModal({
    title: '提示',
    content: '请先确保备份文件已经复制到剪贴板。',
    showCancel: true,
    success: function (res) {
      wx.getClipboardData({
        success: function (res) {
          var passwords = res.data;
          if (passwords && util.isJSON(passwords)) {
            pageData.data.passwords = JSON.parse(passwords);
            for (var i = 0, len = pageData.data.passwords.length; i < len; i++) {
              pageData.data.passwords[i].password = util.decode(pageData.data.passwords[i].password);
            }
            self.setData(pageData.data);
            wx.setStorageSync("passwords", pageData.data.passwords);
          }else {
            wx.showModal({
              title: '提示',
              content: '请确保备份文件已经复制到剪贴板后重试。',
              showCancel: false
            });
          }
        }
      });
    }
  });
}

pageData.editPassword = function (e) {
  wx.navigateTo({
    url: '/pages/add/add?password=' + JSON.stringify(e.currentTarget.dataset.password)
  });
}

pageData.deletePassword = function (e) {
  var self = this;
  wx.showModal({
    title: '删除密码',
    content: '你确定要删除此项么？',
    confirmText: '确定',
    cancelText: '取消',
    success: function (res) {
      if (res.confirm) {
        var id = e.currentTarget.dataset.password.name;
        var newPasswords = pageData.data.passwords.slice(0);
        for (var i = 0, len = pageData.data.passwords.length; i < len; ++i) {
          var name = pageData.data.passwords[i].name;
          if (name == id) {
            newPasswords.splice(i, 1);
          }
        }
        pageData.data.passwords = newPasswords;
        self.setData(pageData.data);
        wx.setStorageSync("passwords", pageData.data.passwords);
      } else if (res.cancel) {
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
