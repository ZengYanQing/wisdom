var isship=false;
var isdevelop=true;//开发人员模式,发布请改为false;

var isbenniu=false;/*是否奔牛版本*/
/**
 * Created by gu on 2016/12/12.
 */


/**
* @name     :
* @author   :Nice
* @explain  :cookie 操作
*/
/* 设置cookie */
function setCookie(name, value, time) {
	try{
	    var strsec = getsec(time);
	    var exp = new Date();
	    exp.setTime(exp.getTime() + strsec * 1);
	    if(document.domain.indexOf("localhost") >-1 || document.domain.indexOf("127.0.0.1") >-1 || document.domain.indexOf("10") >-1 )
	    {
	    	 console.log(document.domain);
	    	 document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()+";";//
	    }
	    else
	    {
	    	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()+";Domain=vocsystem.cn;path=/;";//
	    	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()+";Domain=gzqiaoyin.com;path=/;";//
	    }
//	    console.log(document.cookie);
	}
	catch(es)
	{
		cosole.log(es);
	}
	
}

//读取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2],"UTF-8");
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
    } else if (str2 == "h"){
        return str1 * 60 * 60 * 1000;
    } else if (str2 == "d"){
        return str1 * 24 * 60 * 60 * 1000;
    }
}

function userbaseinfo(userid,userpid,username,roletype,lon,lat,companyId){
	var users = new Object;
	users.userid = userid;
	users.userpid = userpid;
	users.username = username;
	users.roletype = roletype;
	users.lon = lon;
	users.lat = lat;
	users.companyId = companyId;
	return users;
}

function JsonToString(jsonarr){
	return JSON.stringify(jsonarr); //可以将json对象转换成json对符串 
}

function StringToJson(jsonstr){
	var ss;
	try{
		ss=JSON.parse(jsonstr); 
	}catch(e){
		console.log("StringToJson:"+e);
	}
	return ss; //可以将json字符串转换成json对象 
}


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


var loadingindex;
//显示loading
function showload(){
	loadingindex=layer.load(1);
}

//隐藏loading
function hideload(){
	layer.close(loadingindex);  
}

/**
* 获取权限 从父权限id
*
* 
*/

var initright=function(callback){
	 
   
};

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
	this.vehicleinfoedit="hide";//监控模块车辆详情编辑
	this.setuservehicle="hide";//分配用户车辆
	this.monitorline="hide";//监控轨迹线
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
		//alert("http://yuefenghao.com/zgbd_voc/index/getRightByPid.action?pid="+pid+"&userid="+userid);
		rightdata = new Right(); 
//    	$("."+addbtn).hide();
//    	$("."+delbtn).hide();
//    	$("."+editbtn).hide();
		
		
		 
	
	
        $.ajax
        ({
                type: "Post",
                url: "/zgbd_voc/index/getRightByPid.action?pid="+pid+"&userid="+userid,
                 dataType: "json",
                success: function (data) {
                	
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
                			
                		}
                	  }
                	if(isdevelop==true)
                	{
                		for(var item in rightdata){
                			rightdata[item]=="";
                		}
                		$("."+addbtn).show();
	            		$("."+delbtn).show();
            			$("."+editbtn).show();
                	}
                	
                	
                	 rightSuccess();
                	 }catch(ee){
                  	   alert(ee);
                     }
					
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                	alert(XMLHttpRequest.status);

                }
            });
         
            }
            catch(er)
            {alert(er);}
    }


//--时间事件开始

function getDate(addDayCount) {
    var date = new Date();
    date.setDate(date.getDate() + addDayCount);//获取AddDayCount天后的日期
    var seperator1 = "-";
   
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

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

//获取当前天的0点
function getNowFormatDate0() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " 00:00:00";
    return currentdate;
}


function getNowFormatDate1() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " 23:59:59";
    return currentdate;
}

