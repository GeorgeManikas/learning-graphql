import React, { useEffect } from "react";
import ReactPlayer from 'react-player'
import { gql, useQuery } from "@apollo/client";

const TrackDetails = ({ artist, title }) => {
  // graphql query for fetching song details
  const TRACK_DETAILS_QUERY = gql`
    query ($strArtist: String , $strTrack: String) {
      track(strArtist: $strArtist,strTrack: $strTrack) {
        strGenre
        strMood
        strStyle
        strDescriptionEN
        strTrackThumb
        strMusicVid
        intScore
        intScoreVotes
      }
    }
  `;

  const { data, loading, error } = useQuery(TRACK_DETAILS_QUERY, { variables:{ strArtist:artist, strTrack: title}});
  if (loading) return <div>...loading ... </div>;
  if (error) return <div>  </div>;

  // converts youtube url to embed url
  
  return (
      <>
    {/* <pre>
      {JSON.stringify(data, null, 4)}
    </pre> */}
    { data.track.strDescriptionEN && 
    
    <div className="ml-4 mt-4 text-gray-800 font-semibold"> <small> *** {data.track.strDescriptionEN} </small></div>
    }
    
    { data.track.strMusicVid ? 
      <div className="p-3 w-full ">
      <ReactPlayer width="80vw" url={data.track.strMusicVid}  /> 
    </div>    
    :
      <div> No music video found for this song ... </div>
    }
    <div className="w-full md:w-1/2 mx-auto p-4 my-6 bg-gray-800 text-center text-gray-200 rounded-full hover:bg-gray-900 cursor-pointer">
    <a  href="#banner"> top of page...</a>
    </div>
    </>
  );
};

export default TrackDetails;
