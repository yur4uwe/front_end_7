import React from 'react';
import { useTicTacToe } from '../api/Context';
import Board from '../components/Board';

const Game = () => {
    const { againstBot, setShowConfirmation } = useTicTacToe();

    return (
        <div className='game'>
            <div className="game-body">
                <h1>Tic Tac Toe</h1>
                <button className='game-body-button' onClick={() => setShowConfirmation(true)}>
                    {againstBot ? "Play agains human?" : "Play against Bot?"}
                </button>
                <Board />
            </div>
            
        </div>
    );
};

export default Game;