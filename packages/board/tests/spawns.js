Spawn.register("Runner", {
  "_id" : "7MGuiovynhY2TgsbJ",
  "deckId" : "sfHfp6WobMieubfYZ",
  "backgroundImgSrc" : "images/cards/background.png",
  "clicks" : 2,
  "credits" : 1,
  "deckCards" : ["01002", "01003"],
  "discard" : [],
  "hand" : [],
  "side_code" : "runner",
  "ready" : false,
  "identityCardCode" : "01001",
  "programs" : [],
  "hardware" : [],
  "resources" : []
})

Spawn.register("Corp", {
  "_id" : "7MGuiovynhY2TgsbJ",
  "deckId" : "sfHfp6WobMieubfYZ",
  "backgroundImgSrc" : "images/cards/corp-background.png",
  "clicks" : 2,
  "credits" : 1,
  "deckCards" : [],
  "discard" : [],
  "hand" : ["01002", "01003"],
  "side_code" : "corp",
  "ready" : false,
  "identityCardCode" : "01001",
  "remoteServers" : []
})

Spawn.register("Game", {
  "_id" : "7MGuiovynhY2TgsbJ",
  "runnerId" : "7MGuiovynhY2TgsbJ",
  "corpId" : "7MGuiovynhY2TgsbJ",
  "turnOwner" : "corp"
})

Spawn.register("Card", {
  "_id" : "3gRNkaG99J5goYjKD",
  "title" : "Noise - Hacker Extraordinaire",
  "side" : "Runner",
  "side_code" : "runner",
  "faction" : "Criminal",
  "faction_code" : "Criminal",
  "imgSrc" : "images/cards/core/bc0f047c-01b1-427f-a439-d451eda01001.jpg",
  "code" : "01001",
  "type_code" : "identity"
})
