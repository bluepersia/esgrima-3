import ActiveStat from "./ActiveStat";


export default class Mana extends ActiveStat 
{
     override get max(): number {
        return this.owner!.getStat ('mana').value;
    }

    constructor ()
    {
        super ();

        this.owner!.getStat ('mana').onChanged.push (() => this.onMaxChanged);
    }
}