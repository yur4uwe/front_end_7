import React from 'react';

const Cell = ({ value, onClick }) => {
    return (
        <button
            className="cell"
            onClick={onClick}
            style={{
                width: '60px',
                height: '60px',
                fontSize: '24px',
                textAlign: 'center',
                cursor: 'pointer',
                border: '1px solid #000',
                backgroundColor: '#fff',
            }}
        >
            {value}
        </button>
    );
};

export default Cell;