//如果不是从商品列表跳过的，默认主推id为1的商品
if(window.location.search.length === 0) var pid = 1;
else var pid = parseInt(window.location.search.slice(window.location.search.indexOf('=')+1));  
var product = JSON.parse(sessionStorage.getItem('data')).productList.find(function(item) { return item.id === pid; });

var userName = Cookies.get("user");
//动态渲染展示商品图片
var bannerImg = product.banner.split(",");
bannerImg.forEach(function(item,index) {
	(function() {
		var liEl = document.createElement('li');
		liEl.innerHTML += `
			 <div class="img-wrap">
				  <img src=${ item }>
			 </div>
	    `;
	    document.querySelector('ul.img-list').appendChild(liEl);
	})(item);
	
	(function() {
		var nliEl = document.createElement('li');
	    if(index === 0) { nliEl.className = "show"; }
		nliEl.innerHTML += `
			 <div class="img-wrap">
				  <img src=${ item }>
			 </div>
		`;
	    document.querySelector('ul.big-img-list').appendChild(nliEl);
	})(item,index);
});

// 商品图片详细展示
var i = 0; //记录移动到第几张,便于后面判断使用
var ulEl = document.querySelector('ul.img-list');
var liEls = ulEl.querySelectorAll('li');

document.querySelector('span.prev').onclick = function() {
	if(i === 0) return; //若移动到第一张，则返回；
	i--;
	ulEl.style.transform = `translateX(-${ i * 20}%)`;
};
document.querySelector('span.next').onclick = function() {
	if(i + 5 >= liEls.length) return;
	i++;
	ulEl.style.transform = `translateX(-${ i * 20}%)`;
};

liEls.forEach(function(item, i) {
	item.i = i;
	item.onclick = function() {
		//简单写法
		document.querySelector('ul.big-img-list>li.show').className = '';
		document.querySelectorAll('ul.big-img-list>li')[this.i].className = 'show';
		//复杂写法
		// var li = document.querySelectorAll('ul.big-img-list>li');
		// li.forEach(function(item2) {
		// 	item2.className = '';
		// });
		// li[this.i].className = 'show';
	};
});

document.querySelector('.big-img-list-wrapper').onmouseover = function() {
	var imgPath = this.querySelector('li.show img').src;
	var zoomEl = this.querySelector('.zoom');
	zoomEl.style.backgroundImage = `url(${ imgPath })`;
	var zoomBigEl = this.parentNode.querySelector('.zoom-big');
	zoomBigEl.style.backgroundImage = `url(${ imgPath })`;
	var width = this.getBoundingClientRect().width;
	var height = this.getBoundingClientRect().height;
	zoomEl.style.backgroundSize = `${ width - 2 }px ${ height - 2 }px`;
	var ratio = width / zoomEl.getBoundingClientRect().width;  //左边大盒子与小盒子的比例
	zoomBigEl.style.backgroundSize = `${ ratio * width - 2 }px ${ ratio * height - 2 }px`;
};

// 鼠标移动事件
//事件对象e中clientX和ClientY属性稳定性较好，但是是相对于浏览器的可视区域
document.querySelector('.big-img-list-wrapper').onmousemove = function(e) {
	// console.log(1);
	var zoomEl = this.querySelector('.zoom'),
	    zoomBigEl = this.parentNode.querySelector('.zoom-big'),
	    x, //距左边框的偏移量
		y, //距上边框的偏移量
		mouseX = e.clientX - this.getBoundingClientRect().left, //鼠标移动的位置
		mouseY = e.clientY - this.getBoundingClientRect().top,
		minX = zoomEl.getBoundingClientRect().width / 2, //最小值为
		minY = zoomEl.getBoundingClientRect().height / 2,
		maxX = this.getBoundingClientRect().width - minX,
		maxY = this.getBoundingClientRect().height - minY;
		
	if(mouseX <= minX) x = 0;
	else if(mouseX >= maxX) x = maxX - minX;
	else x = mouseX - minX;
	
	if(mouseY <= minY) y = 0;
	else if(mouseY >= maxY) y = maxY - minY;
	else y = mouseY - minY;
	
	zoomEl.style.left = `${ x }px`;
	zoomEl.style.top = `${ y }px`;
	zoomEl.style.backgroundPosition = `${ -x }px ${ -y }px`;
	// 后面的放大镜显示图片按照比例移动
	var ratio = this.getBoundingClientRect().width / zoomEl.getBoundingClientRect().width;
	zoomBigEl.style.backgroundPosition = `-${ ratio * x }px -${ ratio * y }px`;
};