//模拟数据的时间叠加开始
function getMoNiTime (time,addMinuteCount,day)
{
	try
	{
		 var date = new Date();
		 if(time ==1)
		 {
			 date.setHours(7,30);
		 }
		 else
		 {
			 date.setHours(14,15);
		 }
//		 alert(date);
		 date.setMinutes(date.getMinutes()+addMinuteCount); //分钟(setMinutes),秒钟(setSeconds)类似
		 var seperator1 = "-";
	     var seperator2 = ":";
	     var month = date.getMonth() + 1;
	     var strDate = date.getDate();
	     var strHours = date.getHours();
	     var strMinutes = date.getMinutes();
//	     var strSeconds = date.getSeconds();
	     var strDate = date.getDate();
	     if (month >= 1 && month <= 9) {
	        month = "0" + month;
	     }
	     if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	     }
	     day = day.substring(0,10)
	     var currentdate = day + " " + strHours + seperator2 + strMinutes + seperator2 + "00";
		 return currentdate;	
	}
	catch(es)
	{
		alert(es);
	}
}

//模拟数据的时间叠加结束


//获取本月1号
function getNowMonthStart() {
    var date = new Date();
    date.setDate(date.getDate());//获取AddDayCount天后的日期
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = 1;
    var strHours = 0;
    var strMinutes = 0;
    var strSeconds = 0;   
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + "01"
        + " " + "00" + seperator2 + "00"
        + seperator2 + "00";
     
    return currentdate;
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
var monthStartDate = new Date(nowYear, 1, 1);
return formatDate(monthStartDate);
}

//获得本年度的结束日期
function getYearEndDate(){
var monthEndDate = new Date(nowYear, 12, getMonthDays(12));
return formatDate(monthEndDate);
}

function changeTime(value){
	switch(value){
		case "week":$('#datetimestart').val(getWeekStartTime());
					$('#datetimeend').val(getWeekEndTime());break;
		case "month":$('#datetimestart').val(getMonthStartTime());
		$('#datetimeend').val(getMonthEndTime());break;
		case "lastmonth":$('#datetimestart').val(getLastMonthStartTime());
		$('#datetimeend').val(getLastMonthEndTime());break;
		case "quarter":$('#datetimestart').val(getQuarterStartDate());
		$('#datetimeend').val(getQuarterEndDate());break;
		
		default:break;
	}
}

