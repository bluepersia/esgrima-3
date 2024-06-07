import { SkillLevel } from './Battle/Skill';
import GameData from './GameData';
import fs from 'fs';


export default class BattleNPCData extends GameData
{
    level:number = 0;
    health:number = 0;
    mana:number = 0;
    attack:number = 0;
    heal:number = 0;
    skills:SkillLevel[] = [];

    public static Load (id:string) : BattleNPCData
    {
        const str =fs.readFileSync(`../Content/BattleNPCs/${id}.json`, 'utf8');

        return JSON.parse (str) as BattleNPCData;
    }
}