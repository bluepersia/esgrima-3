import Entity from "./Entity";



export default class GameData 
{
    id:string= '';
    owner:Entity|null = null;

    inject (owner:Entity) : any 
    {
        this.owner = owner;
        return this;
    }

   
}