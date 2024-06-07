import Character from "../Character";
import Stat from "./Stat";


export default class AttackStat extends Stat 
{
    id: string = 'attack';

   get base () : number 
   {
        const isMage:boolean = (this.owner as Character).isMage;

        if (isMage)
            return (this.owner!.getStat('intelligence').value + (this.owner!.getStat('intelligence').value * ((this.owner!.level - 1) * 0.2)));
        else
            return (this.owner!.getStat ('strength').value + (this.owner!.getStat ('strength').value * ((this.owner!.level - 1) * 0.2)));
   }
     
}