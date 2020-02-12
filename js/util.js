var root="http://127.0.0.1:8080/zgbd_hw/";
var vocroot="/zgbd_voc/";

var isship=false;
var isdevelop=true;//开发人员模式,发布请改为false;

var isbenniu=false;/*是否奔牛版本*/
/**
* 获取地址栏参数
*
* 
*/
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     
     var r = window.location.search.substr(1).match(reg);
     
     if(r!=null)return  decodeURI(r[2]); return null;//unescape
}

/**
* @name     :
* @author   :Hunn
* @explain  :cookie 操作
*/
/* 设置cookie */
function setCookie(name, value, time) {
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
//    console.log(name+":"+value);
//    console.log(name+":"+decodeURI(value));
//    console.log(name+":"+encodeURI(value));
    if(document.domain.indexOf("localhost") >-1 || document.domain.indexOf("127.0.0.1") >-1 || document.domain.indexOf("10") >-1 )
    {
    	 console.log(document.domain);
    	 document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()+";";//
    }
    else
    {
    	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()+";Domain=vocsystem.cn;path=/;";//
    }
//    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()+";";//Domain=vocsystem.cn;path=/;
}

//读取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)){
    	console.log(arr[2]);
    	console.log(unescape(unescape(arr[2])));
        return unescape(arr[2]);
    }
    else{
        return "";
    }
}

//删除cookies
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null){
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}


function getsec(str) {
     
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s"){
        return str1 * 1000;
    }else if (str2 == "m"){
        return str1 * 60 * 1000;
    } else if (str2 == "h"){
        return str1 * 60 * 60 * 1000;
    } else if (str2 == "d"){
        return str1 * 24 * 60 * 60 * 1000;
    }
}

function JsonToString(jsonarr){
	return JSON.stringify(jsonarr); //可以将json对象转换成json对符串 
}

function StringToJson(jsonstr){
	var ss;
	try{
		ss=JSON.parse(jsonstr); 
	}catch(e){
		console.log("StringToJson:"+e+"__json:"+jsonstr);
	}
	return ss; //可以将json字符串转换成json对象 
}

function toDecimal(x) { 
	var f = parseFloat(x); 
	if (isNaN(f)) { 
	return; 
	} 
	f = Math.round(x*100)/100; 
	return f; 
	} 
function toDecimal1(x) { 
	var f = parseFloat(x); 
	if (isNaN(f)) { 
	return; 
	} 
	f = Math.round(x*10)/10; 
	return f; 
	} 

/** 2个时间相差的天数
 * @param s1
 * @param s2
 * @returns
 */
function getDay(s1,s2){
	try {
		s1 = new Date(s1.replace(/-/g, "/"));
		s2 = new Date(s2.replace(/-/g, "/"));
		var days = s2.getTime() - s1.getTime();
		var time = parseInt(days / (1000 * 60 * 60 * 24));
	} catch (e) {
		console.log("getDay:"+s1+"-"+s2);
	}
	return time;
}

var userInfo = new Object();
var logintime=5;
function getUser(){
	
	
	var cookies=getCookie("userinfo");
	userInfo["userpid"]=GetQueryString("userpid");
	userInfo["userid"]=GetQueryString("userid");
	userInfo["username"]=GetQueryString("username");
	userInfo["rightid"]=GetQueryString("rightid");
	userInfo["roletype"]=GetQueryString("roletype");
	userInfo["industrytype"]=GetQueryString("industrytype");
	userInfo["companyId"]=StringToJson(cookies).companyId;

	
	return userInfo;

	//alert(cookies);
	if(cookies==""){
		layer.alert('登陆回话已超时，请重新登陆！5秒后自动跳转到登陆页！', {closeBtn: 0,icon: 5}); 
		goLoginTime();
		return null;
	}
	var json=StringToJson(cookies);
	userInfo=json;
	return json;
}

function goLoginTime(){
	setTimeout(function(){
		$(".layui-layer-content").html("<i class=\"layui-layer-ico layui-layer-ico5\"></i>登陆回话已超时，请重新登陆！"+ logintime +"秒后自动跳转到登陆页！");
		logintime--;
		if(logintime<0){
			window.location.href="/zgbd_hw/loginzhhw.html";//vocsystem.cn
		}
		else{
			goLoginTime();
		}			
	},1000);
}

