import ActiveStat from "./ActiveStat";


export default class Health extends ActiveStat 
{
     override get max(): number {
        return this.owner!.getStat ('health').value;
    }

    constructor ()
    {
        super ();

        this.owner!.getStat ('health').onChanged.push (() => this.onMaxChanged);
    }
}