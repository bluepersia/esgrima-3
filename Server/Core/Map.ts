import GameData from "./GameData";
import Gameboard from "./Gameboard";


export default abstract class MapBase extends GameData
{
    getSizeAt (groupIndex:number, wave:number = 0) : number 
    {
        return 4;
    }


    isValidPositionForPlayer (groupIndex:number, index:number) : boolean 
    {
        return index < this.getSizeAt (groupIndex);
    }

    isGameReady (gameboard:Gameboard) : boolean
    {
        return gameboard.entities[0].findIndex (e => e !== null) != -1;
    }

    static Load (id:string, callback:(map:MapBase) => void)
    {
        fetch (`../Content/Maps/${id}`).then (res => res.json()).then (json => JSON.parse (json));
    }
}

export class MapStandard extends MapBase
{
    waves:SpawnData[][] = [];

    getSizeAt(groupIndex: number, wave:number = 0): number {
        return groupIndex === 0 ? 4 : this.waves[wave].length;
    }

  

    isValidPositionForPlayer (groupIndex:number, index:number) : boolean 
    {
        return super.isValidPositionForPlayer (groupIndex, index) && groupIndex === 0;
    }
}

export class SpawnData 
{
    ids:string[] = [];
    chances:number[] = [];

    getSpawn () : string 
    {
        const rnd:number = Math.random ();

        this.chances.forEach ((chance, index) =>
        {
            const chanceNext = this.chances.length > (index + 1) ? this.chances[index + 1] : 1;

            if (rnd >= chance && rnd < chanceNext)
                return this.ids[chance];
            
        });

        return '';
    }
}

export class MapPVP extends MapBase 
{
    size:number = 4;

    minParticipants:number = 1;

    getSizeAt(groupIndex: number, wave:number = 0): number {
        return this.size;
    }


    isGameReady(gameboard: Gameboard): boolean {
        return gameboard.entities[0].reduce ((prev, curr) => curr !== null ? prev + 1 : prev, 0) >= this.minParticipants && gameboard.entities[1].reduce ((prev, curr) => curr !== null ? prev + 1 : prev, 0) >= this.minParticipants;
    }
}