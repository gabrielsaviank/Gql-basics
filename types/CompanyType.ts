import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} from 'graphql';
import axios from 'axios';

import { UserType } from "./UserType";

export const CompanyType: any = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        service: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve( parentValue: { id : string }, args: { id: string } ) {
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`).then(
                    (response: any) => response.data
                );
            }
        }
    })
});
