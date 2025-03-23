import React from 'react';

const Cell = ({ value, onClick, isWinningCell }) => {

    const handleClick = () => {
        onClick();
    };

    return (
        <button
            className={"cell" + (isWinningCell ? " winning-cell" : "") + (value ? " filled" : "")}
            onClick={handleClick}
        >
            <span>{value}</span>
        </button>
    );
};

export default Cell;