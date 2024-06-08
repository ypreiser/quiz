import React from 'react'
import style from './style.module.css';

export default function Waiting() {
    return (
        <div className={style.waiting}>
        <div className={style.loading_container}>
            <div className={style.loading_text}>
                <span>L</span>
                <span>O</span>
                <span>A</span>
                <span>D</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
            </div>
        </div>
</div>
    )
}