/**跟现在时间相差天数
 * @param s1
 * @returns
 */
function getDayWithNow(s1){
	try {
		s1 = new Date(s1.replace(/-/g, "/"));
		var s2 = new Date();
		var days =  s1.getTime()-s2.getTime();
		var time = parseInt(days / (1000 * 60 * 60 * 24));
	} catch (e) {
		console.log("getDayWithNow:"+s1);
	}
	return time;
}

function downloadFile(url){
	var form=$("<form>");//定义form表单,通过表单发送请求
    form.attr("style","display:none");//设置为不显示
    form.attr("target","");
    form.attr("method","get");//设置请求类型
	//替换域名
	if(url.indexOf('zhhw.gzqiaoyin.com')!= -1){
		url=url.replace('zhhw.gzqiaoyin.com','vocsystem.cn');
	}
    form.attr("action",url);//设置请求路径
    $("body").append(form);//添加表单到页面(body)中
    form.submit();//表单提交
    form.remove();
}

function isArray(o){
	return Object.prototype.toString.call(o)=='[object Array]';
}

/*layer msg*/
function lmsg(content,time){
	var t=2;
	if(time)
		t=time;
	layer.open({
	    content: content
	    ,skin: 'msg'
	    ,time: t //2秒后自动关闭
	  });
}
function lmsgd(content){
	layer.msg(content);
}

/*layer alert*/
function lalert(content,title){
	if(!title)
		title="确定";
	layer.open({
	    content: content
	    ,btn: title
	  });
}
function lload(type){
	//加载层
	layer.load(type);
}

/*layer关闭指定*/
function lclose(index){
	layer.close(index);
}
/*layer关闭最新*/
function lcloseNew(){
	layer.close(layer.index);
}

function lcloseimport(that){
	$(that).parents('.layui-layer-page').remove();
}

/*layer关闭所有*/
function lcloseAll(){
	layer.closeAll();
}

