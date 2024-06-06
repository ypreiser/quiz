import React from 'react'
import style from './style.module.css';
import UserView from '../UserView';
import { useGameStore } from '../../store';


export default function WinStairs() {
    const winners = useGameStore(state => state.game.winners);

    return (
        <div className={style.container}>
            <div className={style.winner}><UserView name={winners&&winners[1]?winners[1].name:"?"} avatar={winners&&winners[1]?winners[1].avatar:""}/>
                <div className={style.place2} >2</div></div>
            <div className={style.winner}><UserView name={winners&&winners[0]?winners[0].name:"?"} avatar={winners&&winners[0]?winners[0].avatar:""}/>
                <div className={style.place1} >1</div></div>
            <div className={style.winner}><UserView name={winners&&winners[2]?winners[2].name:"?"} avatar={winners&&winners[2]?winners[2].avatar:""}/>
                <div className={style.place3} >3</div></div>
        </div>
    )
}
