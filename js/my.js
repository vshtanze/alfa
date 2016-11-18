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


$('document').ready(
	function(){
		// $('#modal').modal();
	}
);