/*ajax post方法*/
function postAjax(url,func,efunc,cfunc){
	var u=url.split("?");
	var sdata={};
	if(u.length>1){
		var d=u[1].split("&");
		for ( var i = 0; i < d.length; i++) {
			var da=d[i].split("=");
			sdata[da[0]]=da[1];
		}
	}
	$.ajax({  
		type: "POST",  
		url: u[0],  
		//timeout : 30000,
		data: sdata,  
		dataType: 'json',  
		success: function(data){ 
			func(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			 console.log(XMLHttpRequest.status+"-"+XMLHttpRequest.readyState+"-"+textStatus);
			 if(textStatus=='timeout'){
				 try {
					 lalert("网络不给力呀","我去看看");
				} catch (e) {
					alert("网络不给力呀");
					// TODO: handle exception
				}
			 }
			 if(efunc)
				 efunc();
		},
		complete: function(XMLHttpRequest, textStatus) {
			if(cfunc)
				cfunc();
		}
	}); 
}

/*ajax post方法*/
function postAjaxData(url,data,func,efunc,cfunc){
//	console.log(url);
	$.ajax({  
		type: "POST",  
		url: url,  
		//timeout : 30000,
		data: data,  
		dataType: 'json',  
		success: function(data){ 
			func(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			 console.log(XMLHttpRequest.status+"-"+XMLHttpRequest.readyState+"-"+textStatus);
			 if(textStatus=='timeout'){
				 try {
					 lalert("网络不给力呀","我去看看");
				} catch (e) {
					alert("网络不给力呀");
					// TODO: handle exception
				}
			 }
			 if(efunc)
				 efunc();
		},
		complete: function(XMLHttpRequest, textStatus) {
			if(cfunc)
				cfunc();
		}
	}); 
}


function Right(){ 
	this.add = "hide"; //新增
	this.del = "hide"; //删除
	this.edit = "hide"; //修改
	this.toexamine = "hide"; //审核
	this.todispatch="hide";//调度
	this.todispatchbegin="hide";//调度派车登记
	this.todispatchend="hide";//调度收车登记
	this.toaccount="hide";//车辆入账登记
	this.rolelink="hide";//角色分配登记
	this.userlink="hide";//用户分配登记
	this.rightlink="hide";//权限分配登记
	this.userlinkget="hide";
	this.rolelinkget="hide";
	this.rightlinkget="hide";
	this.daymilleage ="show";
	this.simulationdata="hide";
	this.organmove="hide";
	this.vehiclemove="hide";
	this.videos="hide";//视频监控
	this.instruct="hide";//指令
	this.setlimit="hide";//车辆非工作日和超速设置
	this.vehicleinfoedit="hide";//监控模块车辆详情编辑
	this.setuservehicle="hide";//分配用户车辆
	this.monitorline="hide";//监控轨迹线
	this.vehicletermin = "hide"; //监控列表是否显示终端号和sim卡号
	this.reject = "hide"; //驳回
	this.submit = "hide"; //提交
	this.adaptervehicle = "hide"; //保养管理 适配车辆权限
	this.startorstop = "hide"; //保养管理 启用停用权限
	} 

var rightid;//父权限id
var userid;
var userpid;
var roleid;
var username;
var rightdata;
function getrightbypid(pid,userid,addbtn,delbtn,editbtn) {
	try
    {
		rightdata = new Right(); 
//    	$("."+addbtn).hide();
//    	$("."+delbtn).hide();
//    	$("."+editbtn).hide();
		if(pid=="all"){			
				rightdata.add="";
				$("."+addbtn).show();			
				rightdata.del="";
				$("."+delbtn).show();			
				rightdata.edit="";
				$("."+editbtn).show();	
				
				rightdata.toexamine="";
				rightdata.todispatch="";
				rightdata.todispatchbegin="";
				rightdata.todispatchend="";
				rightdata.toaccount="";
				rightdata.rolelink="";
				rightdata.userlink="";
				rightdata.rightlink="";
				rightdata.rolelinkget="";
				rightdata.userlinkget="";
				rightdata.rightlinkget="";
				rightdata.daymilleage="";
				rightdata.simulationdata="";
				rightdata.organmove="";
				rightdata.vehiclemove="";
				rightdata.videos="";
				rightdata.instruct="";
				$(".edit-instruct").show();
				rightdata.setlimit="";
				rightdata.vehicleinfoedit="";
				rightdata.setuservehicle="";
				rightdata.monitorline="";
				rightdata.vehicletermin = "";
				rightdata.reject = "";
				rightdata.submit = "";
				rightdata.adaptervehicle = "";
				rightdata.startorstop = "";
			return;
		}
        $.ajax
        ({

                type: "Post",
              //服务器改成这个
                url: vocroot+"index/getRightByPid.action?pid="+pid+"&userid="+userid,
                //url: "http://127.0.0.1:8080/zgbd_voc/index/getRightByPid.action?pid="+pid+"&userid="+userid,
                dataType: "json",
                success: function (data) {
                //alert(data);
                	 try{
                	if(data!=""){
                		for(var i=0;i<data.length;i++){
                			var rightno=data[i].rightNo.split("_");
                			var no=rightno[rightno.length-1];
                			
                			if(no=="add"){
                				rightdata.add="";
                				$("."+addbtn).show();
                			}
                			if(no=="del"){
                				rightdata.del="";
                				$("."+delbtn).show();
                			}
                			if(no=="edit"){
                				rightdata.edit="";
                				$("."+editbtn).show();
                			}
                			if(no=="toexamine"){
                				rightdata.toexamine="";
                				//$("."+examinebtn).show();
                			}
                			if(no=="todispatch"){
                				rightdata.todispatch="";
                			}
                			if(no=="todispatchbegin"){
                				rightdata.todispatchbegin="";
                			}
                			if(no=="todispatchend"){
                				rightdata.todispatchend="";
                			}
                			if(no=="toaccount"){
                				rightdata.toaccount="";
                			}
                			if(no=="rolelink"){
                				rightdata.rolelink="";
                			}
                			if(no=="userlink"){
                				rightdata.userlink="";
                			}
                			if(no=="rightlink"){
                				rightdata.rightlink="";
                			}
                			if(no=="rolelinkget"){
                				rightdata.rolelinkget="";
                			}
                			if(no=="userlinkget"){
                				rightdata.userlinkget="";
                			}
                			if(no=="rightlinkget"){
                				rightdata.rightlinkget="";
                			}
                			if(no=="daymilleage"){
                				rightdata.daymilleage="";
                			}
                			if(no=="simulation"){
                				rightdata.simulationdata="";
                			}
                			if(no=="organmove"){
                				rightdata.organmove="";
                			}
                			if(no=="vehiclemove"){
                				rightdata.vehiclemove="";
                			}
                			if(no=="videos"){
                				rightdata.videos="";
                			}
                			if(no=="instruct"){
                				rightdata.instruct="";
                				$(".edit-instruct").show();
                			}
                			if(no=="setlimit"){
                				rightdata.setlimit="";
                			}
                			if(no=="vehicleinfoedit"){
                				rightdata.vehicleinfoedit="";
                			}
                			if(no=="setuservehicle"){
                				rightdata.setuservehicle="";
                			}
                			if(no=="monitorline"){
                				rightdata.monitorline="";
                			}
                			if(no == "vehicletermin")
							{
								rightdata.vehicletermin ="";
							}
							if(no == "reject")
							{
								rightdata.reject ="";
							}
							if(no == "submit")
							{
								rightdata.submit ="";
							}
							if(no == "adaptervehicle")
							{
								rightdata.adaptervehicle="";
							}
							if(no == "startorstop")
							{
								rightdata.startorstop ="";
							}
                			
                			
                		}
                	  }
                	console.log(rightdata);
                	 rightSuccess();
                	 }catch(ee){
                  	   alert(ee);
                     }
					
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("出错了:"+errorThrown);
                }
            });
            }
            catch(er)
            {alert(er);}
    }

/*更多菜单的隐藏*/
/*$(document).click(function(){
    $(".morediv").remove();
});*/

function HashTable() {
    var size = 0;
    var entry = new Object();
    this.add = function (key, value) {
        if (!this.containsKey(key)) {
            size++;
        }
        entry[key] = value;
    }
    this.getValue = function (key) {
        return this.containsKey(key) ? entry[key] : null;
    }
    this.remove = function (key) {
        if (this.containsKey(key) && (delete entry[key])) {
            size--;
        }
    }
    this.containsKey = function (key) {
        return (key in entry);
    }
    this.containsValue = function (value) {
        for (var prop in entry) {
            if (entry[prop] == value) {
                return true;
            }
        }
        return false;
    }
    this.getValues = function () {
        var values = new Array();
        for (var prop in entry) {
            values.push(entry[prop]);
        }
        return values;
    }
    this.getKeys = function () {
        var keys = new Array();
        for (var prop in entry) {
            keys.push(prop);
        }
        return keys;
    }
    this.getSize = function () {
        return size;
    }
    this.clear = function () {
        size = 0;
        entry = new Object();
    }
}


//--时间事件开始
function getNowFormatDate(addDayCount) {
  var date = new Date();
  date.setDate(date.getDate() + addDayCount);//获取AddDayCount天后的日期
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var strHours = date.getHours();
  var strMinutes = date.getMinutes();
  var strSeconds = date.getSeconds();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  if (strHours >= 0 && strHours <= 9) {
      strHours = "0" + strHours;
  }
  if (strMinutes >= 0 && strMinutes <= 9) {
      strMinutes = "0" + strMinutes;
  }
  if (strSeconds >= 0 && strSeconds <= 9) {
      strSeconds = "0" + strSeconds;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      + " " + strHours + seperator2 + strMinutes
      + seperator2 + strSeconds;
  return currentdate;
}

//获得本月的开始日期 
function getMonthStartDate(month){ 
	var monthStartDate = new Date(month.substr(0,4), month.substr(5,2)-1, 1); 
	return formatDate(monthStartDate); 
} 

//获得本月的结束日期 
function getMonthEndDate(month){ 
	var monthEndDate = new Date(month.substr(0,4), month.substr(5,2)-1, getMonthDays(month.substr(0,7))); 
	return formatDate(monthEndDate); 
}
//获得某月的天数 
function getMonthDays(month){ 
var monthStartDate = new Date(month.substr(0,4), month.substr(5,2)-1, 1); 
var monthEndDate = new Date(month.substr(0,4), parseInt(month.substr(5,2)), 1); 
var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24); 
return days; 
} 
//获取某月天数
function getDaysInOneMonth(year, month){ 
	 month = parseInt(month, 10); 
	 var d= new Date(year, month, 0); 
	 return d.getDate(); 
	}
//格式化日期：yyyy-MM-dd 
function formatDate(date) { 
	var myyear = date.getFullYear(); 
	var mymonth = date.getMonth()+1; 
	var myweekday = date.getDate(); 
	
	if(mymonth < 10){ 
	mymonth = "0" + mymonth; 
	} 
	if(myweekday < 10){ 
	myweekday = "0" + myweekday; 
	} 
	return (myyear+"-"+mymonth + "-" + myweekday); 
} 

function sjcha(startdate,enddate){
	var date1=new Date(Date.parse(startdate.replace(/-/g,  "/")));
	//var date1=startdate;  //开始时间
	//alert("aa");
	var date2=new Date(Date.parse(enddate.replace(/-/g,  "/")));
	//var date2=enddate;    //结束时间
	var date3=date2.getTime()-date1.getTime();  //时间差的毫秒数
	 
	//计算出相差天数
	var days=Math.floor(date3/(24*3600*1000));
	 

	//计算出小时数
	var leave1=date3%(24*3600*1000);    //计算天数后剩余的毫秒数
	var hours=Math.floor(leave1/(3600*1000));
	//计算相差分钟数
	var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
	var minutes=Math.floor(leave2/(60*1000));

	 
	//计算相差秒数
	var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
	var seconds=Math.round(leave3/1000);
	//console.log(days+"-"+hours+"-"+minutes+"-"+seconds);
	var sjsum=seconds+minutes*60+hours*60*60+days*60*60*24;
	
	return sjsum;
}

function getTimeWithStamps(str){
	var unixTimestamp = new Date(str); //然后 
	var commonTime = unixTimestamp.Format("yyyy-MM-dd hh:mm:ss");    
	//var commonTime = unixTimestamp.toLocaleString("yyyy-MM-dd HH:mm:ss");
	return commonTime;
	//return Math.round(new Date("2018-08-16 00:00:00").getTime())
}

/**
 * 时间秒数格式化
 * @param s 时间戳（单位：秒）
 * @returns {*} 格式化后的时分秒
 */
function sec_to_time(s) {
    var t;
    if(s > -1){
        var hour = Math.floor(s/3600);
        var min = Math.floor(s/60) % 60;
        var sec = s % 60;
        if(hour < 10) {
            t = '0'+ hour + ":";
        } else {
            t = hour + ":";
        }

        if(min < 10){t += "0";}
        t += min + ":";
        if(sec < 10){t += "0";}
        t += sec.toFixed(0);
    }
    return t;
}
function time_to_sec(time) {
	try{
	if(time!=""){
		var times=time.split(":");
		var h=times[0];
		var m=times[1];
		var s=times[2];
		return parseInt(h*3600)+parseInt(m*60)+parseInt(s)-1;
	}
	return 0;
	}catch(e){
		return 0;
	}
}

function bytesToSize(bytes) {
    if (bytes === 0) return '0 B';
     var k = 1024;
     sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
     i = Math.floor(Math.log(bytes) / Math.log(k));
	return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]; 
    //toPrecision(3) 后面保留一位小数，如1.0GB                                                                                                                  //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

/*------- 全屏事件开始 -------*/
function requestFullScreen(element) {
	// 判断各种浏览器，找到正确的方法
	var requestMethod = element.requestFullScreen || //W3C
	element.webkitRequestFullScreen || //Chrome等
	element.mozRequestFullScreen || //FireFox
	element.msRequestFullScreen; //IE11

	if (requestMethod) {
		requestMethod.call(element);

	}
	else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
		var wscript = new ActiveXObject("WScript.Shell");
		if (wscript !== null) {
			wscript.SendKeys("{F11}");
		}
	}
}

function exitFull() {
	try
	{
		// 判断各种浏览器，找到正确的方法
		var exitMethod = document.exitFullscreen || //W3C
		document.mozCancelFullScreen || //Chrome等
		document.webkitExitFullscreen || //FireFox
		document.webkitExitFullscreen; //IE11
		if (exitMethod) {
			exitMethod.call(document);
		}
		else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
			var wscript = new ActiveXObject("WScript.Shell");
			if (wscript !== null) {
				wscript.SendKeys("{F11}");
			}
		}
	}
	catch(es)
	{
		console.log(es);
	}
}   
/*------- 全屏事件结束 -------*/