function GetDateDiff(startDate)  
{  
    var startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();     
    var endTime = now.getTime();     
    var dates = Math.abs((startTime - endTime))/(1000*60*60*24);     
    return  dates;    
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

function shijiancha(startdate,enddate){
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

//--时间事件结束

//智能输入数字
function clearNoNum(obj)
{
    //先把非数字的都替换掉，除了数字和.
    obj.value = obj.value.replace(/[^\d.]/g,"");
    //必须保证第一个为数字而不是.
    obj.value = obj.value.replace(/^\./g,"");
    //保证只有出现一个.而没有多个.
    obj.value = obj.value.replace(/\.{2,}/g,".");
    //保证.只出现一次，而不能出现两次以上
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
}


//左侧树控件自适应和隐藏事件       开始
window.onresize=function(){  
    changeDivHeight();  
};

window.onload=function(){  
    changeDivHeight();      
    $(".showtree").click(function() {
    	
        $('.maindivright').animate({
            marginLeft: '250px'
        });
        $('.maindivleft').animate({
            left: '0px'
        },
        function (){
        	try{
            	autoTable();
            }catch(e){}
        	});
        //$('.showtree').hide();
        $('.showtree').css('display','none');
        
    });
    $(".hidetree").click(function() {
    	
        $('.maindivleft').animate({
            left: '-250px'
        });
        $('.maindivright').animate({
            marginLeft: '0px'
        },
        function (){
        	try{
            	autoTable();
            }catch(e){}
        	});
        $('.showtree').css('display','block');
        //$('.showtree').show();
       
    });
    
  
};

function changeDivHeight(){ 
	
	var allheight = $(".maindivleft").outerHeight();
	var topheight = $(".maindivlefttop").outerHeight();
	var height=parseInt(allheight-topheight)-1;
	$(".maindivlefttree").height(height);
	
//	历史轨迹查看 思思

//	var topheight = $(".maindivlefttop").outerHeight();
	var bottomheight = $(".dibu").outerHeight();
	var height1 = parseInt(allheight-topheight-bottomheight)-1;
	$(".maindivlefttree-hei").height(height1);

	var rightheight = $(".maindivright").outerHeight();
	var tabledivheight = $("#tablediv").outerHeight();
	
	//alert(rightheight+"-"+tabledivheight);
	$("#allmap").height(rightheight-tabledivheight);
	
	// 博云高度自适应
	$("#byallmap").height(rightheight-tabledivheight);
	
}
//左侧树控件自适应和隐藏事件      结束


/*
 * 
 * Formatterbootstarp table格式化
 * 
 * */

function dataPersonelFormatter(value,row,index){
	var p="";
	 $.ajax({  
		 type: "POST",  
		 url: root+"/commons/getPersonelBy.action?id="+row.personelid,  
		 dataType: 'json',  
	     async: false,
		 success: function(data){ 
			 p=data.name;
    	}  
	 });  
	 return p;
}
function dataPersonelTelFormatter(value,row,index){
	var t="";
	 $.ajax({  
		 type: "POST",  
		 url: root+"/commons/getPersonelBy.action?id="+row.personelid,  
		 dataType: 'json',  
	     async: false,
		 success: function(data){ 
			 t=data.tel;
    	}  
	 });  
	 return t;
}
function dataVehicleFormatter(value,row,index){
	var t="";
	 $.ajax({  
		 type: "POST",  
		 url: root+"/commons/getVehicleBy.action?id="+row.vehicleid,  
		 dataType: 'json',  
	     async: false,
		 success: function(data){ 
			 t=data.registrationNO;
    	}  
	 });  
	 return t;
}

//function dataDictFormatter(value,row,index){
//	var p="";
//	 $.ajax({  
//		 type: "POST",  
//		 url: "/zgbd_voc/commons/getDictlistById.action?id="+row.dictid,  
//		 dataType: 'json',  
//	     async: false,
//		 success: function(data){ 
//			 p=data.data;
//    	}  
//	 });  
//	 return p;
//}

//车辆类型Formatter1
function dataTypeFormatter(value,row,index){
	if(value==""){
		return "";
	}
	else{
		return datavehicletypeFormatter(value);
	}
}
//车辆类型Formatter2
function datavehicletypeFormatter(id){
	var p="";
	 $.ajax({  
		 type: "POST",  
		 url: root+"/commons/getDictlistById.action?id="+id,  
		 dataType: 'json',  
	     async: false,
		 success: function(data){ 
			 p=data.data;
    	}  
	 });  
	 return p;
}
//车辆类型Formatter1
function vehiclestatusFormatter(value,row,index){
	if(value==""){
		return "";
	}
	else{
		return datavehicletypeFormatter(value);
	}
}


/*
 * 
 * 共用方法
 * 
 * */
function dataDictFormatter(id){
	var p="";
	 $.ajax({  
		 type: "POST",  
		 url: "/zgbd_voc/commons/getDictlistById.action?id="+id,  
		 dataType: 'json',  
	     async: false,
		 success: function(data){ 
			 if(data.data)
			 	p=data.data;
    	}  
	 });  
	 return p;
}

function dataOrganFormatter(id){
	var p="";
	 $.ajax({  
		 type: "POST",  
		 url: "/zgbd_voc/organ/getOrganByID.action?id="+id,  
		 dataType: 'json',  
	     async: false,
		 success: function(data){ 
			 if(data)
			 	p=data;
    	}  
	 });  
	 return p;
}

function dataRoadFormatter(id){
	var p="";
	 $.ajax({  
		 type: "POST",  
		 url: root+"/roadmanage/getroadnamebyid.action?id="+id,  
		 dataType: 'json',  
	     async: false,
		 success: function(data){ 
			 if(data)
			 	p=data;
    	}  
	 });  
	 return p;
}


/*
 * 
 * 回车不刷新事件
 * 
 * */

function ClearSubmit(e) {
    if (e.keyCode == 13) {
        return false;
    }
}



/*
 * 
 * id获取数据
 * 
 */
function getUserBy(id){
	var p="";
	 $.ajax({  
		 type: "POST",  
		 url: root+"/commons/getUserBy.action?id="+id,  
		 dataType: 'json',  
	     async: false,
		 success: function(data){ 
			 p=data;
   	}  
	 });  
	 return p;
}

/*
 * 
 * 绑定select
 * 
 */
function bindvehicletype(){
	$.ajax({  
		type: "POST",  
		url: root+"/commons/getDictListBy.action?idorname=车辆类型",  
		//data: $("form").serializeArray(),  
		dataType: 'json',  
		success: function(data){ 
		
				var dr="<option value=\"\">选择车辆类型</option>";
			for(var i=0;i<data.length;i++)
			{
					var drselect="";
				dr+="<option value=\""+ data[i].id +"\">"+ data[i].data +"</option>";
			}
			$("select[name='vehicletype']").html(dr);
		}  
		});  
}

function bindshiptype(){
	$.ajax({  
		type: "POST",  
		url: root+"/commons/getDictListBy.action?idorname=游艇类型",  
		//data: $("form").serializeArray(),  
		dataType: 'json',  
		success: function(data){ 
				var dr="<option value=\"\">选择游艇类型</option>";
			for(var i=0;i<data.length;i++)
			{
					var drselect="";
				dr+="<option value=\""+ data[i].id +"\">"+ data[i].data +"</option>";
			}
			$("select[name='vehicletype']").html(dr);
		}  
		});  
}


function shijiancha(startdate,enddate){
	var date1=new Date(Date.parse(startdate.replace(/-/g,  "/")));
	//var date1=startdate;  //开始时间
	//alert("aa");
	var date2=new Date(Date.parse(enddate.replace(/-/g,  "/")));
	//var date2=enddate;    //结束时间
	var date3=date2.getTime()-date1.getTime()  //时间差的毫秒数

	 
	//计算出相差天数
	var days=Math.floor(date3/(24*3600*1000))
	 

	//计算出小时数
	var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
	var hours=Math.floor(leave1/(3600*1000))
	//计算相差分钟数
	var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
	var minutes=Math.floor(leave2/(60*1000))

	 
	//计算相差秒数
	var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
	var seconds=Math.round(leave3/1000)
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

//下载事件
function downloadFile(url) { 
	
    try{ 
     //alert("/zgbd_voc/"+url);
        var elemIF = document.createElement("iframe");   
        elemIF.src = "/zgbd_voc/"+url;   
        elemIF.style.display = "none";
		//替换域名
		if(elemIF.indexOf('zhhw.gzqiaoyin.com')!= -1){
			elemIF=elemIF.replace('zhhw.gzqiaoyin.com','vocsystem.cn');
		}
        document.body.appendChild(elemIF);   
    }catch(e){ 
    	//alert(e);
    } 
}

//下载事件
function downloadFile1(url) { 
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


function dataeditTableFormatter(value,row,index){
	if(value=="") value=0;
	
		return "<a href=\"#\" name=\"score\" data-type=\"text\" data-pk=\""+row.id+"\" data-title=\"分数\">" + value + "</a>";
//	}else{
//		
//		return row.score;
//	}
	 
	
}


function dateFormatter(value,row,index){
	if(value.length>=19)
		return value.substr(0,19);
	else
		return value;
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
		return parseInt(h*3600)+parseInt(m*60)+parseInt(s);
	}
	return 0;
	}catch(e){
		return 0;
	}
}

//保留两位小数 
//功能：将浮点数四舍五入，取小数点后2位 
function toDecimal(x) { 
 var f = parseFloat(x); 

 if (isNaN(f)) { 
  return; 
 } 
 var reg = /.*\..*/;
 if(reg.test(x)){
	 f = Math.round(x*100)/100; 
	 return f; 
 }
 return x; 
} 


function postScore(curRow,sName,companyId,sectionId){
	var times=$("#times").val();
    var period=curRow.period;
    var st="";
    var et="";
    //console.log(times);
    if(period.indexOf("日")>-1){
    	st=times+" 00:00:00";
    	et=times+" 23:59:59";
    }else{
    	var day=getMonthDays(Number(times.split("-")[1])+1);
    	st=times.split("-")[0]+"-"+times.split("-")[1]+"-"+"01 00:00:00";
    	et=times.split("-")[0]+"-"+times.split("-")[1]+"-"+day+" 23:59:59";
    }
   
    $.ajax({
        type: 'POST',
        url: root+"/event/updateRoadStandarlist.action"+"?id="+rowId+"&datas="+curRow[sName]+"&companyId="+companyId+"&sectionId="+sectionId+"&st="+st+"&et="+et,
        //data: curRow,
        dataType: 'JSON',
        success: function (data, textStatus, jqXHR) {
        	parent.parent.layer.msg('保存成功！');
        	if(mqconnect){
        		var text={
        				date:times,
        				organid:companyId,
        				roadid:sectionId,
        				score:curRow[sName],
        				text:"date为评分时间，organid为所属机构ID，roadid为所属路段ID，score为扣分数"
        		};
        		var str=JsonToString(text);
        		console.log(str);
        		send(str);
        	}
        	
            refreshTable();
        },
        error: function () { alert("error");}
    });
}

$('#file,#file1').change(function(){  

	var file = $(this).val();
	var strFileName=file.replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi,"$1");  //正则表达式获取文件名，不带后缀
	var FileExt=file.replace(/.+\./,"");   //正则表达式获取后缀
    console.log(strFileName+'.'+FileExt);
    if ($(this).val() == '') {
    	$(this).parent("label").siblings(".updown-em").text("未选择上传文件哦！");
    } else{  
    	$(this).parent("label").siblings(".updown-em").text(strFileName+'.'+FileExt);
    };
    
});

/*$('#file1').change(function(){  

	var file = $("#file1").val();
	var strFileName=file.replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi,"$1");  //正则表达式获取文件名，不带后缀
	var FileExt=file.replace(/.+\./,"");   //正则表达式获取后缀
    console.log(strFileName+'.'+FileExt);
    if ($('#file').val() == '') {
        $('.updown-em1').text("未选择上传文件哦！");
    } else{  
        $('.updown-em1').text(strFileName+'.'+FileExt);
    };
    
});*/

function filechage(id)
{
	$('#'+id+'').change(function(){  

		var file = $('#'+id+'').val();
		var strFileName=file.replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi,"$1");  //正则表达式获取文件名，不带后缀
		var FileExt=file.replace(/.+\./,"");   //正则表达式获取后缀
	    console.log(strFileName+'.'+FileExt);
	    if ($('#'+id+'').val() == '') {
	    	$('#'+id+'').parent("label").siblings(".updown-em").text("未选择上传文件哦！");
//	        $('.updown-em').text("未选择上传文件哦！");
	    } else{  
	    	$('#'+id+'').parent("label").siblings(".updown-em").text(strFileName+'.'+FileExt);
	    	$('#'+id+'').parent("label").siblings(".updown-em").attr("title",strFileName+'.'+FileExt);
//	        $('.updown-em').text(strFileName+'.'+FileExt);
	    };
	    
	});
}
function getNowDate(){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	if (month < 10) {
	    month = "0" + month;
	}
	if (day < 10) {
	    day = "0" + day;
	}
	var nowDate = year + "-" + month + "-" + day;
	return nowDate;
}
//得到事件   兼容火狐&&IE
function getEvent(){
   if(window.event)    {return window.event;}
   func=getEvent.caller;
   while(func!=null){
       var arg0=func.arguments[0];
       if(arg0){
           if((arg0.constructor==Event || arg0.constructor ==MouseEvent
              || arg0.constructor==KeyboardEvent)
              ||(typeof(arg0)=="object" && arg0.preventDefault
              && arg0.stopPropagation)){
               return arg0;
           }
       }
       func=func.caller;
   }
   return null;
}
//阻止冒泡
function cancelBubble()
{
  var e=getEvent();
  if(window.event){
      //e.returnValue=false;//阻止自身行为
      e.cancelBubble=true;//阻止冒泡
   }else if(e.preventDefault){
      //e.preventDefault();//阻止自身行为
      e.stopPropagation();//阻止冒泡
   }
}


