import Stat from "./Stat";


export default class ManaStat extends Stat 
{
    id: string = 'mana';

   get base () : number 
   {
       return ((this.owner!.getStat('wisdom').value * 3) + ((this.owner!.getStat('wisdom').value * 3)  * ((this.owner!.level - 1) * 0.2)));
   }
     
}