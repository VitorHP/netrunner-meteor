Game = new Mongo.Collection('game')

Game.schema = new SimpleSchema({
_id: { type: String },
turnOwner: { type: String, defaultValue: "corp", allowedValues: ["corp", "runner"] },
runnerId: { type: String },
corpId: { type: String }
})
