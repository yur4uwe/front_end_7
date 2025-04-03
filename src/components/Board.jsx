import React from 'react';
import Cell from './Cell';
import { useTicTacToe } from '../api/Context';

const Board = () => {
    const { board, handleClick, winner, winningLine, resetGame, againstBot } = useTicTacToe();

    /**
     * @param {string | null} winner 
     * @returns 
     */
    const bottomButton = (winner) => {
        const message = winner === 'Draw' ? 'It\'s a Draw!' : `Winner: ${winner}`;

        return (
            <div>
                {winner && <h2 className='message-box'>{message}</h2>}
                <button onClick={() => resetGame(againstBot)} className='game-body-button'>
                    {winner ? "Restart Game" : "Reset Game"}
                </button>
            </div>
        )
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <div className='board'>
                {board.map((value, index) => (
                    <Cell
                        key={index}
                        value={value}
                        onClick={() => handleClick(index)}
                        isWinningCell={winningLine?.includes(index)} // Highlight winning cells
                    />
                ))}
            </div>
            {bottomButton(winner)}
        </div >
    );
};

export default Board;