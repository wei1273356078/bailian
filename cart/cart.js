// 获取数据
var data = JSON.parse(sessionStorage.getItem('data')),
    cartList = data.cartList,
    productList = data.productList,
    userName = Cookies.get('user');

// 用户登录显示状态
if(userName) {
  document.querySelector('.header-top-right>ul>li.login>.regist').classList.remove('show');
  document.querySelector('.header-top-right>ul>li.login>.user').classList.add('show');
  document.querySelector('.header-top-right>ul>li.login>.user>a').innerText = userName;
}
// 显示用户购物车中的商品信息
(function() {
  var userCartList = cartList.filter(item => item.name === userName);
  // 判断是否有商品
  if(userCartList.length > 0) $('.product-info').addClass('show');
  else $('.product-empty').addClass('show');
  // 展示当前用户的商品信息
  userCartList.forEach(item => {
    var product = productList.find(product => product.id === item.pid);
    $(`
    <tr data-id=${item.id}  data-checked='${1}' data-price='${product.price}' data-count='${item.count}'>
      <td><i class='checkbox checked'></i></td>
      <td><img src='${product.avatar}' /><a href='javascript:void(0);'>${product.name}</a></td>
      <td>￥<span class='price'>${product.price.toFixed(2)}</span></td>
      <td>
        <input type='button' value='-' class='btn-decrease' ${item.count === 1 ? ' disabled' : ''} />
        <input type='text' class='count' value='${item.count}' />
        <input type='button' value='+' class='btn-increase' ${item.count === 10 ? ' disabled' : ''} />
      </td>
      <td>￥<span class='total'>${(item.count * product.price).toFixed(2)}</span></td>
      <td><span class='remove'>删除</span></td>
    </tr>
  `).appendTo('table.product-list>tbody');
  });
  updateTotalAndAccount();
})();

// 跳转订单页面
(function() {
  $('.header-top-right>ul>li>a.a-order').on('click', function() {
    Cookies.set('aOrder', '456');
    window.location.href = '../profile/profile.html';
  });
})();

// 封装一个函数,更新当前购物车的总金额和总数量
function updateTotalAndAccount() {
  var total = 0,
      account = 0;
  $('table.product-list>tbody>tr').each(function(i, tr) {
    if($(tr).attr('data-checked') === '1') {
      total += parseInt($(tr).attr('data-count'));
      account += parseFloat($(tr).attr('data-price')) * parseInt($(tr).attr('data-count'));
    }
    $('.main-middle-all>.all-count-product>span.all-count').text(total);
    $('.main-bottom-center>span.count').text(total);
    $('.main-bottom-right>span.total').text(account.toFixed(2));
  });
}
// 封装一个函数，更新全选按钮
function updateCheckboxAll() {
  $('i.checkbox.all').toggleClass('checked', $('tbody>tr[data-checked="0"]').length === 0);
}


// 删除按钮绑定点击事件实现购物记录删除
(function() {
  // 删除单个商品
  $('table.product-list>tbody>tr>td>.remove').on('click', function() {
    Message.confirm('确定删除此商品？', () => {
      var $tr = $(this).closest('tr'),
          id = parseInt($tr.attr('data-id'));
      $tr.remove();
      var index = cartList.findIndex(function(item) {
        return item.id === id;
      });
      cartList.splice(index, 1);
      sessionStorage.setItem('data', JSON.stringify(data));
      if($tr.attr('data-checked') === '1') updateTotalAndAccount();
        updateCheckboxAll();
        Message.notice('删除成功！');
        var userCartList = cartList.filter(item => item.name === userName);
        if(userCartList.length === 0) {
          $('.product-empty').addClass('show');
          $('.product-info').removeClass('show');
        } 
    })
  });
  // 全部删除
  $('.main-bottom-left>a.delete-product').on('click', function() {
    Message.confirm('删除所有的商品？', () => {
      data.cartList = [];
      if(data.cartList.length === 0) {
        $('.product-empty').addClass('show');
        $('.product-info').removeClass('show');
      }
      $('.main-middle-all>.all-count-product>span.all-count').text('0');
      sessionStorage.setItem('data', JSON.stringify(data));
    })
  });
})();

// 数量加/减功能实现 
// 减
(function() {
  $('input.btn-decrease').on('click', function() {
    var $tr = $(this).closest('tr'),
        count = parseInt($tr.attr('data-count')),
        id = parseInt($tr.attr('data-id'));
    $tr.attr('data-count', --count);
    $(this).nextAll('input.btn-increase').attr('disabled', false);
    if(count === 1) $(this).attr('disabled', true);
    $(this).next().val(count);
    var total = parseFloat($tr.find('span.price').text()) * parseInt($tr.find('input.count').val());
    $tr.find('span.total').text(total.toFixed(2));
    if($tr.attr('data-checked') === '1') updateTotalAndAccount();
    // 数据的更新
    var cart = cartList.find(function(item2) { 
      return item2.id === id;
    });
    cart.count = count;
    sessionStorage.setItem('data', JSON.stringify(data));
  })
})();
// 加
(function() {
  $('input.btn-increase').on('click', function() {
    var $tr = $(this).closest('tr'),
        count = parseInt($tr.attr('data-count')),
        id = parseInt($tr.attr('data-id'));
    $tr.attr('data-count', ++count);
    $(this).prevAll('input.btn-decrease').attr('disabled', false);
    if(count === 8) $(this).attr('disabled', true);
    $(this).prev().val(count);
    var total = parseFloat($tr.find('span.price').text()) * parseInt($tr.find('input.count').val());
    $tr.find('span.total').text(total.toFixed(2));
    if($tr.attr('data-checked') === '1') updateTotalAndAccount();
    // 数据的更新
    var cart = cartList.find(function(item2) { 
      return item2.id === id;
    });
    cart.count = count;
    sessionStorage.setItem('data', JSON.stringify(data));
  })
})();


// 勾选联动
(function() {
  // 行联动全选
  $('tbody i.checkbox').on('click', function() {
    $(this).closest('tr')
      .attr('data-checked', $(this).hasClass('checked') ? '0' : '1')
      .end()
      .toggleClass('checked');
    updateTotalAndAccount();
    updateCheckboxAll();
  })
  // 全选联动行
  $('i.checkbox.all').on('click',function() {
		$(this).toggleClass('checked');
		$('tbody>tr').attr('data-checked',$(this).hasClass('checked') ? "1" : "0" )
		  .find('i.checkbox').toggleClass("checked",$(this).hasClass('checked'));
		updateTotalAndAccount();
	});
})();

// 结算
(function() {
  $('button.settle').on('click', function() {
    var checkedTrs = $('table.product-list>tbody>tr[data-checked="1"]');
    if(checkedTrs.length === 0) {
      Message.notice('请选择需要购买的商品');
      return;
    }
    Message.confirm('再次确认？', function() {
      var settleIds = '';
      checkedTrs.each(function(i, tr) {
        settleIds += tr.dataset.id + ',';
      });
      settleIds = settleIds.slice(0, -1);
      Cookies.set('settle', settleIds);
      window.location.href = '../order_confirm/order_confirm.html';
    });
  })
})();