/*
 * 
 */
/*------- 全屏事件结束 -------*/

/*-------- 地图定位开始 ----------*/
var citypoint={lng:113.27,lat:23.13};
/*城市名居中*/
function centerCity(organid){
	try{
		
	var json=loaddefault(organid);//getCookie("userinfo");
	if(json==null)
		return;
//	console.log(json);
	//var json=StringToJson(userinfo);
	if(json.lon&&json.lat){
	 if((json.lon!=""&&json.lat!="")&&(paseFloat(json.lon)>0&&paseFloat(json.lat))){
		 //console.log("json:"+json);
		 var point =new AMap.LngLat(json.lon,json.lat);
		 //console.log("center:"+point);
		 citypoint={lng:json.lon,lat:json.lat};
		 map.setCenter(point);
		 }
	}
	}catch(e){
		console.log("centerCity:"+e);
	}
}
function loaddefault(userpid){
	var da=null;
 	$.ajax({  
		 type: "POST",  
		 url: "/zgbd_voc/setting/getSettingWithID.action?id="+userpid,  
		 dataType: 'json',  
	     async: false,
		 success: function(data){ 
			 console.log(data);
		 	if(data!=""){
		 		da=data;
		 	}
    	}  
	 });  
 	return da;
}
/*-------- 地图定位结束 ----------*/



