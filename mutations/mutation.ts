import {
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} from "graphql/index";
import { UserType } from "../types/UserType";
import axios from "axios";

export const mutation = new GraphQLObjectType(({
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
            resolve(parentValue: any, args: { id: string }) {
                const { id } = args;
                return axios.delete(`http://localhost:3000/users/${id}`)
                    .then(response => response.data);
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                surName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parentValue: any, args: {
                id: string,
                firstName: string,
                surName:string,
                age: number }
            ) {
                let {
                    id,
                    firstName,
                    surName,
                    age
                } = args;
                return axios.patch(`http://localhost:3000/users/${id}`, { firstName, surName, age })
                    .then(response => response.data);
            }
        }
    }
}));