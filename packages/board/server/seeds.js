function seedData(collection, data) {
  let ids = collection.find().fetch().map(function(d){ return d["_id"] })

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
    "identityCardCode" : "01054",
    "cardCodes" : ["01055", "01056", "01057", "01058", "01059"],
    "side_code" : "corp"
  }, {
    "_id" : "56d1aef3d330b6eba537beaa",
    "name" : "Noise",
    "identityCardCode" : "01001",
    "cardCodes" : ["01002", "01003", "01004", "01005", "01006"],
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
  "hand" : ["01001", "01002", "01003", "01004", "01005", "01006"],
  "identityCardCode" : '01001',
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
  "hand" : ["01055", "01056", "01057", "01058", "01059"],
  "identityCardCode" : "01054",
  "remoteServers" : []
}])

// Cards

function sanitizeCardValues(cards) {
  let standardizedProperties = {
    "influencelimit" : "influence_limit",
    "minimumdecksize" : "minimum_deck_size",
    "setname" : "set_name",
    "cyclenumber" : "cycle_number",
  }

  let unusedProperties = [
    "last-modified",
    "flavor",
    "illustrator",
    "ancurLink",
    "url",
    "imagesrc"
  ]

  function imgSrc (card) {
    return `images/cards/core/bc0f047c-01b1-427f-a439-d451eda${card.code}.jpg`
  }

  return cards.reduce(function(memo, card) {
    Object.keys(standardizedProperties).forEach(function(property){
      card[standardizedProperties[property]] = card[property]
      delete card[property]
    })

    unusedProperties.forEach(function(property){
      delete card[property]
    })

    card.img_src = imgSrc(card)

    memo.push(card)

    return memo
  }, [])
}

