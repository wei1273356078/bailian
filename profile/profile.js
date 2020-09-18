// 获取列表数据并把JSON格式解析成对象
var data = JSON.parse(sessionStorage.getItem('data')),
    categoryList = data.categoryList,
    addressList = data.addressList,
    ulElMain = document.querySelector('ul.header-main'),
    userName = Cookies.get('user');


// 确保用户当前是登录的，
if(typeof userName === 'undefined') {
  Cookies.set('backUrl', window.location.href);
  window.location.href = '../login/login.html';
}
// 用户登录显示状态
if(userName) {
  document.querySelector('.header-top-right>ul>li.login>.regist').classList.remove('show');
  document.querySelector('.header-top-right>ul>li.login>.user').classList.add('show');
  document.querySelector('.header-top-right>ul>li.login>.user>a').innerText = userName;
}
// 动态渲染导航
categoryList.filter(item => item.fid === 0).forEach((item, index) => {
  // console.log(item);
  var liEl = document.createElement('li'),
      subUlEl = document.createElement('ul');
      categoryListSub = categoryList.filter(item1 => item1.fid === item.id);
  liEl.innerHTML = `
    <a href='../list/list.html?pid=${item.id}' class='v-middle'>
      <span class='bg' style='background-position: 0 -${index * 16}px;'></span>
      <span class='font'>${item.name}</span>
    </a>
  `;
  if(categoryListSub.length === 0) {
    subUlEl.innerHTML = `
      <li class='v-middle'>暂无商品信息</li>
    `;
  }else {
    categoryListSub.forEach(item1 => {

      subUlEl.innerHTML += `
        <li class='v-middle'>
          <a href='../list/list1.html?fid=${item1.id}&&productName=${item1.productName}'><img src='${item1.avatar}' /><span>${item1.name}</span></a>
        </li>
      `;
    });
  }
  liEl.appendChild(subUlEl);
  ulElMain.appendChild(liEl);
});

// 判断从哪个页面进入的
(function() {
  // 从订单确认页面进来
  var isFromOrderConfirm = Cookies.get('isFromOrderConfirm');
  if(isFromOrderConfirm) {
    document.querySelector('.main-box>.main-left>ul>li>span.show').classList.remove('show');
    document.querySelector('.main-box>.main-left>ul>li>span[data-name=收货地址]').classList.add('show');
    document.querySelector('.main-box>.main-right>div.show').classList.remove('show');
    document.querySelector('.main-box>.main-right>div.address-tb').classList.add('show');
  }
  // 从支付页面过来的
  var isPayPage = Cookies.get('isPayPage');
  if(isPayPage) {
    Cookies.remove('isPayPage');
    document.querySelector('.main-box>.main-left>ul>li>span.show').classList.remove('show');
    document.querySelector('.main-box>.main-left>ul>li>span[data-name=我的订单]').classList.add('show');
    document.querySelector('.main-box>.main-right>div.show').classList.remove('show');
    document.querySelector('.main-box>.main-right>div.order').classList.add('show');
  }
  // 从顶部的订单点进来的
  var aOrder = Cookies.get('aOrder');
  if(aOrder) {
    Cookies.remove('aOrder');
    document.querySelector('.main-box>.main-left>ul>li>span.show').classList.remove('show');
    document.querySelector('.main-box>.main-left>ul>li>span[data-name=我的订单]').classList.add('show');
    document.querySelector('.main-box>.main-right>div.show').classList.remove('show');
    document.querySelector('.main-box>.main-right>div.order').classList.add('show');
  }
})();



// 切换显示不同的信息
(function() {
  var spanEls = document.querySelectorAll('.main>.main-box>.main-left>ul>li>span');
  spanEls.forEach(function(span, i) {
    span.onclick = function() {
      if(this.classList.contains('show')) return;
      span.parentNode.parentNode.querySelector('span.show').classList.remove('show');
      this.classList.add('show');
      span.parentNode.parentNode.parentNode.parentNode.querySelector('.main-right>.show').classList.remove('show');
      this.parentNode.parentNode.parentNode.parentNode.querySelectorAll('.main-right>div')[i].classList.add('show');
      document.querySelector('.main>.main-top>span').innerText = this.dataset.name
    }
  });
})();



