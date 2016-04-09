import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import 'meteor/dburles:collection-helpers';
import R from 'ramda';

import { Players } from '../players/players.js';
import { Cards } from '../cards/cards.js';

export const Runner = new Mongo.Collection('runner');

function rigCards(collection) {
  return collection.map((c) => (
    { card: Cards.findOne({ code: c.card_code }) }
  ));
}

const _runnerHelpers = {
  programCards() {
    return rigCards(this.programs);
  },
  hardwareCards() {
    return rigCards(this.hardware);
  },
  resourceCards() {
    return rigCards(this.resources);
  },
};

Runner.schema = new SimpleSchema({
  _id: { type: String },
  deck_id: { type: String },
  background_img_src: { type: String, defaultValue: 'images/cards/background.png' },
  clicks: { type: Number, defaultValue: 0 },
  max_clicks: { type: Number, defaultValue: 4 },
  credits: { type: Number, defaultValue: 0 },
  deck_cards: { type: [String], defaultValue: [] },
  discard: { type: [String], defaultValue: [] },
  hand: { type: [String] },
  identity_card_code: { type: String, defaultValue: 0 },
  programs: { type: [Object], defaultValue: [] },
  hardware: { type: [Object], defaultValue: [] },
  resources: { type: [Object], defaultValue: [] },
  side_code: { type: String },
  mulligan: { type: Boolean, optional: true },
  ready: { type: Boolean, defaultValue: null },
  'programs.$.card_code': { type: String },
  'hardware.$.card_code': { type: String },
  'resources.$.card_code': { type: String },
});

Runner.helpers(R.merge(Players.commonHelpers, _runnerHelpers));
