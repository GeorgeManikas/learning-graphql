import React from 'react'

const ArtistBanner = ({ 
    strArtistFanart,
    strArtistFanart2,
    strArtistFanart3}) => {

    
    return (
        <div className=" grid md:grid-cols-3 justify-center w-full gap-2 md:w-5/6 mx-auto rounded-lg shadow-lg p-4 overflow-hidden ">

            <div> <img src={strArtistFanart} alt="" className="block" /></div>
            <div className="hidden md:block "> <img src={strArtistFanart2} alt="not found" /> </div>
            <div className="hidden md:block "><img src={strArtistFanart3} alt="not found" /> </div>
        </div>
    )
}

export default ArtistBanner
