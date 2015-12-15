import Ember from 'ember';

const wineObject = Ember.Object.extend({
  label: Ember.computed('name', 'quantity', function() {
    return `${this.get('name')} (${this.get('quantity')})`;
  }),
});

export default function makeWineObject({factoryObject}) {
  return wineObject.create(factoryObject);
}