// 动态渲染个人资料
(function() {
  // 渲染手机号
  var userNameList = data.userList.find(item => item.name === userName);
  document.querySelector('.main-right>.information>.info-top>.info-top-left>div>h3').innerText = `${userNameList.name}`;
  document.querySelector('.main-right>.information>.info-top>.info-top-right>p>span.phone').innerText = `${userNameList.phone}`;
})();



// 点击顶部的订单
(function() {
  document.querySelector('.header-top-right>ul>li>a.a-order').onclick = function() {
    document.querySelector('.main-box>.main-left>ul>li>span.show').classList.remove('show');
    document.querySelector('.main-box>.main-left>ul>li>span[data-name=我的订单]').classList.add('show');
    document.querySelector('.main-box>.main-right>div.show').classList.remove('show');
    document.querySelector('.main-box>.main-right>div.order').classList.add('show');
  }
})();



// 封装一个时间转换函数
function formatTime(time) {
  var date = new Date(time);
  // console.log(date);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0"+m: m;
  // console.log(m);
  var d = date.getDate();
  d = d < 10 ? "0"+ d: d;
  var h = date.getHours();
  h = d < 10 ? "0" + h: h;
  var min = date.getMinutes();
  min = min < 10? "0" + min: min;
  var sec = date.getSeconds();
  sec = sec < 10? "0" + sec: sec;
  return  y + "-" + m + "-" + d + " " + h + ":" + min + ":" + sec;
};
// 封装一个我的订单函数
function myOrder() {
  var orderInfo = data.orderList;
  if(orderInfo.length > 0) {
    document.querySelector('.all-order>table.show').classList.remove('show');
    document.querySelector('.all-order>table.all-order-list').classList.add('show');
  }else {
    document.querySelector('.all-order>table.show').classList.remove('show');
    document.querySelector('.all-order>table.all-order-empty').classList.add('show');
  }
  orderInfo.forEach(item => {
    var orderTime = formatTime(item.date);
    item.detail.forEach(item1 => {
      document.querySelector('.order-bottom>div>table>tbody').innerHTML += `
        <tr data-pid='${item1.pid}' data-id='${item.id}'>
          <td>
            <div>
              <img src='${item1.avatar}' />
              <span class='name'>${item1.name}</span>
              <span class='price'>￥${item1.price.toFixed(2)}</span>
              <span class='count'>x${item1.count}</span>
              <span class='date'>${orderTime}</span>
            </div>
          </td>
          <td><span class='account'>${(item1.price * item1.count).toFixed(2)}</span></td>
          <td>${item.isPay ? '<span class="green">已支付</span>' : '<span class="red">订单已失效</span>'}</td>
          <td><span class="remove-order">删除订单</span></td>
        </tr>
      `;
    });
  });
}
// 封装一个发货的函数
function faGoods() {
  var orderInfo = data.orderList,
      number = 0;
  if(orderInfo.length > 0) {
    document.querySelector('.fa-huo>ul.show').classList.remove('show');
    document.querySelector('.fa-huo>ul.fa-list').classList.add('show');
  }else {
    document.querySelector('.fa-huo>ul.show').classList.remove('show');
    document.querySelector('.fa-huo>ul.fa-empty').classList.add('show');
  }
  orderInfo.forEach(item => {
    if(item.isPay) {
      item.detail.forEach(item1 => {
        document.querySelector('.order-bottom>.fa-huo>ul').innerHTML += `
          <li>
            <img src='${item1.avatar}' />
            <span>${item1.name}</span>
            <span>商家正在加速备货中~~</span>
          </li>
        `;
        number++;
      });
    }
  });
  document.querySelector('.order>.order-top>ul>li>span.goods').innerText = number;
}
// 动态渲染我的订单
(function() {
  myOrder();
})();
// 订单删除按钮
(function() {
  // document.querySelectorAll('.order-bottom>div>table>tbody>tr>td>span.remove-order').forEach(span => {
    document.querySelector('.order-bottom>div>table>tbody').onclick = function(e) {
      // that = this;
      if(e.target.classList.contains('remove-order')) {
        var that = this;
        Message.confirm('删除此订单？', () => {
          var orderInfo = data.orderList,
              id = parseInt(e.target.parentNode.parentNode.dataset.id),
              pid = parseInt(e.target.parentNode.parentNode.dataset.pid);
          that.removeChild(e.target.parentNode.parentNode);
          orderInfo.forEach((item1) => {
            if(item1.id === id) {
              if(item1.detail.length > 0) {
                var index = item1.detail.findIndex(item => item.pid === pid);
                item1.detail.splice(index, 1);
                sessionStorage.setItem('data',JSON.stringify(data));
                if(item1.detail.length === 0) {
                  var index1 = orderInfo.findIndex(item => item.id === id);
                  orderInfo.splice(index1, 1);
                  sessionStorage.setItem('data',JSON.stringify(data));
                }
              }
            }
          });
          document.querySelector('.order-bottom>.all-order>table.all-order-list>tbody').innerHTML = '';
          myOrder();
          document.querySelector('.order-bottom>.fa-huo>ul').innerHTML = '';
          faGoods();
        });
      }
    }
  // });
})();
// 订单来回切换
(function() {
  document.querySelectorAll('.order>.order-top>ul>li').forEach((li, i) => {
    li.onclick = function() {
      if(this.classList.contains('show')) return;
      this.parentNode.querySelector('li.show').classList.remove('show');
      this.classList.add('show');
      this.parentNode.parentNode.parentNode.querySelector('.order-bottom>.show').classList.remove('show');
      this.parentNode.parentNode.parentNode.querySelectorAll('.order-bottom>div')[i].classList.add('show');
    }
  });
})();
// 渲染发货
(function() {
  faGoods();
})();




