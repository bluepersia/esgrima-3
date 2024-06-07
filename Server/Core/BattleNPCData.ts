import { SkillLevel } from './Battle/Skill';
import GameData from './GameData';


export default class BattleNPCData extends GameData
{
    level:number = 0;
    health:number = 0;
    mana:number = 0;
    attack:number = 0;
    heal:number = 0;
    skills:SkillLevel[] = [];

    public static Load (id:string, callback: (data:BattleNPCData) => void) : void 
    {
        fetch (`../Content/BattleNPCs/${id}`).then (res => res.json()).then (json => callback (JSON.parse (json) as BattleNPCData));
    }
}