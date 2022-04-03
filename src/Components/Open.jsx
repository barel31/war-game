import React, { useState } from 'react';
import './Open.css';
import Scoreboard from './Scoreboard';

const PAGE_GAME = 1;

export default function Open(props) {
    const [name, setName] = useState(' ');
    const [showScoreboard, setShowScoreboard] = useState(false);

    const validName = () => {
        if (name != '') return null;
        else
            return (
                <label htmlFor='name' style={{ color: 'red' }}>
                    You have to enter a nickname
                </label>
            );
    };

    const scoreboard = () => {
        if (showScoreboard) {
            props.players.sort((a, b) => b.wins - a.wins); // order by score before showing scoreboard
            return <Scoreboard players={props.players} setPage={props.setPage} player={props.player} />;
        }
    };
    return (
        <div className='open'>
            <h1>Ready for WAR</h1>
            {validName()}
            <input
                onInput={(e) => setName(e.target.value)}
                type='text'
                name='name'
                id='name'
                placeholder={props.player.name ? props.player.name : 'Enter nickname'}
            />
            <button
                className='button-next'
                onClick={() => {
                    if (!name.trim().length && !props.player.name.length) {
                        setName('');
                        alert('You have to enter your nickname');
                    } else {
                        const player = !name.trim().length ? props.player.name : name;

                        props.setPage(PAGE_GAME);
                        props.addPlayer(player);
                        props.init({ playerName: player });
                    }
                }}
            >
                Start
            </button>
            <button className='button-next' onClick={() => setShowScoreboard(!showScoreboard)}>
                Scoreboard
            </button>
            {scoreboard()}
        </div>
    );
}