// 封装一个地址函数
function myAddress() {
  var userAddressList = addressList.filter(function(item) { return item.name === userName; })
  document.querySelector('.address-empty').classList.toggle('show', userAddressList.length === 0);
  document.querySelector('.address-list').classList.toggle('show', userAddressList.length !== 0);
  if(userAddressList.length > 0) {
    userAddressList.forEach(function(item) {
      document.querySelector('ul.address-list').innerHTML += `
        <li>
          <a href='javascript:void(0)' data-id='${item.id}' class='btn-default${item.isDefault ? ' default' : ''}'></a>
          <h3><i class='iconfont icon-geren'></i> ${item.receiveName}</h3>
          <p><i class='iconfont icon-dizhi'></i> ${item.receiveRegion} ${item.receiveAddress}</p>
          <p><i class='iconfont icon-shouji'></i> ${item.receivePhone}</p>
          <input type='button' data-id='${item.id}' value='修改' class='btn-update' />
          <input type='button' data-id='${item.id}' value='删除' class='btn-remove' />
        </li>
      `;
    });
  }
}
// 动态渲染当前的登录用户的地址信息
(function() {
  myAddress();
})();
// 绑定各种点击事件
(function() {
  // 点击关闭按钮
  document.querySelector('.shadow-box>.address-edit-wrapper>.address>.form-item-wrapper>input.btn-close').onclick = function() {
    document.querySelector('.address-tb>.shadow-box').classList.remove('show');
  }
  // 开始新增
  document.querySelector('.address-tb>.btn-add').onclick = function() {
    var form = document.forms['address'];
    this.parentNode.querySelector('.shadow-box').classList.add('show');
    form.editMode.value = '1';
    form.id.value = '';
    regionPicker.reset();  // 地址重置
    form.reset(); // 表单充值
  }
  // 点击事件
  document.querySelector('ul.address-list').onclick = function(e) {
    // 如果点的是设为默认地址按钮
    if(e.target.classList.contains('btn-default')) {
      if(e.target.classList.contains('default')) return;
      addressList.forEach(function(item) {
        if(item.name === userName) {
          item.isDefault = item.id === parseInt(e.target.dataset.id);
        }
      });
      sessionStorage.setItem('data', JSON.stringify(data));
      this.querySelectorAll('.btn-default').forEach(function(item) {
        item.classList.remove('default');
      });
      e.target.classList.add('default');
      Message.notice('默认地址设置成功');
    }
    // 如果点击的是删除按钮
    if(e.target.classList.contains('btn-remove')) {
      var that = this;
      Message.confirm('确定要删？', function() {
        var id = parseInt(e.target.dataset.id);
        var i = addressList.findIndex(item => item.id === id);
        // console.log(id, i);
        addressList.splice(i, 1);
        sessionStorage.setItem('data', JSON.stringify(data));
        that.removeChild(e.target.parentNode);
        if(that.querySelectorAll('li').length === 0) {
          that.classList.remove('show');
          document.querySelector('.address-empty').classList.add('show');
        }
        Message.notice('删除成功！');
      });
    }
    // 如果是点击的是修改按钮
    if(e.target.classList.contains('btn-update')) {
      // 开始修改
      document.querySelector('.address-tb>.shadow-box').classList.add('show');
      var id = parseInt(e.target.dataset.id);
      var form = document.forms['address'];
      form.editMode.value = '0';
      form.id.value = id;
      var target = addressList.find(function(item) { return item.id === id });
      form.receiveName.value = target.receiveName;
      form.receivePhone.value = target.receivePhone;
      regionPicker.set(target.receiveRegion);
      form.receiveAddress.value = target.receiveAddress;
    }
  }
})();
// 保存按钮点击事件
(function() {
  document.querySelector('input.btn-save').onclick = function() {
    var form = document.forms['address'],
        phoneLength = /^1\d{10}$/,
        address = {
          name: userName,
          receiveName: form.receiveName.value,
          receivePhone: form.receivePhone.value,
          receiveRegion: regionPicker.get(),
          receiveAddress: form.receiveAddress.value
        };
    if(form.editMode.value === '1') { // 新增
      var id = addressList.length > 0 ? addressList[addressList.length - 1].id + 1 : 1;
      address.id = id;
      address.isDefault = false;
      if(receiveName.value === '') {
        Message.alert('请输入有效的名称');
        return;
      }
      if(receivePhone.value === '') {
        Message.alert('请输入手机号');
        return;
      };
      if(!phoneLength.test(receivePhone.value)) {
        Message.alert('请输入有效的手机号');
        return;
      }
      if(receiveAddress.value === '') {
        Message.alert('请输入详细的地址');
        return;
      }
      addressList.push(address);
      sessionStorage.setItem('data', JSON.stringify(data));
      Message.alert('新增成功');
      document.querySelector('.address-tb>.shadow-box').classList.remove('show');
    }else {    // 修改
      var id = parseInt(form.id.value);
      var i = addressList.findIndex(function(item) {return item.id === id});
      address.id = id;
      address.isDefault = addressList[i].isDefault;
      addressList.splice(i, 1, address);
      sessionStorage.setItem('data', JSON.stringify(data));
      Message.alert('修改成功');
      document.querySelector('.address-tb>.shadow-box').classList.remove('show');
    }
    if(Cookies.get('isFromOrderConfirm')) { // 如果来自订单确认页面
      Cookies.remove('isFromOrderConfirm');
      Cookies.set('addressId', address.id);
      window.location.replace('../order_confirm/order_confirm.html');
    }else {  // 单纯的地址管理
      console.log(receiveName.value === '');
      
      // if() {}
      document.querySelector('.address-tb>ul.address-list').innerHTML = '';
      myAddress();
    }
  }
})();
