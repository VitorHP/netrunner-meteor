Cards = new Mongo.Collection('cards');

Cards.schema = new SimpleSchema({
  last_modified: { type: String },
  code: { type: Number },
  title: { type: String },
  type: { type: String },
  type_code: { type: String, allowedValues: ["hardware", "event", "agenda", "program", "identity", "ice"] },
  subtype: { type: String },
  subtype_code: { type: String },
  text: { type: String },
  baselink: { type: Number },
  cost: { type: Number },
  faction: { type: String, allowedValues: ["Haas-Bioroid", "Criminal"] },
  faction_code: { type: String, allowedValues: ["haas-bioroid", "criminal"] },
  faction_letter: { type: String },
  faction_cost: { type: Number },
  flavor: { type: String },
  number: { type: Number },
  quantity: { type: Number },
  set_name: { type: String },
  set_code: { type: String },
  side: { type: String, allowedValues: ["Corp", "Runner"] },
  side_code: { type: String, allowedValues: ["corp", "runner"] },
  uniqueness: { type: Boolean },
  limited: { type: Number },
  cycle_code: { type: String },
  cycle_number: { type: Number },
  img_src: { type: String },
})

Cards.helpers({
  backImgSrc() {
    return this.size === "runner" ? "/images/cards/runner-background.png" : "/images/cards/corp-background.png"
  }
})
