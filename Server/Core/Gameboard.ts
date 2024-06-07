
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
        const group = this.getGroup (groupIndex);

        return group.length <= index || group[index] === null;
    }

    isPlayerReady (entity:Entity) : boolean
    {
        return this.entities[0].findIndex (e => e === entity) != -1 || this.entities[1].findIndex (e => e === entity) !== -1;
    }
 
    addEntity (entity:Entity, groupIndex:number, index:number) : void 
    {
        const group = this.getGroup (groupIndex);

        while (group.length <= index)
            group.push (null);

        group[index] = entity;
        entity._id = `${groupIndex}_${index};`

        if(this.positions[groupIndex].length > index)
            entity.battlePosition = this.positions[groupIndex][index];
    }


    getGroup (groupIndex:number) : (Entity|null)[]
    {
        return this.entities[groupIndex];
    }

    getEntityAt (groupIndex:number, index:number) : Entity|null
    {
        const group = this.getGroup (groupIndex);

        if (group.length <= index)
            return null;

        return group[index];
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



    async spawnWave () : Promise<void> 
    {
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
    
                }

                this.positions[0] = this.positions[0].map (value => [value[0] + (900 * this.wave), value[1]]);
                this.positions[1] = this.positions[1].map (value => [(900 * (this.wave + 1)) - value[0],  value[1]]);

                this.positions.forEach ((group, groupIndex) =>
                {
                    group.forEach ((pos, index) => 
                    {
                        const entity = this.getEntityAt (groupIndex, index);
                        if (entity)
                            entity.battlePosition = pos;
                    });
                });

            
            if (this.map instanceof MapStandard)
            {   

                this.entities[1] = [];

                (this.map as MapStandard).waves[this.wave].forEach ((spawnData, index) => {

                    const spawnId = spawnData.getSpawn ();
                    const entity = new BattleNPC (BattleNPCData.Load (spawnId));
                    this.addEntity (entity, 1, index);
                });
            }

        this.isActive = true;

    }


}


