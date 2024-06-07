import Entity from "../Entity";
import GameData from "../GameData";
import GameItem from "../GameItem";
import IUpdatable from "../Updatable";
import Sequence from "./Sequence";



export default class Skill extends GameItem implements IUpdatable
{
    levels:SkillLevel[] = [];
    level:number = 1;

    get currentLevel () : SkillLevel {
        return this.levels[this.level -1];
    }

    update (parent: Entity): void
    {
        this.currentLevel.update (parent);
    }

    reset ()
    {
        this.currentLevel.reset ();
    }
}


export class SkillLevel extends GameData implements IUpdatable
{
    sequence:Sequence = new Sequence ();
    manaCost:number = 0;
    range:number = 0;

    update (parent:Entity): void 
    {
        this.sequence.update (parent);
    }

    reset ()
    {
        this.sequence.reset ();
    }

    isDone () : boolean 
    {
        return this.sequence.isDone ();
    }
}
