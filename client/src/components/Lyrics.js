import React from 'react'

const Lyrics = ({lyrics}) => {
    return (
        <div className="z-0">
                <pre className="text-center text-gray-800 "> {lyrics} </pre>
        </div>
    )
}

export default Lyrics
