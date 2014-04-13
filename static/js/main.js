(function($){

$(document).ready(function(){

	var templates = [];

	function requestTemplates(id){
		$.ajax({
		    url: '/api',
		    type: 'POST',
		    data: '{"request": {"Action":"FormTemplateRequest","Category":"' + id + '"}}',
		    contentType: 'application/json',
		    success: function (result) {
		    	
				if(!(result['response_type'] && result['response_type'] === 'Error')){
					templates.push(result);
					requestTemplates(id+1);
				} else onTemplates();
		    },
		    error: function (jqXHR, tranStatus, errorThrown) {
		        console.log({
		            'Status' :jqXHR.status + ' ' + jqXHR.statusText,
		            'Response': jqXHR.responseText
		        });
		    }
		});
	}

	function setCategory(){
		var catName = $('.category-selector').val();

		for (var i = 0; i < templates.length; i++) {
			var t = templates[i];

			if(t.category.name === catName){
				console.log(t);
				$('.test-form').formRenderer({
		    	 	result:t,
		    	 	options:{}
		    	 });
				return;
			}
		}

	}

	function onTemplates(){

		var options = [];

		for (var i = 0; i < templates.length; i++) {
			var t = templates[i];

			options.push('<option value="' + t.category.name + '">' + t.category.title + '</option>');

		}

		$('.category-selector')
			.html(options.join(''))
			.on('change',setCategory)
			.show();
		$('.category-loader').hide();

		setCategory();
	}

	requestTemplates(1);

	

});

})(window.jQuery)
