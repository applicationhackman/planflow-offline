import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('plan-dropdown', 'Integration | Component | plan dropdown', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{plan-dropdown}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#plan-dropdown}}
      template block text
    {{/plan-dropdown}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
