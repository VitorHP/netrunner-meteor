Decks = new Mongo.Collection('decks')

Decks.schema = new SimpleSchema({
  name: { type: String },
  side_code: { type: String, allowedValues: ["corp", "runner"] },
  cardCodes: { type: [Number], defaultValue: [] },
  identityCardCode: { type: Number },
})
