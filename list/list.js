// 获取pid与商品pid对应起来
var pid = parseInt(window.location.search.slice(window.location.search.indexOf('=') + 1)),
    productList = JSON.parse(sessionStorage.getItem('data')).productList.filter(item => item.pid === pid),
    fruitBanner = JSON.parse(sessionStorage.getItem('data')).fruitBanner.filter(item => item.pid === pid);

// banner轮播图
fruitBanner.forEach(item => {
  document.querySelector('.banner').innerHTML = `
    <img src='${item.banner}' />
  `;
});
// 遍历过滤topImage
productList.filter(item => item.product === 'topimage').forEach(item => {
  document.querySelector('main.main>.main-top-image>ul').innerHTML += `
    <li>
      <a href='#'>
        <img src='${item.avatar}' />
      </a>
    </li>
  `;
});
// 遍历过滤jingxuan
(function() {
  var mainJX = document.querySelector('main.main>.main-jingxuan'),
    ulJXEl = document.createElement('ul');

productList.filter(item => item.product === 'jingxuan').forEach(item => {
  mainJX.innerHTML = `
    <div>
      <b>|</b>
      <a href='#'>MORE 更多商品&gt;</a>
      <span>精选</span>
    </div>
  `;
  ulJXEl.innerHTML += `
    <li>
      <div>
        <img src='${item.avatar}' />
        <div>
          <a href='#' title='${item.name}'>${item.name}</a>
          <p title='${item.brief}'>${item.brief}</p>
          <span>￥${item.price.toFixed(2)}</span>
          <i class='iconfont icon-cart'></i>
        </div>
      </div>
    </li>
  `;
});
mainJX.appendChild(ulJXEl);
})();

// 遍历shuguo
(function() {
  var mainSG = document.querySelector('main.main>.main-fruit'),
    ulSGEl = document.createElement('ul');

productList.filter(item => item.product === 'shuguo').forEach(item => {
  mainSG.innerHTML = `
    <div>
      <b>|</b>
      <a href='#'>MORE 更多商品&gt;</a>
      <span>蔬果</span>
    </div>
  `;
  ulSGEl.innerHTML += `
    <li>
      <div>
        <img src='${item.avatar}' />
        <div>
          <a href='#' title='${item.name}'>${item.name}</a>
          <p title='${item.brief}'>${item.brief}</p>
          <span>￥${item.price.toFixed(2)}</span>
          <i class='iconfont icon-cart'></i>
        </div>
      </div>
    </li>
  `;
});
mainSG.appendChild(ulSGEl);
})();

// 遍历shuichan
(function() {
  var mainSC = document.querySelector('main.main>.main-shuichan'),
    ulSCEl = document.createElement('ul');

productList.filter(item => item.product === 'shuichan').forEach(item => {
  mainSC.innerHTML = `
    <div>
      <b>|</b>
      <a href='#'>MORE 更多商品&gt;</a>
      <span>水产</span>
    </div>
  `;
  ulSCEl.innerHTML += `
    <li>
      <div>
        <img src='${item.avatar}' />
        <div>
          <a href='#' title='${item.name}'>${item.name}</a>
          <p title='${item.brief}'>${item.brief}</p>
          <span>￥${item.price.toFixed(2)}</span>
          <i class='iconfont icon-cart'></i>
        </div>
      </div>
    </li>
  `;
});
mainSC.appendChild(ulSCEl);
})();



