import Character from "./Character";


export default class Player 
{
    character:Character = new Character ();

    send (id:string, ...any:object[]) : void 
    {
        //Send message to client
    }
}