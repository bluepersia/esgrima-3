
import BattleNPC from "./BattleNPC";
import BattleNPCData from "./BattleNPCData";
import Entity from "./Entity";
import MapBase, { MapStandard, SpawnData } from "./Map";


export default class Gameboard 
{
    entities:(Entity|null)[][] = [[],[]];
    positions:[number,number][][] = [[], []];
    wave:number = 0;
    map:MapBase | null = null;
    isActive:boolean = false;

   
    
    Import (map:MapBase) : void 
    {
        this.map = map;
    }


    choosePosition (entity:Entity, groupIndex:number, index:number): void 
    {
        if (!this.map)
            return;

        if (this.map.isValidPositionForPlayer (groupIndex, index) && this.isSpotFree (groupIndex, index))
            this.addEntity (entity, groupIndex, index);
            
    }

    isSpotFree (groupIndex:number, index:number) :boolean
    {
        return this.entities[groupIndex].length <= index || this.entities[groupIndex][index] === null;
    }

    isPlayerReady (entity:Entity) : boolean
    {
        return this.entities[0].findIndex (e => e === entity) != -1 || this.entities[1].findIndex (e => e === entity) !== -1;
    }
 
    addEntity (entity:Entity, groupIndex:number, index:number) : void 
    {
        while (this.entities[groupIndex].length <= index)
            this.entities[groupIndex].push (null);

        this.entities[groupIndex][index] = entity;
        entity._id = `${groupIndex}_${index};`
    }

    isGameReady () : boolean
    {
        if (!this.map)
            return false;

        return this.map.isGameReady (this);
    }


    start (entity:Entity) : boolean 
    {
        if (!this.map)
            return false;

        if (!this.isGameReady ())
            return false;

        if (!this.isPlayerReady (entity))
            return false;

        if (!this.isActive)
            this.spawnWave ();

        return true;
    }


    spawnWave () : void 
    {
        this.entities[1] = [];

        for (let i = 0; i < 2; i++)
        {
            const size = this.map!.getSizeAt (i);
            const arr = this.positions[i];

            if (size === 1)
            {
                arr.push ([150, 50]);
            }
            else
            if (size === 3)
            {
                 arr.push ([150, 75]);
                 arr.push ([200, 50]);
                 arr.push ([150, 25]);
            }
            else if (size === 4)
            {
                 arr.push ([150, 60]);
                 arr.push ([200, 60]);
                 arr.push ([150, 30]);
                 arr.push ([200, 30]);
            }
            else if (size === 6)
                {
                    arr.push ([150, 90]);
                    arr.push ([200, 90]);
                    arr.push ([150, 60]);
                     arr.push ([200, 60]);
                     arr.push ([150, 30]);
                     arr.push ([200, 30]);
                }

            if (i === 0)
                this.positions[0] = arr.map (value => [value[0] + (900 * this.wave), value[1]]);
            else
            if (i === 1)
                this.positions[1] = arr.map (value => [(900 * (this.wave + 1)) - value[0],  value[1]]);

            
            if (this.map instanceof MapStandard)
            {
                (this.map as MapStandard).waves[this.wave].forEach ((spawnData, index) => {

                    const spawnId = spawnData.getSpawn ();
                    BattleNPCData.Load (spawnId, battleNPCData => this.addEntity (new BattleNPC (battleNPCData), 1, index));
                });
            }
    }



    }


}


