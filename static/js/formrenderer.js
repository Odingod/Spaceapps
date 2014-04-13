(function($){

'use strict';

var Field = function(fieldData){
	this.fieldData = fieldData;
	
	//Assume not
	this.mandatory = (this.fieldData && this.fieldData['field_mandatory']) ?
		(parseInt(this.fieldData['field_mandatory'],10) && true) : false;
};
Field.prototype.getData = function(){
	return this.fieldData;
};

//Should not get called...
Field.prototype.render = function(){
	return '<p>DO ME</p>';
};

var DateField = function(fieldData){
	Field.call(this,fieldData);
};

DateField.prototype = new Field();
DateField.prototype.render = function(){
	var d = this.fieldData;
	
	var tD = new Date();
	var datestr = tD.getFullYear() + "-" + (tD.getMonth()+ 1) + "-" +  tD.getDate();
	
	return [
		'<div class="form-group"><label for="' + d['field_id'] + '" class="col-lg-2 control-label">' + d['field_label']+ '</label><div class="col-lg-10"><input value="' + datestr + '" name=\"' + d['field_id'] + '\" id=\"' + d['field_id'] + '\"/></div></div>'
	].join('');
};

var TimeField = function(fieldData){
	Field.call(this,fieldData);
};

TimeField.prototype = new Field();
TimeField.prototype.render = function(){
	var d = this.fieldData;
	
	var tD = new Date();
	var timestr = tD.getHours() + ":" + (tD.getMinutes()+ 1) + ":" +  tD.getSeconds();
	return [
		'<div class="form-group"><label for="' + d['field_id'] + '" class="col-lg-2 control-label">' + d['field_label']+ '</label><div class="col-lg-10"><input value="' + timestr + '" name=\"' + d['field_id'] + '\" id=\"' + d['field_id'] + '\"/></div></div><br>'
	].join('');
};

var CoordinateField = function(fieldData){
	Field.call(this,fieldData);
};

CoordinateField.prototype = new Field();
CoordinateField.prototype.render = function(){
	var d = this.fieldData;
	navigator.geolocation.getCurrentPosition(GetLocation);
	return [
		'<div class="form-group"><label for="' + d['field_id'] + '" class="col-lg-2 control-label">' + d['field_label']+ '</label><div class="col-lg-10"><input name=\"' + d['field_id'] + '\" id=\"' + d['field_id'] + '\" maxlength=\"' + d['field_max_length'] + '\"/></div></div><br>'
	].join('');
};

var TextField = function(fieldData){
	Field.call(this,fieldData);
};

TextField.prototype = new Field();
TextField.prototype.render = function(){
	var d = this.fieldData;
	return [	
		'<div class="form-group"><label for="' + d['field_id'] + '" class="col-lg-2 control-label">' + d['field_label']+ '</label><div class="col-lg-10"><input name=\"' + d['field_id'] + '\" id=\"' + d['field_id'] + '\" maxlength=\"' + d['field_max_length'] + '\"/></div></div><br>'
	].join('');
};

var CheckBoxField = function(fieldData){
	Field.call(this,fieldData);
};

CheckBoxField.prototype = new Field();
CheckBoxField.prototype.render = function(){
	var d = this.fieldData;
	return [
		'<div class="form-group"><label for="' + d['field_id'] + '" class="col-lg-2 control-label">' + d['field_label']+ '</label><div class="col-lg-10"><input type="checkbox" name=\"' + d['field_id'] + '\" id=\"' + d['field_id'] + '\"/></div></div>'
	].join('');
};

var SelectField = function(fieldData){
	Field.call(this,fieldData);
};

SelectField.prototype = new Field();
SelectField.prototype.render = function(){
	var d = this.fieldData;
	
	var options;
	for (var key in d['values']){
		for (var key2 in d['values'][key]){
			options = options + '<option value=\"' + d['values'][key][key2]['value_id'] + '\">' + d['values'][key][key2]['value_name'] + '</option>';
	}
	}
	return [
		'<div class="form-group"><label for="' + d['field_id'] + '" class="col-lg-2 control-label">' + d['field_label']+ '</label><div class="col-lg-10"><select name=\"' + d['field_id'] + '">' + options + '</select></div></div><br>'
	].join('');
};

//Map field_type to a constructor
var constructorMapper = {
	'date' : DateField,
	'time' : TimeField,
	'coordinate': CoordinateField,
	'text': TextField,
	'checkbox': CheckBoxField,
	'select': SelectField
};

//Register the jQuery plugin
$.fn.formRenderer = function(conf){

	var $e = this,
		observation = conf.result.observation,
		fieldData   = (observation.field && observation.field.length) ?
			observation.field : [];
			
		observation = conf.result.observation,
		fieldData   = (observation.field && observation.field.length) ?
			observation.field : [];	

	var renderedFields = ['<fieldset>'];


	for (var i = 0; i < fieldData.length; i++) {
		var datum = fieldData[i];

		var Constructor = (constructorMapper.hasOwnProperty(datum['field_type'])) ?
			constructorMapper[datum['field_type']] : Field;

		var field = new Constructor(datum);

		console.log(field);
		
		renderedFields.push(field.render());
		
	}

	renderedFields.push('<input type="button" id="nappula" value="Lähetä" onclick="myFunction()"></fieldset>')
	console.log($e);

	$e.html(renderedFields.join(''));

		$.fn.serializeObject = function()
{
	console.log('paap');
	var request = {};
	request.action="ObservationRequest";
    var observation = [];
    var a = $(":input").serializeArray();
	console.log(this);
	console.log(a);
    $.each(a, function() {	
		var item = {}
		var item2 = {}
		item2.field_id = this.name || '';
		item2.field_value = this.value || '';
		item["field"]=item2,
		observation.push(item)
    });
    request.observation = observation;
	request.source = "SpaceApps2014";
	var o = {};
	o.request =request;
	console.log(JSON.stringify(o));
	
	return o;
};
	

};

})(window.jQuery);
