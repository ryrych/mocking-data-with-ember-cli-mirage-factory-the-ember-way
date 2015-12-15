import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    submit() {
      const wine = this.get('selectedWine');
      const newQty = this.get('selectedQuantity');
      wine.decrementProperty('quantity', newQty);
      this.attrs.sellWines(wine);

      // reset form
      this.setProperties({ selectedWine: null, selectedQuantity: null });

    }
  }

});
