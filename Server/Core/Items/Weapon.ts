import EquipItem from "./EquipItem";



export default class Weapon extends EquipItem 
{
    attack: number = 1;

     equip(): void {
        this.owner!.getStat ('attack').add += this.attack;
    }

    unequip(): void {
        this.owner!.getStat ('attack').add -= this.attack;
    }
}