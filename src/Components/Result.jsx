import React from 'react';
import './Result.css';

const PAGE_OPEN = 0;
const PAGE_GAME = 1;

export default function Result(props) {

    const quit = () => {
        props.setPage(PAGE_OPEN);
    };

    const color = props.hasPlayerWin ? 'green' : 'red';

    return (
        <div className='result' style={{ border: '0.1em solid ' + color }}>
            <button className='quit' onClick={quit}></button>
            <p className='head' style={{ color: color }}>{props.hasPlayerWin ? 'WIN' : 'LOSE'}</p>
            <h2 style={{ color: color }}>
                LOSE {props.bot.wins} — {props.player.wins} WINS
            </h2>
            <button autoFocus className='button-next again' onClick={() => props.setPage(PAGE_GAME)}>
                Again?
            </button>
        </div>
    );
}
