import React from 'react';
import { useTicTacToe } from './api/Context';
import Game from './pages/Game';
import ConfirmationDialog from './components/ConfirmationDialog';
import './App.css';

const App = () => {
    const { showConfirmation, handleConfirmChangeOpponent } = useTicTacToe();

    return (
        <div>
            <Game />
            {showConfirmation && <ConfirmationDialog onConfirm={handleConfirmChangeOpponent} />}
        </div>
    );
};

export default App;
