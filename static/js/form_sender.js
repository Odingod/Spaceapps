function sendForm(){
	console.log('piip');
	var imageForm = $("#img1");
	console.log(imageForm);
	
	var formData = $(".test-form").serializeObject();
	console.log(formData);
		
	$.ajax({
	url: '/api',
	type: 'POST',
	data: JSON.stringify(formData),
	contentType: 'application/json',
	success: function (result) {
		console.log(JSON.stringify(result));
		console.log(result.response_type);
		if (result.response_type == "Error"){
			var alrt = result.error[0] || result.error;
			alert(alrt.response_message);
		} else if (document.getElementById('img1') !== null){
			addImage(result);
		} else {
			alert("Ei ole kuvaa!");
		}
			
	},
	error: function (jqXHR, tranStatus, errorThrown) {
		console.log({
			'Status' :jqXHR.status + ' ' + jqXHR.statusText,
			'Response': jqXHR.responseText
		});
	}
	
	
});

//document.write("Thank you!");
}

function addImage(res){
	var imgData = 0;
	var request = {};
	request.action="ObservationAddImageRequest";
	var image = {};
	image.encoding="Base64";
	image.image_data=getImageBase64();
	image.image_name=document.getElementById('img1').name;
	image.mimetype="image/jpg";
	image.observation_id=res.observation_id;
	image.observation_image = "1";
	image.observation_modification_key=res.observation_modification_key;
	request.image=image;
	
	data = {};
	data.request = request;
	console.log(JSON.stringify(data));
	console.log(res.observation_id);
	$.ajax({
	url: '/api',
	type: 'POST',
	data: JSON.stringify(data),
	contentType: 'application/json',
	success: function (result) {
		console.log(JSON.stringify(result));
		if (result.response_type == "Error"){
			var alrt = result.error[0] || result.error;
			alert(alrt.response_message);
		} else {
			alert("Kuva lähetetty");
		}
		
	},
	error: function (jqXHR, tranStatus, errorThrown) {
		console.log({
			'Status' :jqXHR.status + ' ' + jqXHR.statusText,
			'Response': jqXHR.responseText
		});
	}
});
	
}

function getImageBase64(){
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	var img = document.getElementById('img1');
	console.log(img.name);
	context.drawImage(img, 0, 0 );

	var dataURL = img.src;
	return  dataURL.replace(/^data:image\/(png|jpeg);base64,/ , "");
}

$.fn.serializeObject = function() {
	console.log('paap');
	var request = {};
	request.action="ObservationAddRequest";
    var observation = [];
    var a = $(":input").serializeArray();
	console.log(this);
	console.log(a);
    $.each(a, function() {	
		var item = {}
		var item2 = {}
		item2.field_id = this.name || '';
		item2.field_value = this.value || '';
		item["field"]=item2;
		observation.push(item);
    });
	
	observation.push({
		"category":{
			"field":{
				"field_id": "category_id",
				"field_value": this.attr('data-category')
			}
		}
	});
	
    request.observation = observation;
	request.source = "SpaceApps2014";
	var o = {};
	o.request =request;
	console.log(o);
	
	return o;
};