import React, { useEffect } from 'react';
import './Game.css';
const PAGE_RESULT = 2;

export default function Game(props) {
    const next = () => {
        props.handleRound(winner() === 2 ? false : true);

        if (props.player.cards.length === 0) {
            // end of game
            const hasPlayerWin = props.player.points > props.bot.points ? true : false;
            props.setWinner(hasPlayerWin);

            props.init({
                botWins: props.bot.wins + !hasPlayerWin,
                playerWins: props.player.wins + hasPlayerWin,
            });
            props.setPage(PAGE_RESULT);
        }
    };

    const winner = () => {
        if ((props.player.cards[0].substr(1) | 0) < (props.bot.cards[0].substr(1) | 0)) return 2;
        if ((props.player.cards[0].substr(1) | 0) > (props.bot.cards[0].substr(1) | 0)) return 1;
        return 0;
    };

    const bgColor = () => {
        if (winner() === 2) return '#D82148';
        if (winner() === 1) return '#6EBF8B';
        return '#B8FFF9';
    };

    // useEffect to load all cards svgs before page load for a smoother play.
    useEffect(() => {
        for (let i = 0; i < props.bot.cards.length; i++) {
            require('./cards/' + props.bot.cards[i] + '.svg');
            require('./cards/' + props.player.cards[i] + '.svg');
        }
    }, [props.bot.cards, props.player.cards]);

    const showCard = (card) => {
        return <img src={require('./cards/' + card + '.svg')} alt={card} />;
    };

    return (
        <div className='game' style={{ backgroundColor: bgColor() }}>
            <div className='up'>
                <p className='name'>COMPUTER </p>
                <p className='score'>
                    SCORE:
                    <br />
                    COM - {props.bot.wins}
                    <br />
                    {props.player.name} - {props.player.wins}
                </p>
            </div>
            {/*<div className='card'>
                <span className='cardNumber'>{cardHandler(props.bot.cards[0])}</span>
            </div>
            <div className='card'>
                <span className='cardNumber'>{cardHandler(props.player.cards[0])}</span>
            </div> */}
            {showCard(props.bot.cards[0])}
            {showCard(props.player.cards[0])}
            <div className='down'>
                <button autoFocus className='button-next' onClick={next}>
                    {props.player.cards.length > 1 ? 'NEXT' : 'FINISH'} ({27 - props.player.cards.length}/26)
                </button>
                <p className='name'>{props.player.name}</p>
            </div>
        </div>
    );
}
