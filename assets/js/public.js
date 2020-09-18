//公共提示插件
var Message = {
	alert: function(msg) {
		if(document.querySelector('.message-alert')) return;
		var div = document.createElement('div');
		div.className = "message-alert";
		div.style.position = "fixed";
		div.style.left = "0";
		div.style.top = '0';
		div.style.zIndex = '110';
		div.style.backgroundColor = "rgba(0,0,0,0.3)";
		div.style.width = "100%";
		div.style.height = "100%";
		div.innerHTML += `
			<div style="
			     min-width: 300px;
				 max-width: 400px;
				 position: absolute;
				 left: 50%;
				 top: 50%;
				 transform: translate(-50%,-50%);
				 background-image:url(../assets/img/skin_bg.png);
				 padding: 0 20px 20px 20px;
			">
			    <div style="
				     height: 58px;
					 width: 100%;
					 background: url(../assets/img/skin_title.png) no-repeat;
					 background-position: 14px 35px;
				">
				     <h2 style="
					    font-size: 16px;
					    padding: 30px 0 0 47px;
						height: 28px;
						line-height: 27px;
					 ">提示信息</h2>
					 <a href="javascript:/*artDialog*/;" style="display: inline; position: absolute;top: 6px;right: 8px;font-size: 22px;color:black">×</a>
				</div>
				
				<p style="text-indent: 2em; color: black; padding: 35px 10px; text-align: center;">${ msg }</p>
				<input type="button" value="确定"  class="btn-ok" style="
				    float:right;
					white-space: nowrap;
					padding: 0px 20px;
					height: 25px;
					line-height: 25px;
					color: #fff;
					font-size: 12px;
					cursor: pointer;
					background-color: #d31920;
					border: 0px;
					outline: 0px;
					margin-top: 20px;
					margin-right: 20px;
				"/>
			</div>
		`;
		document.body.appendChild(div);
		div.querySelector('a').onclick = function() {
			document.body.removeChild(div);
		};
		div.querySelector('input.btn-ok').onclick = function() {
			document.body.removeChild(div);
		};
	},
	confirm: function(msg, callback) {
		if(document.querySelector('.message-confirm')) return;
		var div = document.createElement('div');
		div.className = "message-confirm";
		div.style.position = "fixed";
		div.style.left = "0";
		div.style.top = '0';
		div.style.zIndex = '110';
		div.style.backgroundColor = "rgba(0,0,0,0.3)";
		div.style.width = "100%";
		div.style.height = "100%";
		div.innerHTML += `
			<div style="
			     min-width: 300px;
				 max-width: 400px;
				 position: absolute;
				 left: 50%;
				 top: 50%;
				 transform: translate(-50%,-50%);
				 background-image:url(../assets/img/skin_bg.png);
				 padding: 0 20px 20px 20px;
			">
			<div style="
			     height: 58px;
				 width: 100%;
				 background: url(../assets/img/skin_title.png) no-repeat;
				 background-position: 14px 35px;
			">
			     <h2 style="
				    font-size: 16px;
				    padding: 30px 0 0 47px;
					height: 28px;
					line-height: 27px;
				 ">提示信息</h2>
				 <a href="javascript:/*artDialog*/;" style="display: inline; position: absolute;top: 6px;right: 8px;font-size: 22px;color:black">×</a>
			</div>
				<p style="text-indent: 2em; color: black; padding: 35px 10px; text-align: left;">${ msg }</p>
				<input type="button" value="确定"  class="btn-ok" style="
				    float:left;
					white-space: nowrap;
					padding: 0px 20px;
					height: 25px;
					line-height: 25px;
					color: #fff;
					font-size: 12px;
					cursor: pointer;
					background-color: #d31920;
					border: 0px;
					outline: 0px;
					margin-top: 20px;
					margin-left: 55px;
				"/>
				<input type="button" value="取消"  class="btn-cancel" style="
				    float:right;
					white-space: nowrap;
					padding: 0px 20px;
					height: 25px;
					line-height: 25px;
					color: #fff;
					font-size: 12px;
					cursor: pointer;
					background-color: #d31920;
					border: 0px;
					outline: 0px;
					margin-top: 20px;
					margin-right: 55px;
				"/>
			</div>
		`;
		document.body.appendChild(div);
		div.querySelector('input.btn-ok').onclick = function() {
			document.body.removeChild(div);
			if(typeof callback === "function")  callback();
		};
		div.querySelector('input.btn-cancel').onclick = function() {
			document.body.removeChild(div);
		};
		div.querySelector('a').onclick = function() {
			document.body.removeChild(div);
		};
	},
	notice: function(msg) {
		var div = document.createElement('div');
		div.className = "message-notice";
		div.innerText = msg;
		div.style.position = "fixed";
		div.style.left = "50%";
		div.style.top = "50%";
		div.style.transform = "translate(-50%,-50%)";
		div.style.padding = "20px 20px";
		div.style.backgroundColor = "rgba(0,0,0,0.8)";
		div.style.color = "#fff";
		div.style.boxShadow = "0 0 5px 0px lightgray";
		div.style.zIndex = "110";
		document.body.appendChild(div);
		setTimeout(function() {
			document.body.removeChild(document.querySelector('.message-notice'));
		},1500);
	}
};
