import React, { useState } from 'react'
import ArtistData from './ArtistData'

const SearchForm = () => {
    
    const [ currentArtist, setCurrentArtist] = useState('')
    const [ formSubmited , setFormSubmited ] = useState(false)

    const handleSubmit = (e) => {
        
        setFormSubmited(true)
        setCurrentArtist('')
    }
    return (
        <>
        <div className="flex p-2 w-full h-12 bg-indigo-300">
        <div className=" border-b border-indigo-700  w-1/6 text-2xl bg-transparent">
        <form onSubmit={ handleSubmit} >
          <input type="text" value={currentArtist} onChange={e => setCurrentArtist(e.target.value)} placeholder="pick an artist... " className="bg-transparent text-gray-300" />    
        </form>

        </div>
        

        </div>
           {currentArtist !=="" ? <ArtistData artist={currentArtist} /> : null }  
        </>
    )
}

export default SearchForm
