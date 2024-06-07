

export default class GameObject 
{ 
    x:number = 0;
    y:number = 0;

    onMoved: ((gameObject:GameObject) => void)[] = [];

    move (x:number = 0, y:number = 0) : void 
    {
        this.x += x;
        this.y += y;

        this.onMoved.forEach (el => el(this));
    }
}