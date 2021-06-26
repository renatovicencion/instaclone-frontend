import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { getToken } from './../utils/token';

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}

const httpLink = createUploadLink({
    uri: "https://rvn-instaclone-backend.herokuapp.com/",
});

const authLink = setContext((_, { headers }) => {
    const token = getToken();

    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
    fetchOptions: {
        mode: 'no-cors',
    },
});

client.applyMiddleware({ cors: corsOptions });

export default client;