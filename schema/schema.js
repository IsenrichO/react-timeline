const graphql = require('graphql');
const Axios = require('axios');
import Event from '../db/models/Event';

const {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = graphql;

const EventType = new GraphQLObjectType({
  fields: {
    date: { type: GraphQLString },
    location: { type: GraphQLString },
    name: { type: GraphQLString },
    numRevisions: { type: GraphQLInt },
    uuid: { type: GraphQLString },
  },
  name: 'Event',
});

const PhotoType = new GraphQLObjectType({
  fields: {},
  name: 'Photo',
});

const getProjections = (fieldASTs) => fieldASTs.fieldNodes[0].selectionSet.selections
  .reduce((projections, selection) => {
    projections[selection.name.value] = 1;
    return projections;
  }, {});

const RootQuery = new GraphQLObjectType({
  fields: {
    event: {
      args: { uuid: { type: GraphQLString } },
      resolve(parentValue, args, source, fieldASTs) {
        // console.log({ args, parentValue, source, fieldASTs });
        console.log({ args });
        // console.log('AST:', getProjections(fieldASTs));
        // return Axios
        //   .get('http://localhost:28017/events')
        //   // .get(`http://localhost:3000/events/${args.uuid}`)
        //   .then(({ data = {} }) => console.log('\nDATA:', data));
        return Event
          .findById(args.uuid);
      },
      type: EventType,
    },
  },
  name: 'RootQueryType',
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
