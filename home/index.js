// (function (){
//   // 创建script元素
// 	var dataScript = document.createElement("script");
//   var userName = Cookies.get("user");
// 	console.log("首页动态加载js:",Boolean(userName)?"即将动态加载js":"不动态加载js");
// 	dataScript.src="../assets/js/data.js";
// 	// 如果用户登录了,不要重置data.js
//   if(userName) return;
// 	// document.body.appendChild(dataScript);
// 	// 为了再取数据之前存入数据库 ---还是有bug 只能通过 onlocad解决了
// 	document.body.insertBefore(dataScript,document.getElementsByTagName("script")[0]);
// })();

// 获取banner数据
var bannerImages = JSON.parse(sessionStorage.getItem('data')).bannerImages,
    bannerEl = document.querySelector('.banner'),
    divEl = document.createElement('div'),
    bannerTimer = null,
    index = 0,
    count = 4,
    lock = false;
// 添加背景图片
bannerImages.forEach(item => {
  // console.log(item);
  divEl.innerHTML += `
    <span style='background-image: url(${item});'></span>
  `;
});
bannerEl.appendChild(divEl);

// 启动定时器
autoPlay();

// 轮播图切换上一张图片
bannerEl.querySelector('span.prev').onclick = () => slider(index - 1);
// 轮播图切换下一张图片
bannerEl.querySelector('span.next').onclick = () => slider(index + 1);

// 鼠标经过停止循环轮播
bannerEl.onmouseover = () => clearInterval(bannerTimer);
bannerEl.onmouseout = () => autoPlay();

// 定义定时器方法
function autoPlay() {
  bannerTimer = setInterval(() => {
    slider(index + 1);
  },5000);
}

// 定义一个滑动的方法
function slider(nextIndex) {
  if(lock) return;
  lock = true;
  divEl.style.transitionDuration = '0.5s';
  divEl.style.left = -nextIndex + '00%';
  if(nextIndex === count) index = 0;
  else if(-1 === nextIndex) index = count - 1;
  else index = nextIndex;
  setTimeout(() => {
    divEl.style.transitionDuration = '0s';
    if(count === nextIndex) { 
      divEl.style.left = '0';
    }
    if(-1 === nextIndex) {
      divEl.style.left = -(count - 1) + '00%';
    }
    lock = false;
  }, 520)
  
}








