import { useContext, useEffect } from "react"
// import Footer from "../footer/footer"
import Header from "../header/header"
import {Outlet} from 'react-router-dom'
import { UserContext } from "../context/userContext"

export default function Layout (){
   let {setUserToken} = useContext(UserContext)
   useEffect(()=>{
      if (localStorage.getItem('user')) {
         setUserToken(localStorage.getItem('user'))
      }
   },[setUserToken])
return <>
<Header/>
<Outlet></Outlet>
{/* <Footer/> */}
</>
}