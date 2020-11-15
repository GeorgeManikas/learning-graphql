const {
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema
} = require("graphql");
const axios = require("axios");

// main ArtistType
const ArtistType = new GraphQLObjectType({
  name: "Artist",
  fields: () => ({
    idArtist: { type: GraphQLID },
    strArtist: { type: GraphQLString },
    strLabel: { type: GraphQLString },
    strBiographyEN: { type: GraphQLString },
    intFormedYear: { type: GraphQLString },
    intBornYear: { type: GraphQLString },
    intDiedYear: { type: GraphQLString },
    strGenre: { type: GraphQLString },
    strMood: { type: GraphQLString },
    strWebsite: { type: GraphQLString },
    strFacebook: { type: GraphQLString },
    strTwitter: { type: GraphQLString },
    strArtistThumb: { type: GraphQLString },
    strArtistLogo: { type: GraphQLString },
    strArtistClearart: { type: GraphQLString },
    strArtistFanart: { type: GraphQLString },
    strArtistFanart2: { type: GraphQLString },
    strArtistFanart3: { type: GraphQLString },
    strArtistBanner: { type: GraphQLString },
    discography: {
      type: new GraphQLList(DiscographyType),

      async resolve(parent, args) {
        const res = await axios.get(
          `https://www.theaudiodb.com/api/v1/json/1/searchalbum.php?s=${parent.strArtist}`
        );
        const discs = await res.data.album;

        return discs.map((disc) => ({
          strAlbum: disc.strAlbum,
          intYearReleased: disc.intYearReleased,
          strDescriptionEN: disc.strDescriptionEN,
          strAlbumThumb: disc.strAlbumThumb,
          idAlbum: disc.idAlbum,
          albumDetails: async () => {
            const res = await axios.get(
              `https://theaudiodb.com/api/v1/json/1/track.php?m=${disc.idAlbum}`
            );
            const tracks = await res.data.track;
            return tracks.map((t) => ({
              strTrack: t.strTrack
            }));
          }
        }));
      }
    },
    
  })
});

// artist discography
const DiscographyType = new GraphQLObjectType({
  name: "Discography",
  fields: () => ({
    strAlbum: { type: GraphQLString },
    intYearReleased: { type: GraphQLString },
    strDescriptionEN: { type: GraphQLString },
    strAlbumThumb: { type: GraphQLString },
    idAlbum: { type: GraphQLString },
    albumDetails: { type: new GraphQLList(AlbumDetailsType) }
  })
});

// const track TYPE 
const TrackType = new GraphQLObjectType({
  name:"Track",
  fields: () => ({
    strGenre: {type: GraphQLString},
    strMood : { type : GraphQLString},
    strStyle : { type: GraphQLString},
    strDescriptionEN : { type : GraphQLString},
    strTrackThumb : { type: GraphQLString},
    strMusicVid : { type : GraphQLString},
    intScore : { type: GraphQLString},
    intScoreVotes : { type: GraphQLString}

  })
})

// album details
const AlbumDetailsType = new GraphQLObjectType({
  name: "AlbumDetailsType",
  fields: () => ({
    strTrack: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    artist: {
      type: ArtistType,
      args: { strArtist: { type: GraphQLString } },
      async resolve(parent, args) {
        const res = await axios.get(
          `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${args.strArtist}`
        );
        const data = await res.data;
        return {
          ...data.artists[0]
        };
      }
    },
    discography: {
      type: new GraphQLList(DiscographyType),
      args: { strArtist: { type: GraphQLString } },
      async resolve(parent, args) {
        try {
          const res = await axios.get(
            `https://theaudiodb.com/api/v1/json/1/discography.php?s=${args.strArtist}`
          );
          const discs = await res.data.album;

          return discs.map((disc) => ({
            strAlbum: disc.strAlbum,
            intYearReleased: disc.intYearReleased
          }));
        } catch (e) {
          throw e;
        }

      }
    },
    track : {
      type : TrackType,
      args: { strArtist: { type : GraphQLString}, strTrack :{ type: GraphQLString}},
      async resolve(parent,args) {
        const res = await axios.get(`https://theaudiodb.com/api/v1/json/1/searchtrack.php?s=${args.strArtist}&t=${args.strTrack}`)
        const data = await res.data.track[0]
        return {
          ...data 
        }

      }
    }
  })
});

module.exports = new GraphQLSchema({ query: RootQuery });
