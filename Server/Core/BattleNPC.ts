import { SkillLevel } from "./Battle/Skill";
import BattleNPCData from "./BattleNPCData";
import Entity from "./Entity";
import Stat from "./Stats/Stat";


export default class BattleNPC extends Entity
{
    stats:Stat[] = [
        new Stat('attack').inject(this),
        new Stat('heal').inject(this),
        new Stat('health').inject(this),
        new Stat('mana').inject(this)
    ]

    skills:SkillLevel[] = [];

    constructor (battleNPCData:BattleNPCData) 
    {
        super ();
        this.ImportData (battleNPCData);
    }

    ImportData (data:BattleNPCData):void
    {
        this.getStat ('attack')._base = data.attack;
        this.getStat ('heal')._base = data.heal;
        this.getStat ('health')._base = data.health;
        this.getStat ('mana')._base = data.mana;
        this.skills = data.skills;
    }
    
}