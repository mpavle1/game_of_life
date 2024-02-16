import React from 'react'

// eslint-disable-next-line react/prop-types
const Cell = ({ isAlive = false, onClick, id }) => {
    return <div id={id} className={`cell${isAlive ? ' alive' : ''}`} onClick={onClick} />
}

Cell.displayName = 'Cell'

export default React.memo(Cell);