//对Date的扩展，将 Date 转化为指定格式的String   
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
//例子：   
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function(fmt)   
{ //author: meizz   
var o = {   
 "M+" : this.getMonth()+1,                 //月份   
 "d+" : this.getDate(),                    //日   
 "h+" : this.getHours(),                   //小时   
 "m+" : this.getMinutes(),                 //分   
 "s+" : this.getSeconds(),                 //秒   
 "q+" : Math.floor((this.getMonth()+3)/3), //季度   
 "S"  : this.getMilliseconds()             //毫秒   
};   
if(/(y+)/.test(fmt))   
 fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
for(var k in o)   
 if(new RegExp("("+ k +")").test(fmt))   
fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
return fmt;   

}   
/*------- 全屏事件结束 -------*/

/*
 * 
 */
/*------- 全屏事件结束 -------*/

/*-------- 地图定位开始 ----------*/
var citypoint={lng:113.27,lat:23.13};
/*城市名居中*/
function centerCity(organid){
	try{
		
	var json=loaddefault(organid);//getCookie("userinfo");
	if(json==null)
		return;
//	console.log(json);
	//var json=StringToJson(userinfo);
	if(json.lon&&json.lat){
	 if((json.lon!=""&&json.lat!="")&&(paseFloat(json.lon)>0&&paseFloat(json.lat))){
		 //console.log("json:"+json);
		 var point =new AMap.LngLat(json.lon,json.lat);
		 //console.log("center:"+point);
		 citypoint={lng:json.lon,lat:json.lat};
		 map.setCenter(point);
		 }
	}
	}catch(e){
		console.log("centerCity:"+e);
	}
}
function loaddefault(userpid){
	var da=null;
 	$.ajax({  
		 type: "POST",  
		 url: "/zgbd_voc/setting/getSettingWithID.action?id="+userpid,  
		 dataType: 'json',  
	     async: false,
		 success: function(data){ 
			 console.log(data);
		 	if(data!=""){
		 		da=data;
		 	}
    	}  
	 });  
 	return da;
}
/*-------- 地图定位结束 ----------*/

