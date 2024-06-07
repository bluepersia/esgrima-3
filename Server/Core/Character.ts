
import Skill from "./Battle/Skill";
import Entity from "./Entity";
import AttackStat from "./Stats/AttackStat";
import HealStat from "./Stats/HealStat";
import HealthStat from "./Stats/HealthStat";
import ManaStat from "./Stats/ManaStat";
import Stat from "./Stats/Stat";




export default class Character extends Entity 
{
    stats: Stat[] = [
        new Stat('strength').inject(this),
        new Stat('endurance').inject(this),
        new Stat('intelligence').inject(this),
        new Stat('wisdom').inject(this),
        new Stat('luck').inject(this),
        new AttackStat().inject (this), 
        new HealStat().inject (this),
        new HealthStat().inject(this),
        new ManaStat ().inject (this)
    ];

    skills: Skill[] = [];
   

    get isMage () : boolean 
    {
        return false;
    }

  

}