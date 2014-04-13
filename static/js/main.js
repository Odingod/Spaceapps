(function($){

$(document).ready(function(){

	$.ajax({
	    url: '/api',
	    type: 'POST',
	    data: '{"request": {"Action":"FormTemplateRequest","Category":"2"}}',
	    contentType: 'application/json',
	    success: function (result) {
	    	$('.test-form').formRenderer({
	    		result:result,
	    		options:{}
	    	});
			console.log(result);
	    },
	    error: function (jqXHR, tranStatus, errorThrown) {
	        console.log({
	            'Status' :jqXHR.status + ' ' + jqXHR.statusText,
	            'Response': jqXHR.responseText
	        });
	    }
	});

});

})(window.jQuery)