//下载事件
function downloadFilevoc(url) { 
	
    try{ 
        var elemIF = document.createElement("iframe");   
        elemIF.src = url;   
        elemIF.style.display = "none";   
        document.body.appendChild(elemIF);   
    }catch(e){ 
    	//alert(e);
    } 
}

function timeTostring(time){
	//var date3=date2.getTime()-date1.getTime();  //时间差的毫秒数

	 
	//计算出相差天数
	var days=Math.floor(time/(24*3600));
	 

	//计算出小时数
	var leave1=time%(24*3600);    //计算天数后剩余的毫秒数
	var hours=Math.floor(leave1/(3600));
	//计算相差分钟数
	var leave2=leave1%(3600);        //计算小时数后剩余的毫秒数
	var minutes=Math.floor(leave2/(60));

	 
	//计算相差秒数
	var leave3=leave2%(60);      //计算分钟数后剩余的毫秒数
	var seconds=Math.round(leave3);
	var str="";
	if(days>=1)
		str+=days+"天";
	if(hours>=1)
		str+=hours+"小时";
	if(minutes>=1)
		str+=minutes+"分钟";
	if(seconds>=1)
		str+=seconds+"秒";
	return str;
}

function le(l){
	var jmz = {};
	jmz.GetLength = function(str) {
		if(str)
			return str.replace(/[\u0391-\uFFE5]/g,"AA").length;  //先把中文替换成两个字节的英文，在计算长度
		else
			return 8;
	};  
	var le=jmz.GetLength(l);
	return le*6.3;	
}

