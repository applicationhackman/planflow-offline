import DS from 'ember-data';

export default DS.Model.extend({
		name 			: DS.attr('string'),
		createdtime 	: DS.attr('date'),
		modifiedtime 	: DS.attr('date'),
		nodes 			: DS.attr(''),
		nconnections 	: DS.attr(''),
		flowtype		: DS.attr('string')
});
