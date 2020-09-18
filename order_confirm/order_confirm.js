// console.log(Cookies.get('settle'));
// 获取数据
var data = JSON.parse(sessionStorage.getItem('data')),
    cartList = data.cartList,
    cartIds = Cookies.get('settle'),
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
// 如果是非正常进入，直接返回首页
if(!cartIds) window.location.replace('../home/index.html');

cartIds = cartIds.split(',').map(item => parseInt(item));

var userName = Cookies.get('user');

var addressId = 0;
if(Cookies.get('addressId')) {
  addressId = parseInt(Cookies.get('addressId'));
  Cookies.remove('addressId');
}
// 收货地址
(function() {
  var userAddressList = data.addressList.filter(function(item) {return item.name === userName}),
      ulEls = document.querySelector('ul.address-list');
  userAddressList.forEach(function(item) {
    ulEls.innerHTML += `
      <li data-id='${item.id}' class='${(addressId !== 0 && item.id === addressId) || (addressId === 0 && item.isDefault) ? 'select' : ''}'>
        <h3>${item.receiveName}</h3>
        ${item.isDefault ? '<span>默认地址</span>' : ''}
        <p>${item.receivePhone}</p>
        <p>${item.receiveRegion} ${item.receiveAddress}</p>
      </li>
    `;
    if(addressId === 0 && item.isDefault) addressId = item.id;
  });
  ulEls.innerHTML += `
    <li><a href='javascript:void(0)' class='btn-gotoAddress'>+ 新增收货地址</a></li>
  `;
  document.querySelectorAll('ul.address-list>li').forEach(function(li) {
    li.onclick = function() {
      if(this.classList.contains('select')) return;
      this.parentNode.querySelectorAll('li').forEach(function(item) {item.classList.remove('select')});
      this.classList.add('select');
      addressId = parseInt(this.dataset.id);
    }
  });
  document.querySelector('a.btn-gotoAddress').onclick = function() {
    Cookies.set('isFromOrderConfirm', '123');
    window.location.href = '../profile/profile.html';
  }
})();

// 商品清单
var account = 0,
    detail = [];
(function() {
  cartIds.forEach(function(cartId) {
    var cart = cartList.find(function(item) {return item.id === cartId});
    var product = data.productList.find(function(item) {return item.id === cart.pid});
    detail.push({pid: cart.pid, name: product.name, count: cart.count, price: product.price, avatar:product.avatar});
    account += cart.count * product.price;
    document.querySelector('table.product-list>tbody').innerHTML += `
      <tr>
        <td><img src='${product.avatar}' /></td>
        <td><h5>${product.name}</h5></td>
        <td><span class='count'>${cart.count}</span></td>
        <td><span class='price'>￥${product.price.toFixed(2)}</span></td>
        <td><span class='total'>￥${(product.price * cart.count).toFixed(2)}</span></td>
      </tr>
    `;
  });
  document.querySelector('span.account').innerHTML = `总金额：<span>￥${account.toFixed(2)}</span>`;
})();

// 生成订单
(function() {
  document.querySelector('input.btn-confirm').onclick = function() {
    if(addressId === 0) {
      Message.alert('请选择收货地址');
      return;
    }
    // 从购物车中删除对应的购物记录
    cartIds.forEach(function(cartId) {
      var i = cartList.findIndex(function(item) {return item.id === cartId});
      cartList.splice(i, 1);
    });
    // 构造一个新的订单 push到orderList中
    var id = data.orderList.length > 0 ? data.orderList[data.orderList.length - 1].id + 1 : 1;
    data.orderList.push({
      id: id,
      name: userName,
      addressId: addressId,
      detail: detail,
      account: account,
      date: new Date(),
      isPay: false
    });
    sessionStorage.setItem('data', JSON.stringify(data));
    Cookies.remove('settle');
    window.location.replace(`../pay/pay.html?id=${id}`);
  }
})();



