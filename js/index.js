$(document).ready(function() {
	//点击登录按钮后  红色提醒按钮隐藏
	$(".denglu").click(function() {
		$(".warning").hide();
	});
	//			二级菜单点击过后 二级菜单消失  弹出弹框（页面除了弹框 其他的都加一层灰透明）
	$(".popup").click(function() {
		$(".elastic").show().delay(1800).hide(300);
		$(".alll").show().delay(2000).hide(300);
	});
	//点击输入账号密码后  红色提醒按钮隐藏
	$(".info").click(function() {
		$(".warning").hide();
	});

	// 给输入框添加时间，获取焦点时,将span标签中的内容设置成空
	$('.info').focus(function() {
		$(this).next().text('');
	})

	//	点击登录做账户密码是否为空判断
	$(".l_dl").click(function() {
		//			登录  账号密码不能为空
		let name = $('#username');
		let pwd = $('#password');
//		debugger;
		if(name.val().length === 0) {
			name.next().text('请输入用户名')
		}else if(pwd.val().length === 0) {
			pwd.next().text('请输入密码')
		} else {
			$(".main").hide();
			//	登录成功后 红色提示语隐藏
			$(".loginOn").show(function() {
				$(".warning").hide();
				location.href = 'http://test.vocsystem.cn/zgbd_hw_project/index/nav.html';
			});
		}

		//		gos();
	});

	//			当未登录状态时  上滑至登录模块弹出红色提示语

	//	进入大数据中心 嗯
	$(".enter-date").click(function() {
		var main = $(".main");
//		debugger;
		if(main.is(":hidden")) {
			window.location.href = "http://test.vocsystem.cn/zgbd_hw/zhhw.html?userid=2a5a6f40ffa80103701e7165535ad91d&username=%E4%BE%A8%E9%93%B6%E7%8E%AF%E4%BF%9D%E5%85%AC%E5%8F%B8&userpid=dg1168&roletype=null&industrytype=undefinedundefined&companyId=dg1168";
		} else {
			$(".warning").show();
		}
	});
	//	进入项目管理
	$(".warning-project").click(function() {
		var main = $(".main");
//		debugger;
		if(main.is(":hidden")) {
			window.location.href = "http://test.vocsystem.cn/zgbd_hw/zhhw.html?userid=2a5a6f40ffa80103701e7165535ad91d&username=%E4%BE%A8%E9%93%B6%E7%8E%AF%E4%BF%9D%E5%85%AC%E5%8F%B8&userpid=dg1168&roletype=null&industrytype=undefinedundefined&companyId=dg1168";
		} else {
			$(".warning").show();
		}
	});

	//	采购解决方案
	$(".warning-Purchase").click(function() {
		var main = $(".main");
//		debugger;
		if(main.is(":hidden")) {
			window.location.href = "http://test.vocsystem.cn/zgbd_hw/zhhw.html?userid=2a5a6f40ffa80103701e7165535ad91d&username=%E4%BE%A8%E9%93%B6%E7%8E%AF%E4%BF%9D%E5%85%AC%E5%8F%B8&userpid=dg1168&roletype=null&industrytype=undefinedundefined&companyId=dg1168";
		} else {
			$(".warning").show();
		}
	});
	//			车辆管理
	$(".warning-car").click(function() {
		var main = $(".main");
//		debugger;
		if(main.is(":hidden")) {
			window.location.href = "http://test.vocsystem.cn/zgbd_hw/zhhw.html?userid=2a5a6f40ffa80103701e7165535ad91d&username=%E4%BE%A8%E9%93%B6%E7%8E%AF%E4%BF%9D%E5%85%AC%E5%8F%B8&userpid=dg1168&roletype=null&industrytype=undefinedundefined&companyId=dg1168";
		} else {
			$(".warning").show();
		}
	});
	//			考勤
	$(".warning-Record").click(function() {
		var main = $(".main");
//		debugger;
		if(main.is(":hidden")) {
			window.location.href = "http://test.vocsystem.cn/zgbd_hw/zhhw.html?userid=2a5a6f40ffa80103701e7165535ad91d&username=%E4%BE%A8%E9%93%B6%E7%8E%AF%E4%BF%9D%E5%85%AC%E5%8F%B8&userpid=dg1168&roletype=null&industrytype=undefinedundefined&companyId=dg1168";
		} else {
			$(".warning").show();
		}
	});
	//			马上联系采购			
	$(".warning-contact").click(function() {
		var main = $(".main");
//		debugger;
		if(main.is(":hidden")) {
			window.location.href = "http://test.vocsystem.cn/zgbd_hw/zhhw.html?userid=2a5a6f40ffa80103701e7165535ad91d&username=%E4%BE%A8%E9%93%B6%E7%8E%AF%E4%BF%9D%E5%85%AC%E5%8F%B8&userpid=dg1168&roletype=null&industrytype=undefinedundefined&companyId=dg1168";
		} else {
			$(".warning").show();
		}
	});
	//			免费获取使用
	$(".warning-Obtain").click(function() {
		var main = $(".main");
//		debugger;
		if(main.is(":hidden")) {
			window.location.href = "http://test.vocsystem.cn/zgbd_hw/zhhw.html?userid=2a5a6f40ffa80103701e7165535ad91d&username=%E4%BE%A8%E9%93%B6%E7%8E%AF%E4%BF%9D%E5%85%AC%E5%8F%B8&userpid=dg1168&roletype=null&industrytype=undefinedundefined&companyId=dg1168";
		} else {
			$(".warning").show();
		}
	});
//	账户密码input点击边框变色
//	$("#username").click(function(){
//		$("#username").css("box-shadow","1px solid #4BB49D");
//	});
//	$("#password").click(function(){
//		$("#password").css("box-shadow","1px solid #4BB49D");
//	});
});