// 商品详情信息动态展示
(function() {
	document.querySelector('.wrapper').innerHTML += `
	   <div class="title">
			<h5>${ product.name }</h5>
	   </div>
	   <div class="price-wrapper">
	        <span class="price">￥${ product.price }</span>
			<span class="red-cart">红卡会员价</span>
	   </div>
	   <div class="number v-middle">
	        <span>数量：</span>
	        <input type="button" value="-" class="btn-decrease" disabled="disabled"/>
	        <input type="text"  value="1" class="count" />
	        <input type="button" value="+" class="btn-increase" />
	   </div>
	   <div class="hint">
	       <dl>
			   <dt>发货门店</dt>
			   <dd>此货品将由 <a href="javascript:void(0);"><span class="gd30hstore">百联联华</span></a> 为您发货。</dd>
		   </dl>
	       <dl>
			   <dt>发货地</dt>
			   <dd>欧洲直发</dd>
		   </dl>
	       <dl>
			   <dt>发货时效</dt>
			   <dd>预计6-15个工作日发货，延迟发货慢必赔！<span class="look_btn" style="cursor:pointer;">查看详情 </span></dd>
		   </dl>
		   <dl>
			   <dt>温馨提示</dt>
			   <dd>本商品 有质量问题支持7天退换货</dd>
		   </dl>
	       <dl>
			   <dt>包邮政策</dt>
			   <dd>白金钻石顺丰包邮，注册用户满99元免邮</dd>
		   </dl>
	       <dl>
			   <dt>发票政策</dt>
			   <dd>海外商品暂不支持发票</dd>
		   </dl>
	   </div>
	   <div class="buy">
	       <div class="buy_btn">
	           <a href="../cart/cart.html" id="go-buy">
	              <span>立即购买</span>
	           </a>
		   </div>
		   <div class="add_car_btn">
			   <a class="goods_add_fav" href="javascript:void(0)">
				   <span>加入购物车</span>
				   <b></b>
			   </a>
		   </div>
	   </div>
	   <ul class="clearfix new-right-content" style="padding-bottom:20px;">
		   <li class="new-right-content-list">
				   <i class="zhp"></i>
				   <p class="new-right-content-text">100%正品保证</p>
		   </li>
		   <li class="new-right-content-list">
				   <i class="bs"></i>
				   <p class="new-right-content-text">商务部诚信企业</p>
		   </li>
		   <li class="new-right-content-list" style="margin-right: 0;">
				   <i class="wyshb"></i>
				   <p class="new-right-content-text">无忧售后保障</p>
		   </li>
	   </ul>
	`;
})();
// 水饺详细
detailInfo('sjdetail');
// 混沌详细
detailInfo('hddetail');



// 封装一个详细的信息方法
function detailInfo(productName) {
	// 商品信息详情页
(function() {
	// 水饺详情页
	var sjdetail = JSON.parse(sessionStorage.getItem('data')).productList.filter(item => item.product === productName && item.pid === pid);
	if(sjdetail.length > 0) {
		sjdetail.forEach(item => {
			document.querySelector('ul.tab-top').innerHTML += `
				<li>${item.name}</li>
			`;
			document.querySelector('ul.tab-bottom').innerHTML += `
				<li><img src='${item.avatar}' /></li>
			`;
		});
		document.querySelectorAll('ul.tab-top>li')[0].classList.add('show');
		document.querySelectorAll('ul.tab-bottom>li')[0].classList.add('show');
	}
})();
}

// 详情选项卡
(function() {

	var tabTopLis = document.querySelectorAll('ul.tab-top>li');
	tabTopLis.forEach(function(item, i) {
		item.onclick = function() {
			if(this.classList.contains('show')) return;
			// 先移除show
			document.querySelector('ul.tab-top>li.show').classList.remove('show');
			document.querySelector('ul.tab-bottom>li.show').classList.remove('show');
			// 点击的添加上show，之后对应的选项卡加上show
			this.classList.add('show');
			document.querySelectorAll('ul.tab-bottom>li')[i].classList.add('show');
		}
	});
})();


