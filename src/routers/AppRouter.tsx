import { BrowserRouter, Routes, Route,Navigate} from 'react-router-dom';
import { NavbarPage } from '../component/Navbarpage';
import { Home } from '../page/Home';
import { Portafolio } from '../page/Portafolio';
import { Servicio } from '../page/Servicios';

const Routers = () =>{
   
    return (<>
                <BrowserRouter>
                 {<NavbarPage/>}
                        <Routes>
                          <Route  path={'/'}  element={<Home/>}/>
                          <Route  path={'/Portafolio'}  element={<Portafolio suggestions={["React", "Angular", "Vue", "Svelte","Next.js","Arnaldo","Armando"]}/>}/>
                          <Route  path={'/Servicio'}  element={<Servicio/>}/>
                       </Routes>
                </BrowserRouter>
             </> 
     );
 }
 
 
 export const AppRouter = ()=>{
   
   return (
         <>
           <Routers />
         </>
       ) 
 }