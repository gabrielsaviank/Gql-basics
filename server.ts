const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;

import { schema } from './schema/schema'

const app = express();

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Listening on 4000');
});