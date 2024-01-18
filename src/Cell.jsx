import React from 'react'

// eslint-disable-next-line react/prop-types
const Cell = ({ isAlive = false }) => {
    return <div className="cell" style={{ backgroundColor: isAlive ? 'white' : 'transparent'}} />
}

Cell.displayName = 'Cell'

export default React.memo(Cell);