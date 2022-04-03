import React from 'react';
import './Scoreboard.css';

export default function Scoreboard(props) {

    const ratio = (player) => {
        if(!player.wins) return 0;
        else if(!player.losses) return 1;
        else return +(player.wins / player.losses).toFixed(3);
    };

    return (
        <div className='scoreboard'>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Nickname</th>
                        <th>WIN/LOSE</th>
                        <th>W/L Ratio</th>
                    </tr>
                </thead>
                <tbody>
                    {props.players.map((v, i) => {
                        return (
                            <tr key={i} className={v.name === props.player.name ? 'table-active' : ''}>
                                <th scope="row">#{i + 1}</th>
                                <td>{v.name}</td>
                                <td>{v.wins}/{v.losses}</td>
                                <td>{ratio(v)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
