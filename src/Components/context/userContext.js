import { createContext, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
   // super admin 
   // admin
   //user
 const [userToken, setUserToken] = useState(null);

  return <UserContext.Provider value={{userToken,setUserToken}}>
   {props.children}
   </UserContext.Provider>;
}