seedData(Cards, sanitizeCardValues([{
  "last-modified": "2015-01-23T13:12:08+00:00",
  "code": "01001",
  "title": "Noise: Hacker Extraordinaire",
  "type": "Identity",
  "type_code": "identity",
  "subtype": "G-Mod",
  "subtype_code": "g-mod",
  "text": "Whenever you install a <strong>virus</strong> program, the Corp trashes the top card of R&D.",
  "baselink": 0,
  "faction": "Anarch",
  "faction_code": "anarch",
  "faction_letter": "a",
  "flavor": "\"Watch this. It'll be funny.\"",
  "illustrator": "Ralph Beisner",
  "influencelimit": 15,
  "minimumdecksize": 45,
  "number": 1,
  "quantity": 1,
  "setname": "Core Set",
  "set_code": "core",
  "side": "Runner",
  "side_code": "runner",
  "uniqueness": false,
  "limited": 3,
  "cycle_code": "core",
  "cyclenumber": 1,
  "ancurLink": "http://ancur.wikia.com/wiki/Noise",
  "url": "http://netrunnerdb.com/en/card/01001",
  "imagesrc": "/bundles/netrunnerdbcards/images/cards/en/01001.png"
},
{
  "last-modified": "2015-01-23T13:12:08+00:00",
  "code": "01002",
  "title": "Déjà Vu",
  "type": "Event",
  "type_code": "event",
  "subtype": "",
  "subtype_code": "",
  "text": "Add 1 card (or up to 2 <strong>virus</strong> cards) from your heap to your grip.",
  "cost": 2,
  "faction": "Anarch",
  "faction_code": "anarch",
  "faction_letter": "a",
  "factioncost": 2,
  "flavor": "Anything worth doing is worth doing twice.",
  "illustrator": "Tim Durning",
  "number": 2,
  "quantity": 2,
  "setname": "Core Set",
  "set_code": "core",
  "side": "Runner",
  "side_code": "runner",
  "uniqueness": false,
  "limited": 3,
  "cycle_code": "core",
  "cyclenumber": 1,
  "ancurLink": "http://ancur.wikia.com/wiki/D%C3%A9j%C3%A0_Vu",
  "url": "http://netrunnerdb.com/en/card/01002",
  "imagesrc": "/bundles/netrunnerdbcards/images/cards/en/01002.png"
},
{
  "last-modified": "2015-01-23T13:12:08+00:00",
  "code": "01003",
  "title": "Demolition Run",
  "type": "Event",
  "type_code": "event",
  "subtype": "Run - Sabotage",
  "subtype_code": "run - sabotage",
  "text": "Make a run on HQ or R&D. You may trash, at no cost, any cards you access (even if the cards cannot normally be trashed).",
  "cost": 2,
  "faction": "Anarch",
  "faction_code": "anarch",
  "faction_letter": "a",
  "factioncost": 2,
  "flavor": "You ever set something on fire just to watch it burn?",
  "illustrator": "Anna Ignatieva",
  "number": 3,
  "quantity": 3,
  "setname": "Core Set",
  "set_code": "core",
  "side": "Runner",
  "side_code": "runner",
  "uniqueness": false,
  "limited": 3,
  "cycle_code": "core",
  "cyclenumber": 1,
  "ancurLink": "http://ancur.wikia.com/wiki/Demolition_Run",
  "url": "http://netrunnerdb.com/en/card/01003",
  "imagesrc": "/bundles/netrunnerdbcards/images/cards/en/01003.png"
},
{
  "last-modified": "2015-01-23T13:12:08+00:00",
  "code": "01004",
  "title": "Stimhack",
  "type": "Event",
  "type_code": "event",
  "subtype": "Run",
  "subtype_code": "run",
  "text": "Make a run, and gain 9[Credits], which you may use only during this run. After the run is completed, suffer 1 brain damage (cannot be prevented) and return to the bank any of the 9[Credits] not spent.",
  "cost": 0,
  "faction": "Anarch",
  "faction_code": "anarch",
  "faction_letter": "a",
  "factioncost": 1,
  "flavor": "",
  "illustrator": "Rachel Borovic",
  "number": 4,
  "quantity": 3,
  "setname": "Core Set",
  "set_code": "core",
  "side": "Runner",
  "side_code": "runner",
  "uniqueness": false,
  "limited": 3,
  "cycle_code": "core",
  "cyclenumber": 1,
  "ancurLink": "http://ancur.wikia.com/wiki/Stimhack",
  "url": "http://netrunnerdb.com/en/card/01004",
  "imagesrc": "/bundles/netrunnerdbcards/images/cards/en/01004.png"
},
{
  "last-modified": "2015-01-23T13:12:08+00:00",
  "code": "01005",
  "title": "Cyberfeeder",
  "type": "Hardware",
  "type_code": "hardware",
  "subtype": "Chip",
  "subtype_code": "chip",
  "text": "1[Recurring Credits]\r\nUse this credit to pay for using <strong>icebreakers</strong> or for installing <strong>virus</strong> programs.",
  "cost": 2,
  "faction": "Anarch",
  "faction_code": "anarch",
  "faction_letter": "a",
  "factioncost": 1,
  "flavor": "I feel almost naked without it",
  "illustrator": "Gong Studios",
  "number": 5,
  "quantity": 3,
  "setname": "Core Set",
  "set_code": "core",
  "side": "Runner",
  "side_code": "runner",
  "uniqueness": false,
  "limited": 3,
  "cycle_code": "core",
  "cyclenumber": 1,
  "ancurLink": "http://ancur.wikia.com/wiki/Cyberfeeder",
  "url": "http://netrunnerdb.com/en/card/01005",
  "imagesrc": "/bundles/netrunnerdbcards/images/cards/en/01005.png"
},
{
  "last-modified": "2015-01-23T13:12:08+00:00",
  "code": "01006",
  "title": "Grimoire",
  "type": "Hardware",
  "type_code": "hardware",
  "subtype": "Console",
  "subtype_code": "console",
  "text": "+2[Memory Unit]\r\nWhenever you install a <strong>virus</strong> program, place 1 virus counter on that program.\r\nLimit 1 <strong>console</strong> per player.",
  "cost": 3,
  "faction": "Anarch",
  "faction_code": "anarch",
  "faction_letter": "a",
  "factioncost": 2,
  "flavor": "\"My little book of magic spells.\" -The Whizzard",
  "illustrator": "Jonathan Lee",
  "number": 6,
  "quantity": 1,
  "setname": "Core Set",
  "set_code": "core",
  "side": "Runner",
  "side_code": "runner",
  "uniqueness": true,
  "limited": 3,
  "cycle_code": "core",
  "cyclenumber": 1,
  "ancurLink": "http://ancur.wikia.com/wiki/Grimoire",
  "url": "http://netrunnerdb.com/en/card/01006",
  "imagesrc": "/bundles/netrunnerdbcards/images/cards/en/01006.png"
},
{
"last-modified": "2015-01-23T13:12:08+00:00",
"code": "01054",
"title": "Haas-Bioroid: Engineering the Future",
"type": "Identity",
"type_code": "identity",
"subtype": "Megacorp",
"subtype_code": "megacorp",
"text": "The first time you install a card each turn, gain 1[Credits].",
"faction": "Haas-Bioroid",
"faction_code": "haas-bioroid",
"faction_letter": "h",
"flavor": "Effective. Reliable. Humane.",
"influencelimit": 15,
"minimumdecksize": 45,
"number": 54,
"quantity": 1,
"setname": "Core Set",
"set_code": "core",
"side": "Corp",
"side_code": "corp",
"uniqueness": false,
"limited": 3,
"cycle_code": "core",
"cyclenumber": 1,
"ancurLink": "http://ancur.wikia.com/wiki/Haas-Bioroid",
"url": "http://netrunnerdb.com/en/card/01054",
"imagesrc": "/bundles/netrunnerdbcards/images/cards/en/01054.png"
},
{
"last-modified": "2015-01-23T13:12:08+00:00",
"code": "01055",
"title": "Accelerated Beta Test",
"type": "Agenda",
"type_code": "agenda",
"subtype": "Research",
"subtype_code": "research",
"text": "When you score Accelerated Beta Test, you may look at the top 3 cards of R&D. If any of those cards are ice, you may install and rez them, ignoring all costs. Trash the rest of the cards you looked at.",
"advancementcost": 3,
"agendapoints": 2,
"faction": "Haas-Bioroid",
"faction_code": "haas-bioroid",
"faction_letter": "h",
"flavor": "",
"illustrator": "Rachel Borovic",
"number": 55,
"quantity": 3,
"setname": "Core Set",
"set_code": "core",
"side": "Corp",
"side_code": "corp",
"uniqueness": false,
"limited": 3,
"cycle_code": "core",
"cyclenumber": 1,
"ancurLink": "http://ancur.wikia.com/wiki/Accelerated_Beta_Test",
"url": "http://netrunnerdb.com/en/card/01055",
"imagesrc": "/bundles/netrunnerdbcards/images/cards/en/01055.png"
},
{
"last-modified": "2016-03-11T11:50:54+00:00",
"code": "01056",
"title": "Adonis Campaign",
"type": "Asset",
"type_code": "asset",
"subtype": "Advertisement",
"subtype_code": "advertisement",
"text": "Put 12[Credits] from the bank on Adonis Campaign when rezzed. When there are no credits left on Adonis Campaign, trash it.\r\nTake 3[Credits] from Adonis Campaign when your turn begins.",
"cost": 4,
"faction": "Haas-Bioroid",
"faction_code": "haas-bioroid",
"faction_letter": "h",
"factioncost": 2,
"flavor": "",
"illustrator": "Mark Anthony Taduran",
"number": 56,
"quantity": 3,
"setname": "Core Set",
"set_code": "core",
"side": "Corp",
"side_code": "corp",
"trash": 3,
"uniqueness": false,
"limited": 3,
"cycle_code": "core",
"cyclenumber": 1,
"ancurLink": "http://ancur.wikia.com/wiki/Adonis_Campaign",
"url": "http://netrunnerdb.com/en/card/01056",
"imagesrc": "/bundles/netrunnerdbcards/images/cards/en/01056.png"
},
{
"last-modified": "2015-01-23T13:12:08+00:00",
"code": "01057",
"title": "Aggressive Secretary",
"type": "Asset",
"type_code": "asset",
"subtype": "Ambush",
"subtype_code": "ambush",
"text": "Aggressive Secretary can be advanced.\r\nIf you pay 2[Credits] when the Runner accesses Aggressive Secretary, trash 1 program for each advancement token on Aggressive Secretary.",
"cost": 0,
"faction": "Haas-Bioroid",
"faction_code": "haas-bioroid",
"faction_letter": "h",
"factioncost": 2,
"flavor": "",
"illustrator": "Julian Totinc Tedesco",
"number": 57,
"quantity": 2,
"setname": "Core Set",
"set_code": "core",
"side": "Corp",
"side_code": "corp",
"trash": 0,
"uniqueness": false,
"limited": 3,
"cycle_code": "core",
"cyclenumber": 1,
"ancurLink": "http://ancur.wikia.com/wiki/Aggressive_Secretary",
"url": "http://netrunnerdb.com/en/card/01057",
"imagesrc": "/bundles/netrunnerdbcards/images/cards/en/01057.png"
},
{
"last-modified": "2015-01-23T13:12:08+00:00",
"code": "01058",
"title": "Archived Memories",
"type": "Operation",
"type_code": "operation",
"subtype": "",
"subtype_code": "",
"text": "Add 1 card from Archives to HQ.",
"cost": 0,
"faction": "Haas-Bioroid",
"faction_code": "haas-bioroid",
"faction_letter": "h",
"factioncost": 2,
"flavor": "\"Do you think they…feel it?\"",
"illustrator": "Gong Studios",
"number": 58,
"quantity": 2,
"setname": "Core Set",
"set_code": "core",
"side": "Corp",
"side_code": "corp",
"uniqueness": false,
"limited": 3,
"cycle_code": "core",
"cyclenumber": 1,
"ancurLink": "http://ancur.wikia.com/wiki/Archived_Memories",
"url": "http://netrunnerdb.com/en/card/01058",
"imagesrc": "/bundles/netrunnerdbcards/images/cards/en/01058.png"
},
{
"last-modified": "2015-05-19T15:04:44+00:00",
"code": "01059",
"title": "Biotic Labor",
"type": "Operation",
"type_code": "operation",
"subtype_code": "",
"text": "Gain [Click][Click].",
"cost": 4,
"faction": "Haas-Bioroid",
"faction_code": "haas-bioroid",
"faction_letter": "h",
"factioncost": 4,
"flavor": "\"Why of course, we have six different Haas-Bioroid models serving in a variety of positions at this branch office alone. We here at Haas-Bioroid aren't going to shy away from practicing what we preach, and we pass the savings from increased efficiency on to our valued customers.\"",
"illustrator": "Mark Anthony Taduran",
"number": 59,
"quantity": 3,
"setname": "Core Set",
"set_code": "core",
"side": "Corp",
"side_code": "corp",
"uniqueness": false,
"limited": 3,
"cycle_code": "core",
"cyclenumber": 1,
"ancurLink": "http://ancur.wikia.com/wiki/Biotic_Labor",
"url": "http://netrunnerdb.com/en/card/01059",
"imagesrc": "/bundles/netrunnerdbcards/images/cards/en/01059.png"
}
  ]))
