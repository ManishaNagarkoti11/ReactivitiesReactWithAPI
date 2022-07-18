import { Console } from "console";

export interface Duck{
    name:string;
    numLegs:number;
    makeSound:(sound:string)=>void;

}
const duck1:Duck={
    name:'huey',
    numLegs:2,
makeSound:(sound:any)=>console.log(sound)
}
const duck2:Duck={
    name:'dewy',
    numLegs:2,
makeSound:(sound:any)=>console.log(sound)
}
duck1.makeSound('huey quack');
duck2.makeSound('Dewy quack');

export const ducks=[duck1, duck2]