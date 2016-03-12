Cards = new Mongo.Collection('cards');

Cards.schema = new SimpleSchema({
  title: { type: String },
  imgSrc: { type: String },
  code: { type: Number },
  side: { type: String, allowedValues: ["Corp", "Runner"] },
  side_code: { type: String, allowedValues: ["corp", "runner"] },
  faction: { type: String, allowedValues: ["Haas-Bioroid", "Criminal"] },
  faction_code: { type: String, allowedValues: ["haas-bioroid", "criminal"] },
  type_code: { type: String, allowedValues: ["agenda", "program", "identity", "ice"] }
})

Cards.helpers({
  backImgSrc() {
    return this.size === "runner" ? "/images/cards/runner-background.png" : "/images/cards/corp-background.png"
  }
})
