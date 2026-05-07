import { BrowserRouter, Routes, Route,Navigate} from 'react-router-dom';
import { NavbarPage } from '../component/Navbarpage';
import { Home } from '../page/Home';
import { Portafolio } from '../page/Portafolio';
import { Servicio } from '../page/Servicios';

const Routers = () =>{
   // Si estás en producción (GitHub Pages), usa el basename "/curriculum"
  // En local, basename vacío para que funcione en http://localhost:3000/
    const basename =
    process.env.NODE_ENV === "production" ? "/curriculum" : "/";
    return (<>
                <BrowserRouter  basename={basename} >
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