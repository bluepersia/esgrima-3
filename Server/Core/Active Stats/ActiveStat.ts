import Entity from "../Entity";
import GameData from "../GameData";



export default class ActiveStat extends GameData 
{
    _current:number = 0;

    onChanged: ((activeStat: ActiveStat) => void)[] = [];
    onMaxChanged: ((activeStat: ActiveStat) => void)[] = [];

    get current () : number 
    {
        return this._current;
    }

    set current  (value:number) 
    {
        if (this._current == value) return;

        if (value > this.max)
            value == this.max;
        if (value < 0)
            value = 0;

        this._current = value;
        this.onChange ();
        this.onChanged.forEach (el => el(this));
    }
    
    get max () : number 
    {
        return 0;
    }

    onChange () : void 
    {

    }

    
    inject(owner: Entity) {
        super.inject (owner);
        this.current = this.max;
    }
}