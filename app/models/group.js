import DS from 'ember-data';

export default DS.Model.extend({
		name 			: DS.atrr('string'),
		createdtime 	: DS.attr('date'),
		modifiedtime 	: DS.attr('date'),  
		flows 			: DS.attr('')

});
