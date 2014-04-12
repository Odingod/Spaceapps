	$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
	
	var o.field = {}
	o.field["field_id] = this.name || '';
	
	if (o["field"] !== undefined){
        if (o["field"]["field_id"] !== undefined){
			alert("Jee!");
			if (!o["field"].push) {
				o["field"] = [o["field"]];
			}
			o["field"]["field_id"].push(this.name || '');
			o["field"]["field_value"].push(this.value || '');
		} else {
			o["field"]["field_id"] = this.name || '';
			o["field"]["field_value"] = this.value || '';
		}
	} else {
		o["field"] = this.name || '';
	}
	
    });
    return o;
};
	
	function myFunction(){
		var formData = $("form.Havainto").serializeObject();
		console.log(JSON.stringify(formData));
	}
