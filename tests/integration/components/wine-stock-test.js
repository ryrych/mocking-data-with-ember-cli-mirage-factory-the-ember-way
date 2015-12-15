import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from 'winebar/tests/helpers/start-mirage';
import makeWineObject from 'winebar/tests/helpers/make-wine-object';

moduleForComponent('wine-stock', 'Integration | Component | wine stock', {
  integration: true,
  setup() {
    startMirage(this.container);
  }
});

test('it renders empty', function(assert) {
  assert.expect(1);

  this.render(hbs`{{wine-stock}}`);

  assert.equal(this.$('h1').text(), 'Wine Stock');

});

test('it renders wines in dropdown and list', function(assert) {
  assert.expect(5);
  const model = server.createList('wine', 12).map(wine => makeWineObject({factoryObject: wine}));

  this.set('model', model);
  this.render(hbs`{{wine-stock wines=model}}`);

  // check wines are included in dropdown

  const $dropdown = this.$('.dropdown');

  assert.equal($dropdown.find('option:eq(0)').text(), model.objectAt(0).get('label'));
  assert.equal($dropdown.find('option:eq(1)').text(), model.objectAt(1).get('label'));

  const $list = this.$('.wines');

  assert.equal($dropdown.find('option:eq(0)').text(), model.objectAt(0).get('label'));
  assert.equal($dropdown.find('option:eq(8)').text(), model.objectAt(8).get('label'));
  assert.ok($list.find('.wine').length);
});

test('it reacts to updates', function(assert) {
  assert.expect(3);

  const model = server.createList('wine', 3).map(wine => Ember.Object.create(wine));

  const firstWine = model.objectAt(0),
    lastWine = model.objectAt(2),
    firstQty = parseInt(firstWine.get('quantity')),
    lastQty = parseInt(lastWine.get('quantity'));

  // check external action with correct values

  this.set('model', model);
  this.set('updateStock', (model) => {
    const json = model.getProperties('name', 'quantity');
    const name = firstWine.get('name');
    assert.deepEqual(json, { name: name, quantity: firstQty-3 });
  });
  this.render(hbs`{{wine-stock wines=model sellWines=(action updateStock)}}`);

  this.$('.quantity').val(3).trigger('change');
  this.$(`option:contains("${firstWine.get('name')}")`).prop('selected', true).trigger('change');
  this.$('.button').click();

  // check values have been reset

  assert.equal(this.$('.quantity').val(), "");

  // check once again

  this.set('updateStock', (model) => {
    const json = model.getProperties('name', 'quantity');
    const name = lastWine.get('name');
    assert.deepEqual(json, { name: name, quantity: lastQty-10 });
  });

  this.$('.quantity').val(10).trigger('change');
  this.$(`option:contains("${lastWine.get('name')}")`).prop('selected', true).trigger('change');
  this.$('.button').click();

});
