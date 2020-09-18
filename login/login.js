// 获取用户数据
var userList = JSON.parse(sessionStorage.getItem('data')).userList,
    userName = Cookies.get('user');
// console.log(userList);
// 切换登录方式
(function() {
  var smLogin = document.querySelector('.login>.dlfs>span.saoma'),
      vipLogin = document.querySelector('.login>.dlfs>span.vip'),
      content1 = document.querySelector('.dlnr>.content1'),
      content2 = document.querySelector('.dlnr>.content2');
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
})();



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


