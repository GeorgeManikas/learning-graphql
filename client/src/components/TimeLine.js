import axios from "axios";
import React, { useState, useEffect } from "react";
import Lyrics from "./Lyrics";
import * as _ from "lodash";
import TrackDetails from "./TrackDetails";


const TimeLine = ({ discography, artist }) => {

  const [sorted, setSorted] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState([]);
  const [currentSong, setCurrentSong ] = useState('')

  // sort discography by year released , ascending 
  useEffect(() => {
    const temp = _.sortBy(discography, ["intYearReleased"], ["asc"]);
    setSorted(temp);
    setCurrentAlbum(temp[0])
  }, []);


  const [lyr, setLyr] = useState("");
  const handleTrackSelect = async (title) => {
    const response = await axios.get(
      `https://api.lyrics.ovh/v1/${artist}/${title}`
    );
    const lyrics = await response.data;
    setLyr(lyrics.lyrics);
    setCurrentSong(title)
  };
  return (
    <>
      <div className="p-3">
        <div className="grid grid-cols-4 w-5/6 mx-auto">
        <div className="col-span-1 h-20 mt-6 ">
            <select className="w-5/6 text-center font-semibold   text-md text-gray-200 mx-auto p-8 bg-gray-700 rounded-xl appearance-none">
              <option   selected disabled> Year Released </option>
              {sorted.map((disc) => (
                <option
                  key={disc.strAlbumThumb}
                  className="m-6 p-4 bg-gray-700 rounded-full hover:bg-gray-900 cursor-pointer"
                  onClick={() => setCurrentAlbum(disc)}
                >
                  
                  {disc.intYearReleased} - {disc.strAlbum}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-3 mt-6 ">
            <div className="grid grid-cols-3 w-5/6 bg-gray-200 justify-center items-start rounded-xl shadow-md overflow-hidden ">
                <img src={currentAlbum.strAlbumThumb} alt={currentAlbum.strAlbum} className="col-span-1  row-span-2"/>
                <div className="text-3xl ml-4 text-gray-800 col-span-2 p-2"> {currentAlbum.strAlbum} </div>
                <div className="ml-4 col-span-2 p-2 "> {currentAlbum.strDescriptionEN} </div>
                <h3 className="text-2xl  ml-4 font-semibold mt-2 col-span-1 "> Track List</h3>
                
                <div className="col-span-3">
                  <div className="grid grid-cols-3  flex-wrap gap-1 ">
                  { currentAlbum.albumDetails && 
                  <>
                  <a href="#lyrics">
                    <div className="col-span-1 ml-4 p-3">
                    
                      {currentAlbum.albumDetails.map( track => (
                        <div className="text-lg text-gray-800 cursor-pointer hover:bg-gray-800 hover:text-gray-200"
                        onClick={() => handleTrackSelect(track.strTrack)}> {track.strTrack} </div>
                      ))}
                      </div>
                      </a>
                      {/* <div className="col-span-2 p-4  w-full h-full"> 
                        <div className="text-3xl font-semibold text-center"> {artist} - { currentSong } </div>
                        <textarea className=" bg-transparent text-2xl text-center p-2 " value={lyr} cols="50" rows="30"/> 
                      </div> */}
                  </>
                  
                  }
                  </div>
                  <div id="lyrics" className="col-span-2 p-4  w-full h-full"> 
                        <div className="text-3xl font-semibold text-center"> {artist} - { currentSong } </div>
                        <p className=" bg-transparent text-2xl text-center p-2 " value={lyr} cols="50" rows="30"><pre>{lyr}</pre> </p> 
                        <div> <TrackDetails artist={artist} title={currentSong} /> </div>
                      </div>
                </div>
                
            </div>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default TimeLine;