// 时间函数
var formatDateTime = function (date) { 　　　　　
　　　　 var y = date.getFullYear(); 
		var m = date.getMonth() + 1;  
			m = m < 10 ? ('0' + m) : m;  
		var d = date.getDate();  
			d = d < 10 ? ('0' + d) : d;  
		var h = date.getHours();  
			h=h < 10 ? ('0' + h) : h;  
		var minute = date.getMinutes();  
			minute = minute < 10 ? ('0' + minute) : minute;  
		var second=date.getSeconds();  
			second=second < 10 ? ('0' + second) : second;  
		return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second; 
};

//数量加减功能
var count = 1;
// 数量控制
(function() {
	var btnDecrease = document.querySelector('.number>input.btn-decrease');
	var btnIncrease = document.querySelector('.number>input.btn-increase');
	var inputCount = document.querySelector('.number>input.count');
	var maxCount = 5;
	
	btnDecrease.onclick = function() {
		btnIncrease.disabled = false;
		inputCount.value = --count;
		this.disabled = count === 1;
	};
	
	btnIncrease.onclick = function() {
		btnDecrease.disabled = false;
		inputCount.value = ++count;
		this.disabled = count === maxCount;
	};
	inputCount.onfocus = function() {
		this.oldValue = this.value;
	};
	inputCount.onkeyup = function(e) {
		if((e.keyCode < 48 || e.keyCode > 57) && e.keyCode !== 8) { this.value = this.oldValue; }
		else this.oldValue = this.value;
	};
	
	inputCount.onblur = function() {
		if(this.value.length === 0) this.value = 1;
		if(parseInt(this.value) < 1) this.value = 1;
		if(parseInt(this.value) > maxCount) this.value = 5;
		count = parseInt(this.value);
		btnDecrease.disabled = count === 1;
		btnIncrease.disabled = count === 5;
	};
})();


// 封装一个函数,更新当前购物车的总金额和总数量
// function updateTotalAndAccount() {
//   var trs = document.querySelectorAll('.aside>.aside-right>.cart>.cart-top>.cart-list>table>tbody>tr');
//   var total = 0,
//       account = 0;
//   trs.forEach(function(tr) {
//     if(tr.dataset.checked === '1') {
//       total += parseInt(tr.dataset.count);
//       account += parseFloat(tr.dataset.price) * parseInt(tr.dataset.count);
//     }
//   })
//   document.querySelector('.aside>.aside-left>ul>li.cart>a>b').innerText = total;
//   document.querySelector('.aside>.aside-right>.cart>.cart-bottom>.cart-account-wrapper>span.account').innerText = total;
//   document.querySelector('.aside>.aside-right>.cart>.cart-bottom>.cart-account-wrapper>span.total').innerText = account.toFixed(2);
// }

//加入购物车
document.querySelector('.add_car_btn').onclick = function() {
	if(typeof userName === "undefined") {
		Cookies.set("backUrl", window.location.href);
		window.location.href = "../login/login.html"; //跳转到登录页
		return;
	}
	//如果登录了
	var data = JSON.parse(sessionStorage.getItem('data'));
	var index = data.cartList.findIndex(function(item) {
		return item.name === userName && item.pid === pid;
	});
	if(index === -1) {  //这个商品当前登录的用户对应的购物车里没有
		var obj = {
			id: data.cartList.length > 0 ? data.cartList[data.cartList.length - 1].id + 1 : 1,
			name: userName,
			pid: pid,
			count: count,
		};
		data.cartList.push(obj);
	} else {
		if(data.cartList[index].count + count > 5) {
			Message.notice("当前商品在购物车中已达到购物上限！");
			return;
		}
		data.cartList[index].count += count;
	}
	sessionStorage.setItem("data",JSON.stringify(data)); 
	// updateTotalAndAccount();
	Message.notice('商品成功加入购物车，快去结算吧');
	setTimeout(function() {

		asideCart();
	},100);
};




