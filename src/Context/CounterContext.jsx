import React from 'react'
import { useState } from 'react';
import { createContext} from 'react'

export const counterContext=createContext();

export default function CounterContextProvider({children}) {

const[counter, setCounter]=useState(2);

function increment(){
    setCounter(counter+1);
}

  return (
    <counterContext.Provider value={{counter, increment}} >
        {children}
    </counterContext.Provider>
  )
}
