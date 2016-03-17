Decks = new Mongo.Collection('decks')

Decks.schema = new SimpleSchema({
  name: { type: String },
  side_code: { type: String, allowedValues: ["corp", "runner"] },
  identityCardCode: { type: String },
  cards: { type: Object, defaultValue: [] }
})
