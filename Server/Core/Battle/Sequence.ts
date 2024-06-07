import Entity from "../Entity";
import IUpdatable from "../Updatable";
import Effect from "./Effect";


export default class Sequence implements IUpdatable
{
    effects:Map<number, Effect> = new Map<number, Effect>();

    timeStarted:number = -1;


    update (parent:Entity) : void 
    {
        if (this.timeStarted === -1)
            this.timeStarted = Date.now ();

        this.effects.forEach ((value, key) => {
            if (value.isDone)
                return;

            const time = Date.now () - this.timeStarted;

            if (time >= key)
                value.update (parent);
        });
    }

    reset () : void 
    {
        this.timeStarted = -1;
        this.effects.forEach (value => value.isDone = false);
    }

    isDone () : boolean
    {
        let isDone = true;
         this.effects.forEach ((value, key) => {
            if (!value.isDone)
                    isDone = false;
        })
        return isDone;
    }

}