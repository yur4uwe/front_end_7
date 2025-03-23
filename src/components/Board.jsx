import React from 'react';
import Cell from './Cell';
import { useTicTacToe } from '../api/Context';

const Board = () => {
    const { board, handleClick, winner, winningLine, resetGame } = useTicTacToe();

    return (
        <div style={{ textAlign: 'center' }}>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 60px)',
                    gridGap: '5px',
                    justifyContent: 'center',
                    margin: '20px auto',
                }}
            >
                {board.map((value, index) => (
                    <Cell
                        key={index}
                        value={value}
                        onClick={() => handleClick(index)}
                        isWinningCell={winningLine?.includes(index)} // Highlight winning cells
                    />
                ))}
            </div>
            {winner && (
                <div>
                    <h2>{winner === 'Draw' ? 'It\'s a Draw!' : `Winner: ${winner}`}</h2>
                    <button onClick={resetGame} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                        Restart Game
                    </button>
                </div>
            )}
        </div>
    );
};

export default Board;