import Entity from "../Entity";
import Effect from "./Effect";


export default class DealDamage extends Effect
{
    add:number = 0;
    mult:number = 1;

     override update(parent: Entity): void {
        if (parent.target)
        {
            const attack = (parent.getStat('attack').value + this.add) * this.mult;

            parent.target.health.current -= attack;
        }
    }
}