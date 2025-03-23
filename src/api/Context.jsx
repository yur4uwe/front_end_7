import React, { createContext, useState, useContext } from 'react';

// Create the context
const TicTacToeContext = createContext();

// Create a provider component
export const TicTacToeProvider = ({ children }) => {
    const [board, setBoard] = useState(Array(9).fill(null)); // 3x3 board
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);

    const handleClick = (index) => {
        if (board[index] || winner) return;

        const newBoard = board.slice();
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
        calculateWinner(newBoard);
    };

    const calculateWinner = (board) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let line of lines) {
            const [a, b, c] = line;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setWinner(board[a]);
                return;
            }
        }

        if (!board.includes(null)) {
            setWinner('Draw');
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
    };

    return (
        <TicTacToeContext.Provider value={{ board, isXNext, winner, handleClick, resetGame }}>
            {children}
        </TicTacToeContext.Provider>
    );
};

// Custom hook to use the TicTacToeContext
export const useTicTacToe = () => {
    return useContext(TicTacToeContext);
};