/*-------activeMQ-------*/
//接收GPS数据开始
var client, destination;
var topic="appraise";

var mqconnect=false;

//页面加载事件执行connect方法
function connect(topic){
	n =Math.floor(Math.random()*10000);
//	alert(n);
	var host = "183.2.166.147";    
    var port = "61614";
    var clientId = "text"+ n ;//"example-68121";
    var user = "admin";
    var password = "password";
    
    destination = topic;//gps

  //return;
    client = new Messaging.Client(host,61614, clientId);

  client.onConnect = onConnect;
//alert("onConnect");
  client.onMessageArrived = onMessageArrived;
  client.onConnectionLost = onConnectionLost;            

  client.connect({
    userName:user, 
    password:password, 
    onSuccess:onConnect, 
    onFailure:onFailure
  }); 
  
  return false;
}  

var onConnect = function(frame) {
//	layer.msg('连接到服务器成功');
	 console.log("MQTT-onConnect："+'连接到服务器成功');
	 mqconnect=true;
    //alert("");
    client.subscribe(destination);
    //send("测试1111");
  };  
  
  function disconnect(){
      client.disconnect();
      mqconnect=false;
      return false;
    }
  
  function send(text){
     
      if (text) {
    	message = new Messaging.Message(text);
        message.destinationName = destination;
        client.send(message);
        console.log(message);
      }
      return false;
    }
  
  function onFailure(failure) {
	  mqconnect=false;
	  console.log("MQTT-onFailure："+failure.errorMessage);
	  client.onConnect =null;
	  client.onConnect = onConnect;
	  
	  //layer.msg("服务器连接出错了...");
	  //layer.msg("failure:"+failure.errorMessage);
    }  
  

  //接收事件
  function onMessageArrived(message) {
	  
	  var t = message.payloadString;
	  //console.log("接收事件:"+t);
      t=JsonToString(t);
	  //console.log("接收事件:"+t);
//	  alert(t);
      //t=eval('('+ t +')');
      //getgps(t,0);
      //counts(t);
    }

    function onConnectionLost(responseObject) {
    	console.log("onConnectionLost:"+onConnectionLost);
    	console.log("onConnectionLost.errorCode:"+onConnectionLost.errorCode);
      if (responseObject.errorCode !== 0) {
    	  //layer.msg(client.clientId + ": " + responseObject.errorCode + "\n");
      }
    }
