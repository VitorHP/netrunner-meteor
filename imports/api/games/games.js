import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Game = new Mongo.Collection('game');

Game.schema = new SimpleSchema({
  _id: { type: String },
  turn_owner: { type: String, defaultValue: 'corp', allowedValues: ['corp', 'runner'] },
  runner_id: { type: String },
  corp_id: { type: String },
});
