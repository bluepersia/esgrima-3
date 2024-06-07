import Entity from "./Entity";


export default interface IUpdatable 
{
    update: (parent:Entity) => void;
}