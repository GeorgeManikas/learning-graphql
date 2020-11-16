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
      <div className="p-2 ">
        <div className="grid md:grid-cols-4 justify-center items-center">
        <div className="col-span-4 md:col-span-2     ">
            <select className="w-full text-center font-semibold   text-md text-gray-200 mx-auto p-8 bg-gray-700 rounded-xl appearance-none cursor-pointer hover:bg-gray-800">
              <option   selected disabled> Album Name- Year Released  </option>
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

          <div className="w-full md:w-5/6 col-span-4 md:col-span-4 mx-auto  mt-6  ">
            <div className="grid grid-cols-4 w-full bg-gray-200 mx-auto justify-center items-start rounded-xl shadow-md overflow-hidden  ">
                <img src={currentAlbum.strAlbumThumb} alt={currentAlbum.strAlbum} className="col-span-4 md:col-span-4   "/>
                <div className="text-2xl p-2  m-px text-center text-gray-200 col-span-4 md:col-span-1  font-semibold bg-gray-800 "> {currentAlbum.strAlbum} </div>
                <div className="ml-4 col-span-4 md:col-span-3 p-2 md:mt-2"> {currentAlbum.strDescriptionEN} </div>
                <h3 className="text-2xl  md:col-span-1 text-gray-200 bg-gray-800 m-px  p-2  font-semibold mt-2 col-span-4 text-center md:col-span-1 "> Track List</h3>
                
                <div className="col-span-4 md:col-span-3">
                  <div className="grid grid-cols-3  justify-center   gap-1 ">
                  { currentAlbum.albumDetails && 
                  <>
                  <a href="#lyrics" className="col-span-3">
                    <div className="   p-2">
                    
                      {currentAlbum.albumDetails.map( track => (
                        <div className="text-xl w-full  md:text-lg text-gray-800 cursor-pointer hover:bg-gray-800 hover:text-gray-200"
                        onClick={() => handleTrackSelect(track.strTrack)}> {track.strTrack} </div>
                      ))}
                      </div>
                      </a>
                     
                  </>
                  
                  }
                  </div>
                  <div className="md:col-span-1">
                  <h3 className="text-2xl  text-gray-200 bg-gray-800 m-px   font-semibold mt-2  text-center  "> Lyrics </h3>
                        <div className="col-span-4 text-2xl font-semibold text-center"> {artist} - { currentSong } </div>
                        <div className="col-span-4  m-2 text-center">
                        <Lyrics lyrics={lyr} />  

                        </div>
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
