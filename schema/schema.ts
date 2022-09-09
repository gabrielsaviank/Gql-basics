// const graphql = require('graphql');
// const axios = require('axios');
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLSchema
} from 'graphql';
import axios from 'axios';

import { CompanyType } from "../types/CompanyType";
import { UserType } from "../types/UserType";

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

const mutation = new GraphQLObjectType(({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                companyId: { type: GraphQLString }
            },
            resolve(parentValue: any, args: { firstName: string }) {
                const { firstName }: { firstName: string } = args;
                return axios.post('http://localhost:3000/users', { firstName })
                    .then(response => response.data);
            }
        },
        deleteUser: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parentValue: any, args: any) {
                const { id } = args;
                return axios.delete(`http://localhost:3000/users/${id}`)
                    .then(response => response.data);
            }
        }
    }
}));

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
});
