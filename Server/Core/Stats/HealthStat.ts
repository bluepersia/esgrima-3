import Stat from "./Stat";


export default class HealthStat extends Stat 
{
    id: string = 'health';

   get base () : number 
   {
       return ((this.owner!.getStat('endurance').value * 10) + ((this.owner!.getStat('endurance').value * 10)  * ((this.owner!.level - 1) * 0.2)));
   }
     
}