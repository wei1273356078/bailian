// 获取数据
var data = JSON.parse(sessionStorage.getItem('data')),
    orderId = window.location.search.slice(window.location.search.indexOf('=') + 1),
    orderList = data.orderList.find(item => item.id === parseInt(orderId)),
    userName = Cookies.get('user');

// 用户登录显示状态
if(userName) {
  document.querySelector('.header-top-right>ul>li.login>.regist').classList.remove('show');
  document.querySelector('.header-top-right>ul>li.login>.user').classList.add('show');
  document.querySelector('.header-top-right>ul>li.login>.user>a').innerText = userName;
}

// 跳转订单页面
(function() {
  document.querySelector('.header-top-right>ul>li>a.a-order').onclick = function() {
    Cookies.set('aOrder', '456');
    window.location.href = '../profile/profile.html'
  };
})();

// 展示订单金额
(function() {
  document.querySelector('.main-middle-right').innerHTML = `
    订单金额：<span>￥${orderList.account.toFixed(2)}</span>
  `;
  // 显示支付金额
  document.querySelector('.main>.er-wei-ma>.shadow-content>.shadow-font>span').innerText += `${orderList.account.toFixed(2)}`;
})();

// 切换支付方式和支付软件
(function() {
  // 支付方式
  document.querySelectorAll('.main-bottom>ul.pay-list>li').forEach(function(item, i) {
    item.onclick = function() {
      if(this.classList.contains('active')) return;
      this.parentNode.querySelector('li.active').classList.remove('active');
      this.classList.add('active');
      this.parentNode.parentNode.querySelector('.pay-mode>div.active').classList.remove('active');
      this.parentNode.parentNode.querySelectorAll('.pay-mode>div')[i].classList.add('active');
    }
  });
  // 支付软件
  document.querySelectorAll('.pay-mode>div>div').forEach(function(item, i) {
    item.onclick = function() {
      if(this.classList.contains('show')) return;
      this.parentNode.querySelector('div.show').classList.remove('show');
      this.classList.add('show');
    };
  });
})();

// 确认按钮、已支付按钮、关闭按钮
(function() {
  // 确认按钮
  document.querySelector('.main>.btn-confirm>button').onclick = function() {
    document.querySelector('.er-wei-ma').classList.add('show');
  }
  // 已支付按钮
  document.querySelector('.er-wei-ma>.shadow-content>.shadow-font>button').onclick = function() {
    Cookies.set('isPayPage', '321');
    document.querySelector('.er-wei-ma').classList.remove('show');
    orderList.isPay = true;
    sessionStorage.setItem('data', JSON.stringify(data));
    window.location.replace('../profile/profile.html');
  };
  // 关闭按钮
  document.querySelector('.er-wei-ma>.shadow-content>i').onclick = function() {
    document.querySelector('.er-wei-ma').classList.remove('show');
  }
})();


// 倒计时
(function() {
  var maxTime = 5 * 60;
  setInterval(() => {
    if(maxTime >= 0) {
      var minute = Math.floor(maxTime / 60),
          seconde = Math.floor(maxTime % 60) > 9 ? Math.floor(maxTime % 60) : '0' + Math.floor(maxTime % 60);
      document.querySelector('.main-middle>.main-middle-left>div>p>span').innerText = `${minute}分${seconde}秒`;
      maxTime--;
    }else {
      Message.confirm('订单失效。。请重新下单', function() {
        window.location.replace('../home/index.html');
      });
    }
  }, 1000);
})();