//环卫tab分页
function initTabHW(func){
	$(".hw_s_tab_li").click(function(){	
		
		if(!$(this).hasClass("active")){
			$(this).addClass("active").siblings().removeClass("active");
		}
		else{
			return;
		}
		var id=$(this).data("id");
		$(".hw_s_tab_li_c .hw_s_tab_li_c_li").each(function(){
		    var tid=$(this).data("id");
		    
		    if(tid==id){
		    	$(this).addClass("active").siblings().removeClass("active");
		    	
		    	try {
		    		func();
				} catch (e) {
					// TODO: handle exception
				}
		    	
//		    	if($(this).data("id")=="hw_tab2"){
//		    		
//				}
		    	return true;
		    }
		  });
	});
}

function islogin()
{
//	setCookie("hwstatus", "ss", "d1");
	var cookies=getCookie("userinfo");
//	console.log(cookies);
	//alert(cookies);
	if(cookies==""){
		layer.alert('登陆回话已超时，请重新登陆！5秒后自动跳转到登陆页！', {closeBtn: 0,icon: 5}); 
		goLoginTime();
	}
}

/**
* 获取本周、本季度、本月、上月的开始日期、结束日期
*/
var now = new Date(); //当前日期
var nowDayOfWeek = now.getDay(); //今天本周的第几天
var nowDay = now.getDate(); //当前日
var nowMonth = now.getMonth(); //当前月
var nowYear = now.getYear(); //当前年
nowYear += (nowYear < 2000) ? 1900 : 0; //

var lastMonthDate = new Date(); //上月日期
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth()-1);
var lastYear = lastMonthDate.getYear();
var lastMonth = lastMonthDate.getMonth();

//格式化日期：yyyy-MM-dd
function formatDate(date) {
var myyear = date.getFullYear();
var mymonth = date.getMonth()+1;
var myweekday = date.getDate();

if(mymonth < 10){
mymonth = "0" + mymonth;
}
if(myweekday < 10){
myweekday = "0" + myweekday;
}
return (myyear+"-"+mymonth + "-" + myweekday);
}

//格式化日期：yyyy-MM-dd
function formatTime(date) {
var myyear = date.getFullYear();
var mymonth = date.getMonth()+1;
var myweekday = date.getDate();
var strHours = date.getHours();
var strMinutes = date.getMinutes();
var strSeconds = date.getSeconds();
if(mymonth < 10){
mymonth = "0" + mymonth;
}
if(myweekday < 10){
myweekday = "0" + myweekday;
}
if(strHours < 10){
	strHours = "0" + strHours;
	}
if(strMinutes < 10){
	strMinutes = "0" + strMinutes;
	}
if(strSeconds < 10){
	strSeconds = "0" + strSeconds;
	}
return (myyear+"-"+mymonth + "-" + myweekday +" "+strHours+":"+strMinutes+":"+strSeconds);
}

//获得某月的天数
function getMonthDays(myMonth){
var monthStartDate = new Date(nowYear, myMonth, 1);
var monthEndDate = new Date(nowYear, myMonth + 1, 1);
var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24);
return days;
}

