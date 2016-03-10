function seedData(collection, data) {
  let ids = data.map(function(d){ return d["_id"] })

  ids.forEach(function(id){ collection.remove(id) })

  data.forEach(function(item){
    collection.insert(item)
  })
}

// Game 

seedData(Game, [{
  "_id" : "7MGuiovynhY2TgsbJ",
  "runnerId" : "7MGuiovynhY2TgsbJ",
  "corpId" : "7MGuiovynhY2TgsbJ",
  "turnOwner" : "corp"
}])

// Decks

seedData(Decks, [{
    "_id" : "sfHfp6WobMieubfYZ",
    "name" : "Haas Bioroid",
    "identityCardCode" : 54,
    "cardCodes" : [54, 55, 63],
    "side_code" : "corp"
  }, {
    "_id" : "56d1aef3d330b6eba537beaa",
    "name" : "Noise",
    "identityCardCode" : 1,
    "cardCodes" : [1, 7, 23, 31],
    "side_code" : "runner"
}])

// Runner

seedData(Runner, [{
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
}])

// Corp

seedData(Corp, [{
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
}])

// Cards

seedData(Cards, [{
  "_id" : "3gRNkaG99J5goYjKD",
  "title" : "Noise - Hacker Extraordinaire",
  "side" : "Runner",
  "side_code" : "runner",
  "faction" : "Criminal",
  "faction_code" : "Criminal",
  "imgSrc" : "images/cards/core/bc0f047c-01b1-427f-a439-d451eda01001.jpg",
  "code" : 1,
  "type_code" : "identity"
}, {
  "_id" : "tzJTsy5LxBj7FNhhc",
  "title" : "Corroder",
  "side" : "Runner",
  "side_code" : "runner",
  "faction" : "Criminal",
  "faction_code" : "Criminal",
  "imgSrc" : "images/cards/core/bc0f047c-01b1-427f-a439-d451eda01007.jpg",
  "code" : 7,
  "type_code" : "program"
}, {
  "_id": "56db38b58820a734731a09ab",
  "title": "Lemuria Codecracker",
  "type": "Hardware",
  "type_code": "hardware",
  "faction": "Criminal",
  "faction_code": "criminal",
  "imgSrc" : "images/cards/core/bc0f047c-01b1-427f-a439-d451eda01023.jpg",
  "code": 23
}, {
  "_id": "56db38c78820a734731a09ac",
  "title": "Data Dealer",
  "type": "Resource",
  "type_code": "resource",
  "faction": "Criminal",
  "faction_code": "criminal",
  "imgSrc" : "images/cards/core/bc0f047c-01b1-427f-a439-d451eda01031.jpg",
  "code": 31
}, {
  "_id" : "8dXPsvfXFmCeHHnHf",
  "title" : "Haas-Bioroid - Engineering the future",
  "side" : "Corp",
  "side_code" : "corp",
  "faction" : "Haas-Bioroid",
  "faction_code" : "haas-bioroid",
  "imgSrc" : "images/cards/core/bc0f047c-01b1-427f-a439-d451eda01054.jpg",
  "code" : 54,
  "type_code" : "identity"
}, {
  "_id" : "56d1aef3d330b6eba537beaa",
  "title" : "Accelerated Beta Test",
  "side" : "Corp",
  "side_code" : "corp",
  "faction" : "Haas-Bioroid",
  "faction_code" : "haas-bioroid",
  "imgSrc" : "images/cards/core/bc0f047c-01b1-427f-a439-d451eda01055.jpg",
  "code" : 55,
  "type_code" : "agenda"
}, {
  "_id" : "56dafef188583c47259f9dd1",
  "title": "Viktor 1.0",
  "side" : "Corp",
  "side_code" : "corp",
  "faction" : "Haas-Bioroid",
  "faction_code" : "haas-bioroid",
  "imgSrc" : "/images/cards/core/bc0f047c-01b1-427f-a439-d451eda01063.jpg",
  "code": 63,
  "type_code": "ice",
}])