/*-------activeMQ结束-------*/
    
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

/**
 * 增加小时
 * starttime:开始时间
 * time：需要增加或者减少的小时
 */
function timeAdd(starttime,time)
{
	var nowtime = time_to_sec(starttime);
	var timesec = nowtime + time * 3600
	return sec_to_time(timesec);
}

/*function isXss(data){
	var str = JSON.stringify(data);
	var reg = new RegExp("<(S*?)[^>]*>.*?|<.*? />", 'g');
    if (str && str.match(reg)) {
    	if (layui && layui.layer) {
    		layui.layer.msg('包含非法字符！');
    	} else {
    		alert('包含非法字符！');
    	}
        return true;
    }
    return false;
}
*//**
 * 重写jquery的ajax方法
 *//*
(function($){
	// 白名单
	var ignore = [
		''
	]
	if ($ && $.ajax) {
		// 备份jquery的ajax方法  
		var _ajax = $.ajax
		// ajax请求加上layui load
		$.ajax=function(opt){
			var isIgnore = false;
			ignore.forEach(function(item){
				if (item.indexOf(opt.url) == -1) {
					isIgnore = true;
				}
			})
			if (isXss(opt.data) && !isIgnore) {
				return;
			}
			return _ajax(opt);  
		};
	}
})(jQuery); 

*/

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



