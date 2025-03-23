import React, { createContext, useState, useContext, useEffect } from 'react';
import { botsMove } from './bot';

const TicTacToeContext = createContext();

export const TicTacToeProvider = ({ children }) => {
    const [board, setBoard] = useState(() => Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [winningLine, setWinningLine] = useState(null);
    const [againstBot, setAgainstBot] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        localStorage.setItem('ticTacToeBoard', JSON.stringify(board));
    }, [board]);

    useEffect(() => {
        localStorage.setItem('ticTacToeIsXNext', JSON.stringify(isXNext));
    }, [isXNext]);

    useEffect(() => {
        localStorage.setItem('ticTacToeWinner', JSON.stringify(winner));
    }, [winner]);

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
                setWinningLine(line);
                setWinner(board[a]);
                return;
            }
        }

        if (!board.includes(null)) {
            setWinner('Draw');
        }
    };

    const handleClick = (index) => {
        if (board[index] || winner) return;

        let newBoard = board.slice();
        newBoard[index] = isXNext ? 'X' : 'O';

        if (againstBot && !winner) {
            const botMoveIndex = botsMove(newBoard);
            if (botMoveIndex !== null) {
                newBoard[botMoveIndex] = isXNext ? 'O' : 'X';
            }
        } else {
            setIsXNext(!isXNext);
        }

        setBoard(newBoard);
        calculateWinner(newBoard);
    };

    const resetGame = () => {
        let initialBoard = Array(9).fill(null);

        if (againstBot) {
            const isBotsMove = Math.random() < 0.5;
            if (isBotsMove) {
                const botMoveIndex = botsMove(initialBoard);
                if (botMoveIndex !== null) {
                    initialBoard[botMoveIndex] = 'X';
                    setIsXNext(false);
                }
            } else {
                setIsXNext(true);
            }
        } else {
            setIsXNext(true);
        }

        setBoard(initialBoard);
        setWinner(null);
        setWinningLine(null);

        localStorage.setItem('ticTacToeBoard', JSON.stringify(initialBoard));
        localStorage.setItem('ticTacToeIsXNext', JSON.stringify(true));
        localStorage.setItem('ticTacToeWinner', JSON.stringify(null));
    };

    const handleConfirmChangeOpponent = (confirmChange) => {
        setShowConfirmation(false);
        if (confirmChange) {
            setAgainstBot(!againstBot);
            resetGame();
        }
    };

    return (
        <TicTacToeContext.Provider
            value={{
                board,
                isXNext,
                winner,
                winningLine,
                againstBot,
                handleClick,
                resetGame,
                setAgainstBot,
                showConfirmation,
                setShowConfirmation,
                handleConfirmChangeOpponent,
            }}
        >
            {children}
        </TicTacToeContext.Provider>
    );
};

export const useTicTacToe = () => useContext(TicTacToeContext);