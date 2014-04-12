	$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {		
		var oField = {}
		oField["field_id"] = this.name || '';
		oField["field_value"] = this.value || '';
		
		if (o["field"] !== undefined){
			o["field"].push(oField);
		} else {
			o["field"] = oField;
		}
    });
    return o;
};
	
	function myFunction(){
		var formData = $("form.Havainto").serializeObject();
		console.log(JSON.stringify(formData));
	}
