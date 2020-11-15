import React from "react";
import { gql, useQuery } from "@apollo/client";
import ArtistBanner from "./ArtistBanner";
import TimeLine from "./TimeLine";
import Social from "./Social";

const ArtistData = ({ artist }) => {
  const FETCH_QUERY = gql`
    query($strArtist: String) {
      artist(strArtist: $strArtist) {
        strArtist
        strArtistBanner
        strArtistFanart
        strArtistFanart2
        strArtistFanart3
        strGenre
        strLabel
        strMood
        intFormedYear
        intDiedYear
        strWebsite
        strFacebook
        strTwitter
        discography {
          strAlbum
          strAlbumThumb
          intYearReleased
          strDescriptionEN
          albumDetails {
            strTrack
          }
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(FETCH_QUERY, {
    variables: { strArtist: artist },
  });
  if (loading) return <div> ...loading ... </div>;
  if (error) return <div> Artist not found </div>;

  return (
    <>
      <div id="banner" className="w-full">
        <ArtistBanner
          strArtistFanart={data.artist.strArtistFanart}
          strArtistFanart2={data.artist.strArtistFanart2}
          strArtistFanart3={data.artist.strArtistFanart3}
        />
      </div>
      <div> <Social artist={data.artist}/> </div>
      <div>
        <TimeLine
          discography={data.artist.discography}
          artist={data.artist.strArtist}
        />
      </div>
    </>
  );
};

export default ArtistData;
