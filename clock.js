
function drawBackground(){
	var dom = document.getElementById("clock");
	var ctx = dom.getContext('2d');
	var width = ctx.canvas.width;
	var height = ctx.canvas.height;
	var r = width/2;
	var rem = width/200;
	
	ctx.save();
	ctx.translate(r,r);
	ctx.beginPath();//起始一条路径或重置当前路径；
	ctx.lineWidth = 10 * rem;//lineWidth设置返回当前的线条宽度；大外圆
	ctx.arc(0,0,r - ctx.lineWidth / 2,0,2*Math.PI,false);//arc方法，用于创建圆或部分圆；
	ctx.stroke();//stroke()绘制已定义的路径；fill()填充当前绘图（路径）；
	
	
	var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];//利用数组存放小时数3-12-2；
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.font =18*rem+ "px Arial";//字体大小，水平垂直对齐；
		hourNumbers.forEach(function(number,i){
		//弧度
		var rad = 2*Math.PI / 12 * i;  
		var x = Math.cos(rad) * (r - 30 * rem);//拿x的坐标
		var y = Math.sin(rad) * (r - 30 * rem);//拿y的坐标
		ctx.fillText(number,x,y);//fillText(text,x,y,maxWidth（px）)在画布上绘制呗填充的文本；	
	});
	
	for(var i = 0;i< 60;i++){//60个点，依次遍历；
		//弧度
		var rad = 2 * Math.PI / 60 * i; 
		//xy坐标,小时数和外圆之间；
		var x = Math.cos(rad) * (r-18 * rem);
		var y = Math.sin(rad) * (r-18 * rem);
		ctx.beginPath();//之前画外圆，这是数字内圆；
		//把每个小时数对应的颜色表示出来！
		if(i%5==0){
			ctx.fillStyle = "#000";
			ctx.arc(x,y,2 * rem,0,2 * Math.PI,false);	
		}else{
			ctx.fillStyle = "#ccc";
			ctx.arc(x,y,2 * rem,0,2 * Math.PI,false);		
		}
		ctx.fill();
	}
}

//时针
function drawHour(hour,minute){
	
	var dom = document.getElementById("clock");
	var ctx = dom.getContext('2d');
	var width = ctx.canvas.width;
	var height = ctx.canvas.height;
	var r = width / 2;
	var rem = width/200;

	
	ctx.save();//保存当前的环境状态
	ctx.beginPath();
	//时针弧度计算
	var rad = 2 * Math.PI / 12 * hour;
	//分针弧度
	var mrad = 2*Math.PI / 12/60*minute;
	ctx.rotate(rad+mrad);
	ctx.lineWidth = 6 * rem;//时针的粗细；
	ctx.lineCap ="round";//时针两端是圆的；
	ctx.moveTo(0,10 * rem);
	ctx.lineTo(0,-r/2);
	ctx.stroke();
	ctx.restore();//返回之前包小存过得属性或状态；
}

//分针
function drawMinute(minute){
	
	var dom = document.getElementById("clock");
	var ctx = dom.getContext('2d');
	var width = ctx.canvas.width;
	var height = ctx.canvas.height;
	var r = width/2;
	var rem = width/200;

	
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI / 60 * minute;
	ctx.rotate(rad);
	ctx.lineWidth = 3 * rem;
	ctx.lineCap ="round";
	ctx.moveTo(0,10 * rem);
	ctx.lineTo(0,-r + 30 * rem);
	ctx.stroke();
	ctx.restore();

}

//秒针
function drawSecond(second){
	
	var dom = document.getElementById("clock");
	var ctx = dom.getContext('2d');
	var width = ctx.canvas.width;
	var height = ctx.canvas.height;
	var r = width / 2;
	var rem = width/200;

	
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = "#c14543";
	var rad = 2 * Math.PI / 60 * second;
	ctx.rotate(rad);
	ctx.moveTo(-2 * rem,20 * rem);
	ctx.lineTo(2 * rem,20 * rem);
	ctx.lineTo(1,-r+18 * rem);
	ctx.lineTo(-1,-r+18 * rem);
	ctx.fill();
	ctx.restore();
}


function drawDot(){
	var dom = document.getElementById("clock");
	var ctx = dom.getContext('2d');
	var width = ctx.canvas.width;
	var height = ctx.canvas.height;
	var r = width / 2;
	var rem = width/200;

	
	ctx.beginPath();
	ctx.fillStyle = "#fff";
	ctx.arc(0,0,3 * rem,0,2*Math.PI,false);
	ctx.fill();
}

function draw(){
	var dom = document.getElementById("clock");
	var ctx = dom.getContext('2d');
	var width = ctx.canvas.width;
	var height = ctx.canvas.height;
	var r = width / 2;
	var rem = width/200;


	ctx.clearRect(0,0,width,height);
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	
	drawBackground();//背景
	drawHour(hour,minute);//时针
	drawMinute(minute);//分钟
	drawSecond(second);	//秒钟
	drawDot();//中心圆点
	ctx.restore();

}

function times(){
	var demo = new Date();
	var year = demo.getFullYear();
	var month = demo.getMonth()+1;
	var day = demo.getDate();
	var hour = demo.getHours();
	var tmp;
	if(hour>= 6 && hour<12){
		tmp = "上午";	
	}else if(hour>=12 && hour<19){
		tmp = "下午";
	}else if(hour>=19 && hour<24){
		tmp = "晚上";	
	}else{
		tmp = "凌晨";	
	}
	var ht = document.getElementById("time");
	ht.innerHTML = year + "年" + month + "月" + day + "日" + "  " + tmp;	
}

window.onload = function(){
	draw();
	times();
	setInterval(draw,1000);
}