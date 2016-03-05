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
  "identityCardCode" : 54,
  "cardCodes" : [54, 55, 63],
  "side_code" : "corp"
})

Decks.insert({
  "_id" : "56d1aef3d330b6eba537beaa",
  "name" : "Noise",
  "identityCardCode" : 1,
  "cardCodes" : [1, 7, 23, 31],
  "side_code" : "runner"
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
  "hand" : [7, 23, 31],
  "identityCardCode" : 1,
  "programs" : [],
  "hardware" : [],
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
  "hand" : [55, 63],
  "identityCardCode" : 54,
  "remoteServers" : []
})

// Cards

Cards.remove("3gRNkaG99J5goYjKD")
Cards.remove("tzJTsy5LxBj7FNhhc")
Cards.remove("8dXPsvfXFmCeHHnHf")
Cards.remove("56d1aef3d330b6eba537beaa")
Cards.remove("56dafef188583c47259f9dd1")
Cards.remove("56db38b58820a734731a09ab")
Cards.remove("56db38c78820a734731a09ac")

Cards.insert({
  "_id" : "3gRNkaG99J5goYjKD",
  "title" : "Noise - Hacker Extraordinaire",
  "side" : "Runner",
  "side_code" : "runner",
  "faction" : "Criminal",
  "faction_code" : "Criminal",
  "imgSrc" : "images/cards/core/bc0f047c-01b1-427f-a439-d451eda01001.jpg",
  "code" : 1,
  "type_code" : "identity"
})

Cards.insert({
  "_id" : "tzJTsy5LxBj7FNhhc",
  "title" : "Corroder",
  "side" : "Runner",
  "side_code" : "runner",
  "faction" : "Criminal",
  "faction_code" : "Criminal",
  "imgSrc" : "images/cards/core/bc0f047c-01b1-427f-a439-d451eda01007.jpg",
  "code" : 7,
  "type_code" : "program"
})

Cards.insert({
  "_id": "56db38b58820a734731a09ab",
  "title": "Lemuria Codecracker",
  "type": "Hardware",
  "type_code": "hardware",
  "faction": "Criminal",
  "faction_code": "criminal",
  "imgSrc" : "images/cards/core/bc0f047c-01b1-427f-a439-d451eda01023.jpg",
  "code": 23
})

Cards.insert({
  "_id": "56db38c78820a734731a09ac",
  "title": "Data Dealer",
  "type": "Resource",
  "type_code": "resource",
  "faction": "Criminal",
  "faction_code": "criminal",
  "imgSrc" : "images/cards/core/bc0f047c-01b1-427f-a439-d451eda01031.jpg",
  "code": 31
})

Cards.insert({
  "_id" : "8dXPsvfXFmCeHHnHf",
  "title" : "Haas-Bioroid - Engineering the future",
  "side" : "Corp",
  "side_code" : "corp",
  "faction" : "Haas-Bioroid",
  "faction_code" : "haas-bioroid",
  "imgSrc" : "images/cards/core/bc0f047c-01b1-427f-a439-d451eda01054.jpg",
  "code" : 54,
  "type_code" : "identity"
})

Cards.insert({
  "_id" : "56d1aef3d330b6eba537beaa",
  "title" : "Accelerated Beta Test",
  "side" : "Corp",
  "side_code" : "corp",
  "faction" : "Haas-Bioroid",
  "faction_code" : "haas-bioroid",
  "imgSrc" : "images/cards/core/bc0f047c-01b1-427f-a439-d451eda01055.jpg",
  "code" : 55,
  "type_code" : "agenda"
})

Cards.insert({
  "_id" : "56dafef188583c47259f9dd1",
  "title": "Viktor 1.0",
  "side" : "Corp",
  "side_code" : "corp",
  "faction" : "Haas-Bioroid",
  "faction_code" : "haas-bioroid",
  "imgSrc" : "/images/cards/core/bc0f047c-01b1-427f-a439-d451eda01063.jpg",
  "code": 63,
  "type_code": "ice",
})
