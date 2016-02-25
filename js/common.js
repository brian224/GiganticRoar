$(window).load(function(){
	var $body     = $('body'),
		$menu     = $('.btn-menu'),
		$showTime = $('.show-time'),
		$tourList = $('.tour-list'),
		$btnMore  = $('.btn-more');

	$menu.on('click', function(){
		$(this).parent().toggleClass('is-active');
	});

	if ($body.hasClass('index')) {
		$.getJSON('/json/tour.json' , function(Ajax){
			indexItem(Ajax);
		});
	}

	if ($body.hasClass('tour')) {
		$.getJSON('/json/tour.json' , function(Ajax){
			tourItem(Ajax);
		});

		$btnMore.on('click', function(){
			$tourList.addClass('show-all');
		});
	}

	function indexItem(Ajax) {
		var _Str = '';
		
		for (var i = 0; i < 4; i++) {
			_Str += '<li class="list">';
			_Str += '	<span class="date">' + Ajax.response[i].date + '</span>';
			_Str += '	<span class="place">' + Ajax.response[i].place + '</span>';
			_Str += '	<span class="city">' + Ajax.response[i].city + '</span>';
			_Str += '</li>';
		}

		$showTime.append(_Str);
	}

	function tourItem(Ajax) {
		var _Str = '';
		
		$.each(Ajax.response, function (index, value) {
			var _date   = value.date,
				_place  = value.place,
				_city   = value.city,
				_link   = value.link,
				_status = value.status;

			_Str += '<li class="list ' + _status + '">';
			_Str += '	<span class="date">' + _date + '</span>';
			_Str += '	<span class="place">' + _place + '</span>';
			_Str += '	<span class="city">' + _city + '</span>';
			_Str += '	<a class="link" href="' + _link + '" target="_blank"></a>';
			_Str += '</li>';
		});

		$tourList.append(_Str);
	}
});