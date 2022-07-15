import React from "react";
import {Duck} from './DemoInterface';
interface Props{
    duck:Duck;
}
export default function DuckItem({duck}:Props){
    return(
        <div>
        <span>{duck.name}</span>
        <button onClick={()=>duck.makeSound(duck.name+ 'quack')}>Make Sound</button>
      </div>
    )
}


// {ducks.map(item=>(
//     <DuckItem key={item.name} duck={item}/>
//   ))}