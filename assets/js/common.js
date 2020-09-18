// 获取列表数据并把JSON格式解析成对象
var data = JSON.parse(sessionStorage.getItem('data')),
    categoryList = data.categoryList,
    userList = data.userList,
    ulElMain = document.querySelector('ul.header-main'),
    userName = Cookies.get('user');
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

// 跳转订单页面
(function() {
  document.querySelector('.header-top-right>ul>li>a.a-order').onclick = function() {
    Cookies.set('aOrder', '456');
    window.location.href = '../profile/profile.html'
  };
})();



// 用户登录显示状态
if(userName) {
  // 顶部用户显示
  document.querySelector('.header-top-right>ul>li.login>.regist').classList.remove('show');
  document.querySelector('.header-top-right>ul>li.login>.user').classList.add('show');
  document.querySelector('.header-top-right>ul>li.login>.user>a').innerText = userName;
  // fix用户图片显示
  document.querySelector('.fix-top-right>.fix-login').classList.remove('show');
  document.querySelector('.fix-top-right>.fix-user').classList.add('show'); 
  // 侧边栏显示用户名
  document.querySelector('.aside-right>.user>.user-top>a>span').innerText = userName;
}


// fix-top 
var ulElFix = document.querySelector('ul.fix-top-main');
// 动态渲染fix-top导航
categoryList.filter(item => item.fid === 0).forEach((item, index) => {
  // console.log(item);
  var liElFix = document.createElement('li'),
      ulElFixSub = document.createElement('ul'),
      categoryListSub = categoryList.filter(item1 => item1.fid === item.id);
  liElFix.innerHTML = `
    <a href='../list/list.html?pid=${item.id}' class='v-middle'>
      <span class='bg' style='background-position: 0 -${index * 16}px;'></span>
      <span class='font'>${item.name}</span>
    </a>
  `;

  if(categoryListSub.length === 0) {
    ulElFixSub.innerHTML = `
      <li>暂无商品信息...</li>
    `;
  }else {
    categoryListSub.forEach(item2 => {
      ulElFixSub.innerHTML += `
        <li>
          <a href='../list/list1.html?fid=${item2.id}'><img src='${item2.avatar}' /><span>${item2.name}</span></a>
        </li>
      `;
    });
  }
  liElFix.appendChild(ulElFixSub);
  ulElFix.appendChild(liElFix);
});

// 滚动一定距离顶部出现固定导航
window.onscroll = () => {
  var nowTop = document.documentElement.scrollTop || document.body.scrollTop;
  if(nowTop > 800) document.querySelector('.aside-top').style.display = 'block';
  else document.querySelector('.aside-top').style.display = 'none';
  if(nowTop >= 200) document.querySelector('header.fix-top').style.display = 'block';
  else document.querySelector('header.fix-top').style.display = 'none';
};


// 返回顶部的按钮
if(document.querySelector('.aside-top')) {
  document.querySelector('.aside-top').onclick = () => document.documentElement.scrollTop = 0;
}


// 登录方式的切换
var smLogin = document.querySelector('.login>.dlfs>span.saoma'),
    vipLogin = document.querySelector('.login>.dlfs>span.vip'),
    content1 = document.querySelector('.dlnr>.content1'),
    content2 = document.querySelector('.dlnr>.content2'),
    asideEls = document.querySelectorAll('.aside');
smLogin.onclick = () => {
  smLogin.style.color = '#ff4a4a';
  vipLogin.style.color = '#333';
  content1.style.display = 'block';
  content2.style.display = 'none';
}
vipLogin.onclick = () => {
  vipLogin.style.color = '#ff4a4a';
  smLogin.style.color = '#333';
  content2.style.display = 'block';
  content1.style.display = 'none';
}


