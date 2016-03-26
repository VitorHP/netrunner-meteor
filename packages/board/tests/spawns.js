Spawn.register("Runner", {
  "_id" : "7MGuiovynhY2TgsbJ",
  "deck_id" : "sfHfp6WobMieubfYZ",
  "background_img_src" : "images/cards/background.png",
  "clicks" : 2,
  "credits" : 1,
  "deck_cards" : ["01002", "01003"],
  "discard" : [],
  "hand" : [],
  "side_code" : "runner",
  "ready" : false,
  "identity_card_code" : "01001",
  "programs" : [],
  "hardware" : [],
  "resources" : []
})

Spawn.register("Corp", {
  "_id" : "7MGuiovynhY2TgsbJ",
  "deck_id" : "sfHfp6WobMieubfYZ",
  "background_img_src" : "images/cards/corp-background.png",
  "clicks" : 2,
  "credits" : 1,
  "deck_cards" : [],
  "discard" : [],
  "hand" : ["01002", "01003"],
  "side_code" : "corp",
  "ready" : false,
  "identity_card_code" : "01001",
  "remote_servers" : []
})

Spawn.register("Game", {
  "_id" : "7MGuiovynhY2TgsbJ",
  "runner_id" : "7MGuiovynhY2TgsbJ",
  "corp_id" : "7MGuiovynhY2TgsbJ",
  "turn_owner" : "corp"
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
