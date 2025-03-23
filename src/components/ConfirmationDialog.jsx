import React from 'react';

const ConfirmationDialog = ({ onConfirm }) => {
    return (
        <div
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
            }}
        >
            <p>Do you want to change opponent? This action will reset the game.</p>
            <button onClick={() => onConfirm(true)} style={{ marginRight: '10px' }}>
                Yes
            </button>
            <button onClick={() => onConfirm(false)}>No</button>
        </div>
    );
};

export default ConfirmationDialog;