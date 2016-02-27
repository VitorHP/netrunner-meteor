// Game 
Game.remove("7MGuiovynhY2TgsbJ")

Game.insert({
  "_id" : "7MGuiovynhY2TgsbJ",
  "runnerId" : "7MGuiovynhY2TgsbJ",
  "corpId" : "7MGuiovynhY2TgsbJ",
  "turnOwner" : "corp"
})

// Decks

Decks.remove({ _id: "sfHfp6WobMieubfYZ"})
Decks.remove({ _id: "56d1aef3d330b6eba537beaa"})

Decks.insert({
  "_id" : "sfHfp6WobMieubfYZ",
  "name" : "Haas Bioroid",
  "identityCardId" : 54,
  "cardIds" : [54, 55],
  "faction" : "corp"
})

Decks.insert({
  "_id" : "56d1aef3d330b6eba537beaa",
  "name" : "Noise",
  "identityCardId" : 1,
  "cardIds" : [1, 7],
  "faction" : "runner"
})

// Runner

Runner.remove("7MGuiovynhY2TgsbJ")

Runner.insert({
  "_id" : "7MGuiovynhY2TgsbJ",
  "deckId" : "56d1aef3d330b6eba537beaa",
  "backgroundImgSrc" : "images/cards/runner-background.png",
  "clicks" : 1,
  "credits" : 0,
  "deckCards" : [],
  "discard" : [],
  "hand" : [7],
  "identityCardId" : 1,
  "programs" : [],
  "hardwares" : [],
  "resources" : []
})

// Corp

Corp.remove("7MGuiovynhY2TgsbJ")
Corp.insert({
  "_id" : "7MGuiovynhY2TgsbJ",
  "deckId" : "sfHfp6WobMieubfYZ",
  "backgroundImgSrc" : "images/cards/corp-background.png",
  "clicks" : 1,
  "credits" : 0,
  "deckCards" : [],
  "discard" : [],
  "hand" : [55],
  "identityCardId" : 54,
  "servers" : []
})

// Cards

Cards.remove("3gRNkaG99J5goYjKD")
Cards.remove("tzJTsy5LxBj7FNhhc")
Cards.remove("8dXPsvfXFmCeHHnHf")
Cards.remove("56d1aef3d330b6eba537beaa")

Cards.insert({
  "_id" : "3gRNkaG99J5goYjKD",
  "name" : "Noise - Hacker Extraordinaire",
  "faction" : "runner",
  "factionName" : "criminal",
  "imgSrc" : "images/cards/core/bc0f047c-01b1-427f-a439-d451eda01001.jpg",
  "cardId" : 1,
  "type" : "identity"
})

Cards.insert({
  "_id" : "tzJTsy5LxBj7FNhhc",
  "name" : "Corroder",
  "faction" : "runner",
  "factionName" : "criminal",
  "imgSrc" : "images/cards/core/bc0f047c-01b1-427f-a439-d451eda01007.jpg",
  "cardId" : 7,
  "type" : "program"
})

Cards.insert({
  "_id" : "8dXPsvfXFmCeHHnHf",
  "name" : "Haas-Bioroid - Engineering the future",
  "faction" : "corp",
  "factionName" : "haas-bioroid",
  "imgSrc" : "images/cards/core/bc0f047c-01b1-427f-a439-d451eda01054.jpg",
  "cardId" : 54,
  "type" : "identity"
})

Cards.insert({
  "_id" : "56d1aef3d330b6eba537beaa",
  "name" : "Accelerated Beta Test",
  "faction" : "corp",
  "factionName" : "haas-bioroid",
  "imgSrc" : "images/cards/core/bc0f047c-01b1-427f-a439-d451eda01055.jpg",
  "cardId" : 55,
  "type" : "agenda"
})
