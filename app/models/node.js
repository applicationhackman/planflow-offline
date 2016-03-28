import DS from 'ember-data';

export default DS.Model.extend({
		name : DS.atrr('string'),
		createdtime 	: DS.attr('date'),
		modifiedtime 	: DS.attr('date'),
		backgroundcolor : DS.attr('string'),
		textcolor 		: DS.attr('string'),
		icon 			: DS.attr('string'),
		imageurl 		: DS.attr('string'),
		bordercolor 	: DS.attr('string'),
		borderstyle 	: DS.attr('string'),
		borderwidth 	: DS.attr('string'),
		left 			: DS.attr('number'),
		top 			: DS.attr('number')
});
