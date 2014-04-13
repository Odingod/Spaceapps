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
		var catID = $('.category-selector').val();

		for (var i = 0; i < templates.length; i++) {
			var t = templates[i];
			if(t.category.sorting == catID){
				$('.test-form').formRenderer({
		    	 	result:t,
		    	 	options:{}
		    	 });
				break;
			}
		}

	}

	function onTemplates(){
		console.log(templates);

		var options = [];

		for (var i = 0; i < templates.length; i++) {
			var t = templates[i];

			options.push('<option value="' + t.category.sorting + '">' + t.category.title + '</option>');

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
