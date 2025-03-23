/**
 * 
 * @param {{winning: number, losing: number, tie: number}} state 
 * @param {(boolean | null)[]} currentBoard 
 * @param {GameStateNode[]} children
 * @param {boolean} isX
 */
function GameStateNode(state, currentBoard, children, isX) {
    this.state = state;
    this.currentBoard = currentBoard;
    this.children = children;
    this.isX = isX;
}

/**
 * @param {(boolean | null)[]} board 
 * @returns 
 */
const calcultePossibleMoves = (board) => {
    return board.reduce((acc, cell, index) => {
        if (cell === null) {
            acc.push(index);
        }
        return acc;
    }, []);
};

/**
 * 
 * @param {(boolean | null)[]} board 
 * @returns {number | null}
 */
const isGameEndingState = (board) => {
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

    // Winning state
    for (let line of lines) {
        const [a, b, c] = line;
        if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
            return board[a] ? 1 : 2;
        }
    }

    // Tie state
    if (!board.includes(null)) {
        return 3;
    }

    return null;
};

/**
 * Builds a game tree recursively and calculates the state for each node.
 * @returns {GameStateNode} The root of the game tree.
 */
const myInitGameTree = () => {
    const root = new GameStateNode({ winning: 0, losing: 0, tie: 0 }, Array(9).fill(null), [], true);
    const memo = new Map(); // Cache for memoization

    /**
     * Recursive function to build the game tree and calculate the state.
     * @param {GameStateNode} node The current node.
     * @returns {{winning: number, losing: number, tie: number}} The state of the current node.
     */
    const buildTree = (node) => {
        const { currentBoard, isX } = node;

        // Check for terminal state (win, lose, or tie)
        const gameState = isGameEndingState(currentBoard);
        if (gameState) {
            if (gameState === 1) {
                // Maximizing player (X) wins
                return isX ? { winning: 1, losing: 0, tie: 0 } : { winning: 0, losing: 1, tie: 0 };
            }
            if (gameState === 2) {
                // Minimizing player (O) wins
                return isX ? { winning: 0, losing: 1, tie: 0 } : { winning: 1, losing: 0, tie: 0 };
            }
            if (gameState === 3) {
                // Tie
                return { winning: 0, losing: 0, tie: 1 };
            }
        }

        // Generate possible moves
        const possibleMoves = calcultePossibleMoves(currentBoard);

        // Initialize state for the current node
        let currentState = { winning: 0, losing: 0, tie: 0 };

        for (let move of possibleMoves) {
            const newBoard = currentBoard.slice();
            newBoard[move] = isX;

            const boardKey = newBoard.join(',');
            if (memo.has(boardKey)) {
                const childState = memo.get(boardKey);
                currentState.winning += childState.losing;
                currentState.losing += childState.winning;
                currentState.tie += childState.tie;
                continue;
            } else {
                memo.set(boardKey, null);
            }

            // Create a new child node
            const newNode = new GameStateNode(
                { winning: 0, losing: 0, tie: 0 },
                newBoard,
                [],
                !isX
            );
            node.children.push(newNode);

            // Recursively build the tree for the child node
            const childState = buildTree(newNode);

            // Update the memoization cache
            memo.set(boardKey, childState);

            // Aggregate the state from the child node
            currentState.winning += childState.losing;
            currentState.losing += childState.winning;
            currentState.tie += childState.tie;
        }

        // Update the current node's state
        node.state = currentState;
        return currentState;
    };

    // Start building the tree from the root
    buildTree(root);
    return root;
};

/**
 * 
 * @param {(string | null)[]} board
 * @returns {(boolean | null)[]} 
 */
const castBoardToBotRep = (board) => {
    return board.reduce((acc, cell) => {
        if (cell === null) {
            acc.push(null);
        } else {
            acc.push(cell === 'X');
        }
        return acc;
    }, []);
}

/**
 * 
 * @param {(boolean | null)[]} board
 * @returns {(string | null)[]} 
 */
const castBoardToGameRep = (board) => {
    return board.map((cell) => {
        if (cell === null) {
            return null;
        }
        return cell ? 'X' : 'O';
    });
}

/**
 * Bot's move using the Minimax algorithm.
 * @param {(string | null)[]} board The current board state.
 * @returns {number} The index of the bot's move.
 */
const botsMove = (board) => {
    const botBoard = castBoardToBotRep(board);
    const { move } = minimax(botBoard, false); // Bot is the minimizing player (O)
    return move;
};

/**
 * Minimax algorithm to find the best move for the bot.
 * @param {(boolean | null)[]} board The current board state.
 * @param {boolean} isMaximizingPlayer Whether the current player is maximizing.
 * @returns {{ score: number, move: number | null }} The best score and move.
 */
const minimax = (board, isMaximizingPlayer) => {
    const gameState = isGameEndingState(board);

    // Base case: terminal state
    if (gameState) {
        if (gameState === 1) return { score: 1 }; // Maximizing player (X) wins
        if (gameState === 2) return { score: -1 }; // Minimizing player (O) wins
        if (gameState === 3) return { score: 0 }; // Tie
    }

    const possibleMoves = calcultePossibleMoves(board);
    let bestMove = null;

    if (isMaximizingPlayer) {
        let bestScore = -Infinity;
        for (let move of possibleMoves) {
            const newBoard = board.slice();
            newBoard[move] = true; // Maximizing player (X)
            const { score } = minimax(newBoard, false);
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
        return { score: bestScore, move: bestMove };
    } else {
        let bestScore = Infinity;
        for (let move of possibleMoves) {
            const newBoard = board.slice();
            newBoard[move] = false; // Minimizing player (O)
            const { score } = minimax(newBoard, true);
            if (score < bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
        return { score: bestScore, move: bestMove };
    }
};

export { botsMove, myInitGameTree, castBoardToGameRep };