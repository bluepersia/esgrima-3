import Health from "./Active Stats/Health";
import Mana from "./Active Stats/Mana";
import { SkillLevel } from "./Battle/Skill";
import GameObject from "./GameObject";
import Stat from "./Stats/Stat";

enum State 
{
    Idle,
    Action,
    Return
}

export default class Entity extends GameObject 
{
    _id:string = '';
    get id () : string 
    {
        return this.name || this._id;
    }
    name:string = '';
    level:number = 1;

    stats: Stat[] = [];

    health:Health = new Health ();
    mana:Mana = new Mana();


    target:Entity | null = null;

    walkSpeed:number = 4;

    skillUsing:SkillLevel|null = null;

    get isAlive () : boolean {
        return this.health.current > 0;
    }

    getStat (id:string) : Stat
    {
        return this.stats.find (stat => stat.id === id)!;
    }

    moveX = 0;
    moveY = 0;

    state:State = State.Idle;

    battlePosition:[number, number] = [0, 0];

    update () : void 
    {
        this.moveX = 0;
         this.moveY = 0;

        if (this.state === State.Action)
        {
            

            const skill = this.skillUsing;
            const target = this.target;

            if (!skill || ! target)
                return;

            const range = skill.range;

            let isWithinRange = true;

            if (this.x < target.x - range || this.x > target.x + range)
            {
                isWithinRange = false;

                if (target.x >= this.x)
                    this.moveX = 1;
                else 
                    this.moveX = -1;
            }

            if (this.y < target.y - range || this.y > target.y + range)
                {
                    isWithinRange = false;

                    if (target.y >= this.y)
                        this.moveY = 1;
                    else 
                        this.moveY = -1;
                }

            if (skill.isDone ())
            {
                this.state = State.Return;
                return;
            }

            if (isWithinRange)
            {
                skill.update (this);
                return;
            }

        }else if (this.state === State.Return)
        {
            if (Math.abs (this.x - this.battlePosition[0]) >= 10)
                this.moveX = this.x < this.battlePosition[0] ? 1 : -1;
            if (Math.abs (this.y - this.battlePosition[1]) >= 10)
                this.moveY = this.y < this.battlePosition[1] ? 1 : -1;

            if (this.moveX === 0 && this.moveY === 0)
                this.state = State.Idle;
        }


        this.move (this.moveX * this.walkSpeed, this.moveY * this.walkSpeed);
    }


    getSpawnData (inBattle:boolean) : any[] 
    {
        if (inBattle)
            return [this.id, this.name, this.level, this.health.current, this.health.max];
        else 
            return [this.id, this.name, this.level];
    }

}