import Gameboard from "./Gameboard";
import MapBase from "./Map";
import Player from "./Player";


export default class GameRoom
 {
    players:Player[] = [];

    map:string = '';


    Broadcast (id:string, ...args:any[]) : void
    {
        this.players.forEach (player => player.send (id, args));
    }

   
 }


 export class TownRoom extends GameRoom
  {
    onPlayerJoined (player:Player) : void 
    {
        this.players.forEach (p => {
            if (p !== player)
                player.send ('SpawnEntity', p.character.getSpawnData (false));
        })
        this.Broadcast ('SpawnEntity', player.character.getSpawnData(false));
    }

    onMessage (player:Player, id:string, ...args:any[]) : void 
    {
        switch (id)
        {
            case 'Position':
                this.Broadcast ('Position', player.character._id, args[0], args[1]);
            break;
            case 'Chat':
                this.Broadcast ('Chat', player.character._id, args[0])
                break;
        }
    }
  }
 export class BattleRoom extends GameRoom
 {
    gameboard:Gameboard = new Gameboard ();

    activePlayers:Player[] = [];
   
    constructor ()
    {
        super ();

        MapBase.Load (this.map, map => this.gameboard.Import (map));
    }


    startGame (player:Player) : void 
    {
        this.gameboard.start (player.character);
    }

    onPlayerEnteredMap (player: Player) : void 
    {
        this.activePlayers.forEach (p => p.send ('SpawnEntity', player.character.getSpawnData(true)));
        this.activePlayers.push (player);

        this.gameboard.entities.forEach (group => group.forEach (entity => {
            
            if (entity)
                player.send ('SpawnEntity', entity.getSpawnData (true));
            
        }))
    }

    onPlayerExited (player:Player) : void 
    {
        this.activePlayers = this.activePlayers.filter (p => p !== player);
    }
 }