// var activeAside = document.querySelector('.aside>.aside-right');
// 点击侧边栏出现信息
(function() {
  if(userName) {
    asideEls.forEach(function(item) {
      // 获取左边的图标li
      var asideLiEls = item.querySelectorAll('.aside-left>ul>li');
      // 遍历
      asideLiEls.forEach(function(item1) {
        // 为每个li绑定点击事件
        item1.onclick = function() {
          // 当li和aside-right有 show-red和active class值时 关闭侧边栏 隐藏背景色
          var asideRight = document.querySelector('.aside>.aside-right');
          if(asideRight.className.indexOf('active') !== -1 && this.className.indexOf('show-red') !== -1) {
            this.className = this.className.replace('show-red', '');
            asideRight.className = asideRight.className.replace('active', '');  
          }
          // 有active和没有show-red  时，隐藏背景色并把点击的背景色打开
          else if(asideRight.className.indexOf('active') !== -1 && this.className.indexOf('show-red') === -1) {
            
            var showRed = item.querySelector('.aside-left>ul>li.show-red');
            showRed.className = showRed.className.replace('show-red', ''); 
        
            this.className += ' show-red';
          }else {
            this.className += ' show-red';
            asideRight.className += ' active';
          }
          // 点击侧边栏出现不同的内容
          if(this.className.indexOf('cart') !== -1) {
            document.querySelector('.aside>.aside-right>.login').style.display = 'none';
            document.querySelector('.aside>.aside-right>.cart').style.display = 'block';
            document.querySelector('.aside>.aside-right>.user').style.display = 'none';
          } else {
            document.querySelector('.aside>.aside-right>.user').style.display = 'block';
            document.querySelector('.aside>.aside-right>.login').style.display = 'none';
            document.querySelector('.aside>.aside-right>.cart').style.display = 'none';
          }
        }
      });
    });
  }else {
    asideEls.forEach(function(item) {
      // 获取左边的图标li
      var asideLiEls = item.querySelectorAll('.aside-left>ul>li');
      // 遍历
      asideLiEls.forEach(function(item1) {
        // 为每个li绑定点击事件
        item1.onclick = function() {
          // 当li和aside-right有 show-red和active class值时 关闭侧边栏 隐藏背景色
          var asideRight = document.querySelector('.aside>.aside-right');
          if(asideRight.className.indexOf('active') !== -1 && this.className.indexOf('show-red') !== -1) {
            this.className = this.className.replace('show-red', '');
            asideRight.className = asideRight.className.replace('active', '');  
          }
          // 有active和没有show-red  时，隐藏背景色并把点击的背景色打开
          else if(asideRight.className.indexOf('active') !== -1 && this.className.indexOf('show-red') === -1) {
            
            var showRed = item.querySelector('.aside-left>ul>li.show-red');
            showRed.className = showRed.className.replace('show-red', ''); 
        
            this.className += ' show-red';
          }else {
            this.className += ' show-red';
            asideRight.className += ' active';
          }
          // 点击侧边栏出现不同的内容
          if(this.className.indexOf('cart') !== -1) {
            document.querySelector('.aside>.aside-right>.login').style.display = 'none';
            document.querySelector('.aside>.aside-right>.user').style.display = 'none';
            document.querySelector('.aside>.aside-right>.cart').style.display = 'block';
          } else {
            document.querySelector('.aside>.aside-right>.login').style.display = 'block';
            document.querySelector('.aside>.aside-right>.cart').style.display = 'none';
            document.querySelector('.aside>.aside-right>.user').style.display = 'none';
          }
        }
      });
    });
  }
})();



