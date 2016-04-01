export const Decks = new Mongo.Collection('decks')

Decks.schema = new SimpleSchema({
  name: { type: String },
  side_code: { type: String, allowedValues: ["corp", "runner"] },
  identity_card_code: { type: String },
  cards: { type: Object, defaultValue: [] }
})
