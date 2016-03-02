Actions.hand = function() {
  return [
    {
      label: "Install",
      requirement() {
        return Actions.common.isOfType(this.card, ["agenda"])
      },
      perform() {
        let rezzed
        let server
        let _this = this

        Modals.choiceModal([{ label: "Rezzed", value: true }, { label: "Unrezzed", value: false }])
          .then( function(data) {
            rezzed = data

            serverChoices = _this.player.remoteServers.reduce(function(memo, server, index) {
              memo.push({ label: "Server #" + index, value: server.serverId })

              return memo
            }, [{ label: "New Server", value: "new-server" }])

            return Modals.choiceModal(serverChoices)
          })
          .then(function(data){
            server = data

            Actions.common.removeFromHand(_this.player, _this.card)
            Actions.common.installCard(_this.player, _this.card, { rezzed: rezzed == true })
            Actions.common._updatePlayer(_this.player)
          })
      }
    },
    {
      label: "Install",
      requirement() {
        return Actions.common.isOfType(this.card, ["program"])
      },
      perform() {
        Actions.common.removeFromHand(this.player, this.card)
        Actions.common.installCard(this.player, this.card)
        Actions.common._updatePlayer(this.player)
      }
    }
  ]
}
