import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} from 'graphql';
import axios from 'axios';

import { CompanyType } from "./CompanyType";

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString},
        firstName: { type: GraphQLString },
        surName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            type: CompanyType,
            resolve( parentValue: { companyId: string }, args: { id: string } ) {
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`).then(
                    (response: any) => response.data
                );
            }
        }
    })
});
