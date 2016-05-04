import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import 'meteor/dburles:collection-helpers';
import R from 'ramda';

import { Players } from '../players/players.js';
import { Cards } from '../cards/cards.js';

export const Corp = new Mongo.Collection('corp');

function serverCard(card) {
  return {
    card: Cards.findOne({ code: card.card_code }),
    rezzed: card.rezzed,
  };
}

const _corpHelpers = {
  centralServerCards(name) {
    return {
      ices: this[name].ices.map(serverCard),
      upgrades: this[name].upgrades.map(serverCard),
    };
  },

  remoteServersCards() {
    return this.remote_servers.reduce((memo, server) => {
      memo.push({
        ices: server.ices.map(serverCard),
        upgrades: server.upgrades.map(serverCard),
        card: Cards.findOne({ code: server.card_code }),
        rezzed: server.rezzed,
      });

      return memo;
    }, []);
  },
};

Corp.schema = new SimpleSchema({
  _id: { type: String },
  deck_id: { type: String },
  background_img_src: { type: String, defaultValue: '/images/cards/corp-background.png' },
  clicks: { type: Number, defaultValue: 0 },
  max_clicks: { type: Number, defaultValue: 3 },
  credits: { type: Number, defaultValue: 0 },
  deck_cards: { type: [String], defaultValue: [] },
  discard: { type: [String], defaultValue: [] },
  identity_card_code: { type: String, defaultValue: 0 },
  hand: { type: [String] },
  max_hand_size: { type: Number, defaultValue: 5 },
  side_code: { type: String },
  type_code: { type: String, defaultValue: 'corp' },
  mulligan: { type: Boolean, optional: true },
  ready: { type: Boolean, defaultValue: null },
  'remote_servers.$.server_id': { type: Number },
  'remote_servers.$.card_code': { type: String, optional: true },
  'remote_servers.$.rezzed': { type: Boolean, optional: true },
  'remote_servers.$.upgrades': { type: [Object] },
  'remote_servers.$.upgrades.$.card_code': { type: String },
  'remote_servers.$.upgrades.$.rezzed': { type: Boolean },
  'remote_servers.$.ices': { type: [Object] },
  'remote_servers.$.ices.$.card_code': { type: String },
  'remote_servers.$.ices.$.rezzed': { type: Boolean },
  'hq.ices.$.card_code': { type: String },
  'hq.ices.$.rezzed': { type: Boolean },
  'hq.upgrades.$.card_code': { type: String },
  'hq.upgrades.$.rezzed': { type: Boolean },
  'archives.ices.$.card_code': { type: String },
  'archives.ices.$.rezzed': { type: Boolean },
  'archives.upgrades.$.card_code': { type: String },
  'archives.upgrades.$.rezzed': { type: Boolean },
  'rnd.ices.$.card_code': { type: String },
  'rnd.ices.$.rezzed': { type: Boolean },
  'rnd.upgrades.$.card_code': { type: String },
  'rnd.upgrades.$.rezzed': { type: Boolean },
});

Corp.helpers(R.merge(Players.commonHelpers, _corpHelpers));
