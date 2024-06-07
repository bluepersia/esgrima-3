import Character from "../Character";
import Stat from "./Stat";


export default class HealStat extends Stat 
{
    id: string = 'heal';

   get base () : number 
   {
            return ((this.owner!.getStat('intelligence').value * 4) + ((this.owner!.getStat('intelligence').value * 4) * ((this.owner!.level - 1) * 0.2)));
   }
     
}