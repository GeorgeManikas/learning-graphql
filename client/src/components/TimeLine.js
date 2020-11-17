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
          <div className="col-span-4     ">
            <select className="w-full lg:w-5/6 lg:ml-40 text-center font-semibold   text-md text-gray-200 mx-auto p-8 bg-gray-700 rounded-xl appearance-none cursor-pointer hover:bg-gray-800">
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

          <div className="w-full lg:w-5/6 col-span-4  mx-auto  mt-6  ">
            <div className="grid grid-cols-4 w-full bg-gray-200 mx-auto justify-center items-start rounded-xl shadow-md overflow-hidden  ">
                <img className="col-span-4 md:mx-auto   " src={currentAlbum.strAlbumThumb} alt={currentAlbum.strAlbum} />
                <div className="text-2xl p-2  m-8 text-center text-gray-200 col-span-4 md:col-span-1 font-semibold bg-gray-800 shadow-xl"> {currentAlbum.strAlbum} </div>
                <div className={`${!currentAlbum.strDescriptionEN && "hidden"} ml-4 col-span-4 md:col-span-3 p-4`}> {currentAlbum.strDescriptionEN} </div>
                <h3 className="col-span-4 md:col-span-1 text-2xl p-2  m-8 text-center text-gray-200 font-semibold bg-gray-800 shadow-xl "> Track List</h3>
                <div className="col-span-4 md:col-span-3 p-2">
                  { currentAlbum.albumDetails && 
                  <>
                  <a href="#lyrics" >
                    <div className=" ">
                    
                      {currentAlbum.albumDetails.map( track => (
                        <div className="text-xl text-center    md:text-md md:mt-5 text-gray-800 cursor-pointer hover:bg-gray-800 hover:text-gray-200"
                        onClick={() => handleTrackSelect(track.strTrack)}> {track.strTrack} </div>
                      ))}
                      </div>
                      </a>
                     
                  </>
                  
                  }
                  </div>
                <h3 className="col-span-4 md:col-span-1 text-2xl p-2 py-8 m-8 text-center text-gray-200 font-semibold bg-gray-800 shadow-xl "> Lyrics </h3>  
                  <div className="col-span-4  md:col-span-3 m-6 ">
                  <div className=" text-2xl font-semibold mb-2  "> {artist} - { currentSong } </div>
                    <Lyrics lyrics={lyr} />  
                  </div>
                <h3 className="col-span-4 md:col-span-1 text-2xl p-2 py-2 m-8 text-center text-gray-200 font-semibold bg-gray-800 shadow-xl "> Track Details  </h3>  
                        <div className="col-span-4 md:col-span-3 m-4"> 
                          <TrackDetails  artist={artist} title={currentSong} /> 
                        </div>
                <div className="col-span-4 mx-12 p-4 px-12 my-6   bg-gray-800 text-center text-gray-200 rounded-full hover:bg-gray-900 cursor-pointer">
                    <a  href="#banner"> top of page...</a>
                </div>
                
            </div>
            
            
                
                 
                 
                 
                        </div>
                
                </div>
            </div>
      
    </>
  );
};

export default TimeLine;