// 封装一个渲染侧边栏购物车
function asideCart() {
  document.querySelector('.aside>.aside-right>.cart>.cart-top>.cart-list>table>tbody').innerHTML = '';
  var data = JSON.parse(sessionStorage.getItem('data'));
  // var cartList = data.cartList;
  var userCartList = data.cartList.filter(item => item.name === userName);
  // 判断购物车是否有商品
  if(userCartList.length === 0) {
    document.querySelector('.aside>.aside-right>.cart>.cart-top>.cart-empty').classList.add('show');
  }
  else {
    document.querySelector('.aside>.aside-right>.cart>.cart-top>.cart-empty').classList.remove('show');
    document.querySelector('.aside>.aside-right>.cart>.cart-top>.cart-list').classList.add('show');
    userCartList.forEach(item => {
      var product = data.productList.find(item1 => item1.id === item.pid);
      document.querySelector('.aside>.aside-right>.cart>.cart-top>.cart-list>table>tbody').innerHTML += `
        <tr data-count='${item.count}' data-checked='${1}' data-price='${product.price}'>
          <td><a href='javascript:void(0);'><img src='${product.avatar}' /></a></td>
          <td>
            <div>
              <a href='javascript:void(0);' title='${product.name}'>${product.name}</a>
              <span class='price'>${product.price.toFixed(2)} </span> 
              x <span class='count'>${item.count}</span>
            </div>
          </td>
          <td><span class='total'>${(product.price * item.count).toFixed(2)}</span></td>
        </tr>
      `;
    });
    updateTotalAndAccount();
  }
 
  
}
// 动态渲染购物车信息
(function() {
  asideCart();
})();

// 封装一个函数,更新当前购物车的总金额和总数量
function updateTotalAndAccount() {
  var trs = document.querySelectorAll('.aside>.aside-right>.cart>.cart-top>.cart-list>table>tbody>tr');
  var total = 0,
      account = 0;
  trs.forEach(function(tr) {
    if(tr.dataset.checked === '1') {
      total += parseInt(tr.dataset.count);
      account += parseFloat(tr.dataset.price) * parseInt(tr.dataset.count);
    }
  })
  document.querySelector('.aside>.aside-left>ul>li.cart>a>b').innerText = total;
  document.querySelector('.aside>.aside-right>.cart>.cart-bottom>.cart-account-wrapper>span.account').innerText = total;
  document.querySelector('.aside>.aside-right>.cart>.cart-bottom>.cart-account-wrapper>span.total').innerText = account.toFixed(2);
}
// 点击登录按钮
(function() {
  var codes = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M","q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","0","1","2","3","4","5","6","7","8","9"];
  var codeStr = '';
  for(var i = 1; i <= 4; i++) {
    codeStr += codes[Math.floor(Math.random() * codes.length)];
  }
  document.querySelector('.content2>span.code').innerText = codeStr;
  document.querySelector('.content2>span.code').onclick = function() {
    var codeStr = '';
    for(var i = 1; i <= 4; i++) {
      codeStr += codes[Math.floor(Math.random() * codes.length)];
    }
    this.innerText = codeStr;
  }
  // console.log(codeStr);
  var btnLogin = document.querySelector('.login>.dlnr>.content2>input.btn-login');
  btnLogin.onclick = function() {
    var user = document.querySelector('.login>.dlnr>.content2>input.user').value.trim(),
        pwd = document.querySelector('.login>.dlnr>.content2>input.pwd').value.trim(),
        yanzhengma = document.querySelector('.login>.dlnr>.content2>input.yanzhengma').value.trim(),
        yanZheng = document.querySelector('.login>.dlnr>.content2>span.code').innerText.toLowerCase(),
        isUser = userList.find(item => item.name === user),
        isPhone = userList.find(item => item.phone === user),
        isPwd = userList.find(item => item.pwd === pwd),
        isYZM = yanZheng === yanzhengma;
    if(typeof userName !== 'undefined') {
      Message.notice(`您已经成功登录 ${userName}`);
      return;
    }
    // 判断用户名手机号 且密码正确
    if((isUser || isPhone) && isPwd) {
      // 判断验证码是否输入
      if(isYZM) {
        Cookies.set('user', userList.find(function(item) {return item.name === user || item.phone === user}).name);
        var backUrl = Cookies.get('backUrl');
        Cookies.remove('backUrl');
        // href是可以后退到登录页面的
        // window.location.href = backUrl || '../home/index.html';
        // replace 是替换掉上一次记录，不能回到登录页的
        window.location.replace(backUrl || '../home/index.html');
        return;
      }
      Message.notice('验证码错误！');
      return;
    }
    Message.notice('用户名或密码错误！');
  }
})();





