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

Field.prototype.isHidden = function(){
	return (this.fieldData['field_hidden']) ? this.fieldData['field_hidden'] : false;
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
	
	var hours = tD.getHours();
	var minutes = tD.getMinutes();
	var seconds = tD.getSeconds();
	
	if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
	
	
	var timestr = hours + ":" + minutes + ":" +  seconds;
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
		category    = conf.result.category,
		fieldData   = (observation.field && observation.field.length) ?
			observation.field : [],

		specData    = (category.specific && category.specific.length) ?
			category.specific : [];

	console.log(category['name']);
    $e.attr('data-category',category['name']);

	for (var i = 0; i < specData.length; i++) {
		specData[i].field_hidden = true;
	}

	fieldData = fieldData.concat(specData);

	var renderedFields = ['<fieldset>'];

	for (var i = 0; i < fieldData.length; i++) {
		var datum = fieldData[i];

		var Constructor = (constructorMapper.hasOwnProperty(datum['field_type'])) ?
			constructorMapper[datum['field_type']] : Field;

		var field = new Constructor(datum);

		var render = (field.isHidden()) ? [
			'<div class="hidden-field">',
			field.render(),
			'</div>'
		].join('') : field.render();
		
		renderedFields.push(render);
		
	}

	renderedFields.push([
		'<div class="form-group submits">',
			'<div class="col-xs-6">',
				'<input type="button" class="btn btn-default btn-block" id="nappula" value="Lähetä" onclick="myFunction()">',
			'</div>',
			'<div class="col-xs-6">',
				'<input type="button" class="btn btn-default btn-block" id="nappula2" value="Kuva" onclick="getImageBase64()">',
			'<div>',
		'</div>',
		'</fieldset>'
	].join(''));

	console.log($e);

	$e.html(renderedFields.join(''));

};

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
	console.log(JSON.stringify(o));
	
	return o;
};

})(window.jQuery);
