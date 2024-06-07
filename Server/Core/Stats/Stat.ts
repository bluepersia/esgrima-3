import GameData  from "../GameData";



export default class Stat extends GameData 
{
    _base:number = 0;
    _add:number = 0;
    _mult:number = 1;

    onChanged: ((value: number) => void)[] = [];

    constructor (id:string = '') 
    {
        super ();
        this.id = id;
    }

    get base () : number 
    {
        return this._base;
    }

    get value () : number 
    {
        return (this.base + this.add) * this.mult;
    }

    get add () : number
    {
        return this._add;
    }

    set add (value:number)  
    {
        if (this._add === value) return;
        this._add = value;
        this.onChange ();
    }


    get mult () : number
    {
        return this._mult;
    }

    set mult (value:number)
    {
        if (value === this._mult) return;
        this._mult = value;
        this.onChange ();
    }

    onChange () : void
    {
        this.onChanged.forEach (el => el (this.value));
    }
   

}