// 获取userList数据
var data = JSON.parse(sessionStorage.getItem('data')),
    userList = data.userList;
// console.log(typeof userList);
// 获取注册按钮，并更新数据
(function () {
  // userList.forEach(function(item) {
    var form = document.forms['regist']
    form.btnRegist.onclick = function () {
     
      var user = form.user.value,
          pwd = form.pwd.value,
          phone = form.phone.value,
          checked = form.check.checked,
          isRegister = userList.find(item => item.name === user),
          isPhone = userList.some(item => item.phone === phone),
          phoneLength = /^1\d{10}$/,
          obj = {
            name: user,
            pwd: pwd,
            phone: phone,
          };
      // 判断用户名的输入
      if (user === '') {
        Message.notice('请输入用户名');
        return;
      }
      // 判断密码的输入
      if (pwd === '') {
        Message.notice('请输入密码');
        return;
      }
      // 判断手机号的输入
      if (phone === '') {
        Message.notice('请输入手机号');
        return;
      }
      // 判断手机号是否是11位
      if(!phoneLength.test(parseInt(phone))) {
        Message.notice('请正确的输入手机号');
        return;
      }
      // 判断用户名是否重复
      if(!!isRegister) {
        Message.notice('用户名已被注册，请重新输入');
        return;
      }
      // 判断手机号是否重复
      if(isPhone) {
        Message.notice('手机号已被注册，请重新输入');
        return;
      }
      // 判断协议是否选中
      if (checked === false) {
        Message.notice('请勾选协议');
        return;
      }
      userList.push(obj);
      sessionStorage.setItem('data', JSON.stringify(data));
      Message.notice('注册成功！请登录');
      setTimeout(() => {
        window.location.replace('./login.html');
      }, 2000);
    }
  // })
})()
