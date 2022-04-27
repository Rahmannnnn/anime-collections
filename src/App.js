import Nav from "./layout/Nav";
import Layout from "./layout/Layout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  AnimeDetail,
  AnimeList,
  CollectionDetail,
  CollectionList,
} from "./pages";
import { Global, css } from "@emotion/react";

import { theme } from "./styles/Theme";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message }) => {
      console.error(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://graphql.anilist.co" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Global
        styles={css`
          body {
            font-family: "Open Sans", sans-serif;
            margin: 0;
            background: ${theme.colors.black};

            ::-webkit-scrollbar {
              width: 7.5px;
            }

            /* Track */
            ::-webkit-scrollbar-track {
              background: ${theme.colors.black};
              opacity: 0;
            }

            /* Handle */
            ::-webkit-scrollbar-thumb {
              background: ${theme.colors.gray};
              border-radius: 10px 0 0 10px;
              margin: 20px;
            }

            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
              background: #0f4c75;
            }
          }
        `}
      />

      <BrowserRouter>
        <Nav />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Layout>
                <AnimeList />
              </Layout>
            }
          />
          <Route path="/anime/:animeId" element={<AnimeDetail />} />

          <Route
            path="collections"
            element={
              <Layout>
                <CollectionList />
              </Layout>
            }
          />
          <Route
            path="collections/:collectionId"
            element={<CollectionDetail />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
