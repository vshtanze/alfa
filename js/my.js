function CurrentTime() {
	var dt 			= new Date();
	var h 			= dt.getHours();
	var m 			= dt.getMinutes();
	var s 			= dt.getSeconds();
	
	var timeFormat 	= h<10 ? "0"+h+":" : h+":";
	timeFormat 		+= m<10 ? "0"+m+":" : m+":";
	timeFormat 		+= s<10 ? "0"+s : s;
	
	return timeFormat;
}
function SetTime(str) {
	$(str).html("<small>"+CurrentTime()+"</small>");
}
function SetTimer(block, timer, css=false) {
	SetTime(block);
	if (parseInt(timer)) {
		setInterval(
			function(){
				SetTime(block)
			}, 
			timer >= 1000 ? timer : 1000
		)
		if (css) 
			$(block).addClass("text-success");
		return true;
	}
	if (css) 
		$(block).addClass("text-danger");
	return false;
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function TemplateNews(id) {
	
	//	#shortNews = Block Коротко, #todayNews = Block Сегодня.
	
	var images 		= [1,2,3,4,5];
	var titles 		= [
		"Севастопольский суд арестовал трех украинских диверсантов",
		"Глава ДНР назвал имена причастных к убийству Моторолы",
		"Футбольную сборную России дважды поразил Катар",
		"Гробы как декорация: иркутский экс-депутат может сорвать куш за приседания",
		"Роскомнадзор назвал дату блокировки LinkedIn"
	];
	var months 		= ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	
	var template 	= null;
	var hour 		= getRandomInt(0,23);
	var min 		= getRandomInt(0,59);
	var day 		= getRandomInt(1,28);
	var month 		= months[getRandomInt(0, months.length-1)];
	var image 		= images[getRandomInt(0, images.length-1)];
	var title 		= titles[getRandomInt(0, titles.length-1)];
	
	hour 			= hour < 10 ? "0"+hour : hour.toString();
	min 			= min < 10 ? "0"+min : min.toString();
	
	if (id) {
		switch (id) {
			case "#shortNews": 
				template 	= '<div class="row"><div class="col-md-3 col-sm-3 text-right"><small>'+hour+':'+min+'</small></div><div class="col-md-9 col-sm-9"><a href="#" class="btn-link"><small>'+title+'</small></a></div></div>';
				break;
			case "#todayNews": 
				template 	= '<div class="thumbnail-my"><a href="#"><img src="img/'+image+'.jpg" alt="News"><div class="caption"><p><h5>'+title+'</h5></p></div></a><p class="well-sm"><span class="glyphicon glyphicon-calendar"></span>'+day+' '+month+', 2016 '+hour+':'+min+'</p></div>';
				break;
		}
	}
	return template;
}
function AddNews(id, count) {
	
	if (parseInt(count)) {
		if (id == "#todayNews") {
			for(var i = 0; i < count; ++i) {

				if (i%2) 
					$("#todayLeft").append(TemplateNews(id));
				else 
					$("#todayRight").append(TemplateNews(id));
			}
		}
		else {
			for(var i = 0; i < count; ++i) 
				$("#shortNews").append(TemplateNews(id));
		}
		return true;
	}
	return false;
}

$("#top-link-block").removeClass('hidden').affix(
	{ offset: {top:100} }
);

$('#top-link-block').click(
	function() {
		$('body,html').animate(
			{scrollTop: 0},
			'slow'
		);
		return false;
	}
);

SetTimer("#time", 1, true);

$('document').ready(function() {
	AddNews("#shortNews", 50);
	AddNews("#todayNews", 20);
});
