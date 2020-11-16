import React from 'react'

const ArtistBanner = ({ 
    strArtistFanart,
    strArtistFanart2,
    strArtistFanart3}) => {

    
    return (
        <div className="grid md:grid-cols-3 justify-center w-full mx-auto rounded-lg shadow-lg p-4 overflow-hidden ">

            <img src={strArtistFanart} alt="" className="" />
            <img src={strArtistFanart2} alt="" />
            <img src={strArtistFanart3} alt="" />
        </div>
    )
}

export default ArtistBanner
