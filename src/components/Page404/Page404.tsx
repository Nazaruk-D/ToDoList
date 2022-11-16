import React from 'react';
import errPNG from '../../common/assets/png/err404.png'
import s from './Page404.module.css'
import {NavLink} from "react-router-dom";

export const Page404 = () => {
    return (
        <div className={s.page404Container}>
            <NavLink to={'/'}>
                <img src={errPNG} alt={'skillIcon'} className={s.page404Block}/>
            </NavLink>
        </div>
    );
};

export default Page404;