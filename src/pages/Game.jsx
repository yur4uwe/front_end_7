import React from 'react';
import { TicTacToeProvider } from '../api/Context';
import Board from '../components/Board';

const Game = () => {
    const style = {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    }

    return (
        <TicTacToeProvider>
            <div style={style}>
                <h1>Tic Tac Toe</h1>
                <Board />
            </div>
        </TicTacToeProvider>
    );
};

export default Game;