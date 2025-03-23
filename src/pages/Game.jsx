import React from 'react';
import { useTicTacToe } from '../api/Context';
import Board from '../components/Board';

const Game = () => {
    const { againstBot, setShowConfirmation } = useTicTacToe();

    const style = {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    }

    return (
        <div style={style}>
            <h1>Tic Tac Toe</h1>
            <button onClick={() => setShowConfirmation(true)}>{againstBot ? "Play agains human?" : "Play against Bot?"}</button>
            <Board />
        </div>
    );
};

export default Game;