import React, {useEffect, useRef, useState} from 'react'
// @ts-ignore
// import BIRDS from 'vanta/dist/vanta.ripple.min'
import BIRDS from 'vanta/dist/vanta.cells.min'
// @ts-ignore
import * as THREE from 'three'
import s from './Vanta.module.css'
import {Container} from "@material-ui/core";
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistsList} from "../TodolistsList";
import {Login} from "../features/Login/Login";


export const Vanta = () => {

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


    // const [vantaEffect, setVantaEffect] = useState<any>(null)
    // const myRef = useRef(null)
    // useEffect(() => {
    //     if (!vantaEffect) {
    //         setVantaEffect(BIRDS({
    //             el: myRef.current,
    //             THREE: THREE,
    //             mouseControls: true,
    //             touchControls: true,
    //             gyroControls: false,
    //             minHeight: 200.00,
    //             minWidth: 200.00,
    //             scale: 1.00,
    //             scaleMobile: 1.00
    //         }))
    //     }
    //
    //     // el: myRef.current,
    //     //     THREE: THREE,
    //     //     mouseControls: false,
    //     //     touchControls: false,
    //     //     gyroControls: false,
    //     //     minHeight: 200.00,
    //     //     minWidth: 200.00,
    //     //     scale: 1.00,
    //     //     scaleMobile: 1.00,
    //     //     color: 0xfcfcfc,
    //     //     backgroundColor: 0xc0c0c0,
    //     //     points: 13.00,
    //     //     maxDistance: 26.00,
    //     //     spacing: 14.00,
    //     //     showDots: false,
    //
    //     return () => {
    //         if (vantaEffect) vantaEffect.destroy()
    //     }
    // }, [vantaEffect])

    return <div className={s.hire}>
        <div ref={myRef} className={s.vanta}>
            <Container maxWidth={"lg"} >
                <Routes>
                    <Route path="/" element={<TodolistsList/>}/>
                    <Route path="/login" element={<Login/> }/>
                    <Route path="/404" element={<h1>Page not found</h1> }/>
                    <Route path="*" element={<Navigate to="/404"/>}/>
                </Routes>
            </Container>
        </div>
    </div>
}
