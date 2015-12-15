import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({

  name: faker.list.cycle('Zisola Sicilia',
    'Ribera del Duero',
    'Clos Fourtet St.-Emilion',
    'Blandy Bual Madeira',
    'Baer Ursa',
    'Tenet Syrah Columbia Valley',
    'Oddero Barolo',
    'Lavau Gigondas',
    'Duorum Douro',
    'Philippe Alliet Chinon',
    'Orin Swift Machete'),

  quantity: faker.list.random(23, 54, 12, 10, 4, 280),

  age: 10,
  recommended: true,

  inStock() {
    return this.quantity > 0;
  },

  cellar(i) {
    return `Cellar ${i}`;
  },

});
