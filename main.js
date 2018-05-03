$(document).ready(function(){
	$('#chat-list .chat-tile:first-child').addClass('selected-chat-highlight');
	if($('#chat-list .chat-tile').length == 0) {
		$('#chat-list em').html('Add people to chat');
		$('#chat-container-header h2').html("No chat history");
	}
	else {
		$('#chat-container-header h2').html($('#chat-list .chat-tile:first .chat-person').text());
		$('#chat-list .chat-tile:first').addClass('selected-chat-highlight');
	}
	$('#chat-button').on('click', function(){
		$('#chat-container').toggleClass('hide-element show-element').css({'width':'700px', 'height': '350px'});
	});
	$('#add-new-user-btn').on('click', function(){
		$('#add-group-wrapper, .back-chat-btn').removeClass('hide-element').show();
		$('#add-new-user-btn,.chat-user-search').hide();
	});
	$('.back-chat-btn').on('click', function(){
		$('#add-group-wrapper, .back-chat-btn').hide().addClass('hide-element');
		$('#add-new-user-btn,.chat-user-search').show();
	});
	$('.chat-tile').on('click', function(){
		if($(this).find('.chat-person').length > 0) {
			$('.chat-tile').removeClass('selected-chat-highlight');
			$(this).addClass('selected-chat-highlight');
			$('#chat-container-header h2').html($(this).find('.chat-person').text());
			$('#live-chat-container').html("");
			$('.send-chat-field').val("");
		}
	});
	$('.chat-send-btn').on('click', function(){
		if($('.send-chat-field').val() && $('.send-chat-field').val().length > 0) {
			$('#live-chat-container').append('<div class="chat-wrapper"><div class="chat-box chat-box-for-sender">You: '+$('.send-chat-field').val()+'</div><em class="msg-send-time">'+currentTime()+'</em></div>');
			$('.send-chat-field').val("");
			// setTimeout(function(){
			// 	$('#live-chat-container').append('<div class="chat-wrapper"><div class="chat-box chat-box-for-receiver">'+$('#chat-container-header h2').text()+': Yea good morning</div><em class="msg-receive-time">10.58 am</em></div>');
			// 	$('#live-chat-container').scrollTop($('#live-chat-container')[0].scrollHeight);
			// }, 1500);
			$('#live-chat-container').scrollTop($('#live-chat-container')[0].scrollHeight);
		} else {
			return;
		}
	});
	$('.send-chat-field').on('keypress', function(e){
		var key = e.which;
		 if(key == 13)  // the enter key code
		 	$('.chat-send-btn').trigger('click');
	});
	$(".search-group-user, .chat-user-search").on("keyup", function() {
	    var value = $(this).val();
		$('#chat-list em').html("");
		if($('#chat-list .chat-tile').length > 0) {
		    $("#chat-list .chat-person").each(function(index) {
	            $row = $(this);
				var id =$(this).text().toLowerCase();
	 			if (id.indexOf(value) == -1) {
	 				$row.parent().hide();
					if($('#chat-list .chat-tile:visible').length == 0)
						$('#chat-list em').html('No match found!');
	 			}
	 			else {
	 				$row.parent().show();
	 			}
		    });
		} else {
			// backend search and search data population
		}
	});
	$('#close-chat-btn').on('click', function(){
		$('#chat-container').removeClass('show-element').addClass('hide-element');
	});
	function currentTime() {
		var currentTime = new Date(),
	      hours = currentTime.getHours(),
	      minutes = currentTime.getMinutes();
		if (minutes < 10)
			minutes = "0" + minutes;
		var suffix = "AM";
		if (hours >= 12) {
	    	suffix = "PM";
	    	hours = hours - 12;
		}
		if (hours == 0) {
		 	hours = 12;
		}
		return (hours + ":" + minutes + " " + suffix)
	}
});
