import React, {createContext, useState} from 'react'

const Context = createContext()

function ContextProvider({ children }){

    let [user, setUser] = useState({user:{username:''}});

    let variables = {login:{value:user, set:setUser}}
    return (
        <Context.Provider value={variables}>
            {children}
        </Context.Provider>
    )
}

export { Context , ContextProvider }