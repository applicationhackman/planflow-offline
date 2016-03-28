import DS from 'ember-data';

export default DS.Model.extend({
		pid  : DS.attr('string'),
		name : DS.attr('string'),
		createdtime 	: DS.attr('date'),
		modifiedtime 	: DS.attr('date'),
		left			: DS.attr('number'),
		top				: DS.attr('number')
});
