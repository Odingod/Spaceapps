(function($){

'use strict';

var Field = function(fieldData){
	this.fieldData = fieldData;
};
Field.prototype.getData = function(){
	return this.fieldData;
};
Field.prototype.isMandatory = function(){
	//Assume not
	return (this.fieldData['field_mandatory']) ?
		(parseInt(this.fieldData['field_mandatory'],10)) && true : false;
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
	return [
		'<div>DATE FIELD: ' + d['field_label'] + '</div>'
	].join('');
};

var TimeField = function(fieldData){
	Field.call(this,fieldData);
};

TimeField.prototype = new Field();
TimeField.prototype.render = function(){
	var d = this.fieldData;
	return [
		'<div>TIME FIELD: ' + d['field_label'] + '</div>'
	].join('');
};

var CoordinateField = function(fieldData){
	Field.call(this,fieldData);
};

CoordinateField.prototype = new Field();
CoordinateField.prototype.render = function(){
	var d = this.fieldData;
	return [
		'<div>COORDINATE FIELD: ' + d['field_label'] + '</div>'
	].join('');
};

var TextField = function(fieldData){
	Field.call(this,fieldData);
};

TextField.prototype = new Field();
TextField.prototype.render = function(){
	var d = this.fieldData;
	return [
		'<div>TEXT FIELD: ' + d['field_label'] + '</div>'
	].join('');
};

var CheckBoxField = function(fieldData){
	Field.call(this,fieldData);
};

CheckBoxField.prototype = new Field();
CheckBoxField.prototype.render = function(){
	var d = this.fieldData;
	return [
		'<div>CHECKBOX FIELD: ' + d['field_label'] + '</div>'
	].join('');
};

var SelectField = function(fieldData){
	Field.call(this,fieldData);
};

SelectField.prototype = new Field();
SelectField.prototype.render = function(){
	var d = this.fieldData;
	return [
		'<div>SELECT FIELD: ' + d['field_label'] + '</div>'
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

	var renderedFields = [];


	for (var i = 0; i < fieldData.length; i++) {
		var datum = fieldData[i];

		var Constructor = (constructorMapper.hasOwnProperty(datum['field_type'])) ?
			constructorMapper[datum['field_type']] : Field;

		var field = new Constructor(datum);

		console.log(field);

		renderedFields.push(field.render());
	}

	console.log($e);

	$e.html(renderedFields.join(''));


};

})(window.jQuery);
