import React, {useEffect, useRef, useState} from 'react'
// @ts-ignore
import BIRDS from 'vanta/dist/vanta.cells.min'
// @ts-ignore
import * as THREE from 'three'
import s from './BodyApp.module.css'
import {Container} from "@material-ui/core";
import {Navigate, Route, Routes} from "react-router-dom";
import {TodoLists} from "../../features/TodoLists/TodoLists";
import {Login} from "../../features/Login/Login";
import Page404 from "../../components/Page404/Page404";

export const BodyApp = () => {

    const [vantaEffect, setVantaEffect] = useState<any>(0)
    const myRef = useRef(null)

    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(BIRDS({
                el: myRef.current,
                THREE: THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                color1: 0xffffff,
                color2: 0x939393
            }))
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])

    return <div className={s.body}>
        <div ref={myRef} className={s.vanta}></div>
            <Container maxWidth={"lg"} className={s.mainBlock } style={{justifyContent: "center", zIndex:10, paddingTop: "10vh"}}>
                <Routes>
                    <Route path="/" element={<TodoLists/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/404" element={<Page404/>}/>
                    <Route path="*" element={<Navigate to="/404"/>}/>
                </Routes>
            </Container>
    </div>
}




// <div className={s.body}>
//     <div ref={myRef} className={s.vanta} >
//         <Container maxWidth={"lg"} >
//             <Routes>
//                 <Route path="/" element={<TodoLists/>}/>
//                 <Route path="/login" element={<Login/>}/>
//                 <Route path="/404" element={<Page404/>}/>
//                 <Route path="*" element={<Navigate to="/404"/>}/>
//             </Routes>
//         </Container>
//     </div>
// </div>
