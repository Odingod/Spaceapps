	$.fn.serializeObject = function()
{
	var request = {};
	request.action="ObservationRequest";
    var observation = [];
    var a = this.serializeArray();
    $.each(a, function() {	
		var item = {}
		item2 = {}
		item2.field_id = this.name || '';
		item2.field_value = this.value || '';
		alert("Jees!");
		item["field"]=item2,
		observation.push(item)
    });
    request.observation = observation;
	var o = {};
	o.request =request;
	console.log(JSON.stringify(o));
};
	
	function myFunction(){
		var formData = $("form.Havainto").serializeObject();
		console.log(JSON.stringify(formData));
	}
