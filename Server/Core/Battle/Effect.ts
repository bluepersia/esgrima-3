import Entity from "../Entity";
import IUpdatable from "../Updatable";





export default abstract class Effect implements IUpdatable
{
    isDone:Boolean = false;

    update (parent:Entity) : void 
    {

    }
}