//获得本季度的开始月份
function getQuarterStartMonth(){
var quarterStartMonth = 0;
if(nowMonth<3){
quarterStartMonth = 0;
}
if(2<nowMonth && nowMonth<6){
quarterStartMonth = 3;
}
if(5<nowMonth && nowMonth<9){
quarterStartMonth = 6;
}
if(nowMonth>8){
quarterStartMonth = 9;
}
return quarterStartMonth;
}

//获得本周的开始日期
function getWeekStartDate() {
var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
return formatDate(weekStartDate);
}
//获得本周的开始时间
function getWeekStartTime() {
var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
return formatDate(weekStartDate)+" 00:00:00";
}

//获得本周的结束日期
function getWeekEndDate() {
var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 6);
return formatDate(weekEndDate);
}
//获得本周的结束时间
function getWeekEndTime() {
	var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 6);
return formatDate(weekEndDate)+" 23:59:59";
}

//获得本月的开始日期
function getMonthStartDate(){
var monthStartDate = new Date(nowYear, nowMonth, 1);
return formatDate(monthStartDate);
}
//获得本月的开始时间
function getMonthStartTime(){
var monthStartDate = new Date(nowYear, nowMonth, 1);
return formatDate(monthStartDate)+" 00:00:00";
}

//获得本月的结束日期
function getMonthEndDate(){
var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
return formatDate(monthEndDate);
}

//获得本月的结束时间
function getMonthEndTime(){
var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
return formatDate(monthEndDate)+" 23:59:59";
}
//获得上月开始日期
function getLastMonthStartDate(){
var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
return formatDate(lastMonthStartDate);
}
//获得上月开始时间
function getLastMonthStartTime(){
var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
return formatDate(lastMonthStartDate)+" 00:00:00";
}

//获得上月结束日期
function getLastMonthEndDate(){
var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
return formatDate(lastMonthEndDate);
}
//获得上月结束时间
function getLastMonthEndTime(){
var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
return formatDate(lastMonthEndDate)+" 23:59:59";
}

//获得本季度的开始日期
function getQuarterStartDate(){

var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
return formatDate(quarterStartDate);
}

//或的本季度的结束日期
function getQuarterEndDate(){
var quarterEndMonth = getQuarterStartMonth() + 2;
var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth));
return formatDate(quarterStartDate);
}

//获得本年度的开始日期
function getYearStartDate(){
var monthStartDate = new Date(nowYear, 0, 1);
return formatDate(monthStartDate);
}

//获得本年度的结束日期
function getYearEndDate(){
var monthEndDate = new Date(nowYear, 11, getMonthDays(12));
return formatDate(monthEndDate);
}

/**
 * 获取IP
 * gu
 */
function getip()
{
	var ip = "";
	try
	{	
		ip = returnCitySN["cip"];
	}
	catch(e)
	{
		console.log("获取ip失败")
	}
	return ip;
}

/**
 * 时间截取转换
 * @param datetime 时间
 * @param num 截取到第几位
 * @returns
 */
function gettime(datetime,num)
{
	try
	{
		if(datetime.length > 19)
		{
			return datetime.substr(0,num);
		}
		else
			return datetime
	}
	catch(es)
	{
		console.log("时间转换出错");
		return datetime;
	}
}

/**
 * 年的计算
 * @param date
 * @param num
 * @returns {String}
 */
function timeAddyear(date,num)
{
	var years = 1;
	try
	{
		years = parseInt(num);
	}
	catch(e)
	{
		console.log(e);
	}
	var d = new Date(date);
	d.setFullYear(d.getFullYear() + years);
	var month = d.getMonth() + 1;
	var strDate = d.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	return d.getFullYear() + "-" + month + "-" + strDate;
}

function StrtoNum(str)
{
	var num = parseFloat(str);
//	console.log(typeof(num));
	if(isNaN(num))
		num = 0;
//	console.log(num);
	return num;
}

//下载事件
function downloadFile2(url) { 
	console.log(url);
    try{ 
     //alert("/zgbd_voc/"+url);
        var elemIF = document.createElement("iframe");   
        elemIF.src = url;   //"/zgbd_voc/"+
//        alert(elemIF.src);
        elemIF.style.display = "none";   
        parent.document.body.appendChild(elemIF);   
    }catch(e){ 
    	//alert(e);
    } 
}
