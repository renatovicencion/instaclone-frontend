import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { getToken } from './../utils/token';
const cors_anywhere = 'https://cors-anywhere.herokuapp.com/';
const base_url = 'https://rvn-instaclone-backend.herokuapp.com/';

const httpLink = createUploadLink({
    uri: `${cors_anywhere}${base_url}`,
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
});

export default client;