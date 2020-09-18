var fid = parseInt(window.location.search.slice(window.location.search.indexOf('=') + 1)),
    productName = window.location.search.slice(window.location.search.lastIndexOf('=') + 1),
    productList = data.productList.filter(item => item.fid === fid);

// console.log(window.location.search);


// var list = productList.filter(item => item.product === 'shuijiao' && item.fid === fid);
// var list1 = productList.filter(item => item.product === 'hundun' && item.fid === fid);
// 渲染商品列表页面
xuanRan(productName+'img', productName);

var orderDir = 'asc'; // asc是升序  desc是降序
var orderKey = 'price'; // price表示按价格排序，sale表示按销量排序，rate表示按评论排序
productList.forEach(item => {
  if(fid === item.fid && productName === item.product) {
    var list =  productList.filter(item1 => item1.product ===  productName && item1.fid === fid);
    paixu(list, item.product)
  }
});
// paixu(list);
// paixu(list1);

// 排序方法
function paixu(list, pro) {
  var lis = document.querySelectorAll('.order>li');
    lis.forEach(function(li) {
      li.onclick = function() {
        if(this.classList.contains('show')) {
          lis.forEach(function(item) {
            item.classList.remove('active');
          })
          this.classList.add('active');
          var product = productList.filter(item => item.product === pro);
          document.querySelector('ul.ul-main').innerHTML = '';
          product.forEach(item => {
            document.querySelector('ul.ul-main').innerHTML += `
              <li data-pid='${item.pid}'>
                <div>
                  <a href='../detail/detail.html?id=${item.id}''><img src='${item.avatar}' /></a>
                  <span class='price'>￥${item.price}</span>
                  <a href='../detail/detail.html?id=${item.id}''>${item.name}</a>
                  <span class='rate'>好评：${item.rate}</span>
                  <span class='sale'>周销售：${item.sale}</span>
                  <a data-id='${item.id}' class='add-cart' href='javascript: void(0);'>加入购物车</a>
                </div>
              </li>
            `;
          });
        }
        if(this.classList.contains('active')) {
          orderDir = orderDir === 'asc' ? 'desc' : 'asc';
          lis.forEach(function(item) {
            item.classList.toggle('asc', orderDir === 'asc');
          });
        }else {
          orderKey = this.dataset.key;
          lis.forEach(function(item) {
            item.classList.remove('active');
          })
          this.classList.add('active');
        }
        if(orderDir === 'asc') {
          this.querySelector('i:nth-child(2)').classList.add('show');
          this.querySelector('i:nth-child(3)').classList.remove('show');
        }else {
          this.querySelector('i:nth-child(3)').classList.add('show');
          this.querySelector('i:nth-child(2)').classList.remove('show');
        }
        sortList(list);
      }
    });
}


function sortList(list) {
  list.sort(function(a, b) {
    return orderDir === 'asc' ? a[orderKey] - b[orderKey] : b[orderKey] - a[orderKey];
  });
  document.querySelector('ul.ul-main').innerHTML = '';
  list.forEach(function(item) {
    document.querySelector('ul.ul-main').innerHTML += `
      <li data-pid='${item.pid}'>
        <div>
          <a href='../detail/detail.html?id=${item.id}'><img src='${item.avatar}' /></a>
          <span class='price'>￥${item.price}</span>
          <a href='../detail/detail.html?id=${item.id}'>${item.name}</a>
          <span class='rate'>好评：${item.rate}</span>
          <span class='sale'>周销售：${item.sale}</span>
          <a data-id='${item.id}' class='add-cart' href='javascript: void(0);'>加入购物车</a>
        </div>
      </li>
    `;
  })
};


// 封装一个渲染函数
function xuanRan(producrImg, productName) {
  productList.filter(item => item.product === producrImg).forEach(item => {
    document.querySelector('main.main>.main-top-img').innerHTML = `
      <img src='${item.avatar}' />
    `;
  });
  (function() {
    var product = productList.filter(item => item.product === productName),
        mainProduct = document.querySelector('main.main>.main-product'),
        ulEl = document.createElement('ul');
    ulEl.className = 'ul-main';
    product.forEach(item => {
      ulEl.innerHTML += `
        <li data-pid='${item.pid}'>
          <div>
            <a href='../detail/detail.html?id=${item.id}'><img src='${item.avatar}' /></a>
            <span class='price'>￥${item.price}</span>
            <a href='../detail/detail.html?id=${item.id}'>${item.name}</a>
            <span class='rate'>好评：${item.rate}</span>
            <span class='sale'>周销售：${item.sale}</span>
            <a data-id='${item.id}' class='add-cart' href='javascript: void(0);'>加入购物车</a>
          </div>
        </li>
      `;
    });
    mainProduct.appendChild(ulEl);
  })();
}