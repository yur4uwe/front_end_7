import React from 'react';

const Cell = ({ value, onClick, isWinningCell }) => {
    return (
        <button
            className={"cell" + (isWinningCell ? " winning-cell" : "")}
            onClick={onClick}
            style={{
                width: '60px',
                height: '60px',
                fontSize: '24px',
                textAlign: 'center',
                cursor: 'pointer',
                border: '1px solid #000',
                backgroundColor: isWinningCell ? '#90ee90' : '#fff', // Highlight winning cells
            }}
        >
            {value}
        </button>
    );
};

export default Cell;