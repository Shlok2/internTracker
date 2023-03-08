// This file is just to show the Context (heading) when doing functions
// like creating/deleting/updating data. (See line 67 in Home.js)

import React,{createContext,useState} from 'react'

export const addData = createContext();
export const updateData = createContext();
export const dltdata = createContext();

const ContextProvider = ({children}) => {

    const [useradd,setUseradd] = useState("");
    const [update,setUpdate] = useState("");
    const [deldata,setDeldata] = useState("");

  return (
    <>
        <addData.Provider value={{useradd,setUseradd}}>
            <updateData.Provider value={{update,setUpdate}}>
              <dltdata.Provider value={{deldata,setDeldata}}>
                {children}
              </dltdata.Provider>
            </updateData.Provider>
        </addData.Provider>
    </>
  )
}

export default ContextProvider