import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} from 'graphql';
import axios from 'axios';

import { CompanyType } from "../types/CompanyType";
import { UserType } from "../types/UserType";
import { mutation } from "../mutations/mutation";

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve( parentValue: () => void, args: { id: string } ) {
                return axios.get(`http://localhost:3000/users/${args.id}`).then(
                    (response: any) => response.data
                );
            }
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve( parentValue: () => void, args: { id: string } ) {
                return axios.get(`http://localhost:3000/companies/${args.id}`).then(
                    (response: any) => response.data
                );
            }
        },
    }
});

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
});
