const {
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
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
  }),
});

// artist discography 
const DiscographyType = new GraphQLObjectType({
    name:"Discography",
    fields: () => ({
        strAlbum: {type: GraphQLString},
        intYearReleased: {type: GraphQLString} ,
        

}),
    
})



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
          ...data.artists[0],
        };
      },
    },
    discography : {
        type:DiscographyType,
        args: { strArtist: {type:GraphQLString} },
        async resolve(parent,args){
            const album, year = [] ;
            const res = await axios.get(`https://theaudiodb.com/api/v1/json/1/discography.php?s=${args.strArtist}`)
            const disc = await res.data 
            return { ...disc.album[0]}
        }
    }
    
  }),
});

module.exports = new GraphQLSchema({ query: RootQuery });
