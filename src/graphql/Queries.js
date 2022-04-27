import { gql } from "@apollo/client";

export const GET_ANIME_LIST = gql`
  query GetAnimeList($page: Int!) {
    Page(page: $page, perPage: 10) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media {
        id
        title {
          english
          native
          romaji
          userPreferred
        }
        coverImage {
          extraLarge
          large
          medium
          color
        }
        startDate {
          year
          month
          day
        }
      }
    }
  }
`;

export const GET_ANIME_DETAIL = gql`
  query GetAnimeDetail($id: Int!) {
    Media(id: $id) {
      id
      title {
        romaji
        english
        native
        userPreferred
      }
      description
      genres
      coverImage {
        extraLarge
        large
        medium
        color
      }
      bannerImage
      recommendations(page: 1, perPage: 6, sort: RATING_DESC) {
        nodes {
          mediaRecommendation {
            id
            title {
              romaji
              english
              native
              userPreferred
            }
            startDate {
              year
              month
              day
            }
            coverImage {
              extraLarge
              large
              medium
              color
            }
          }
        }
      }
      episodes
      status
      source
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      averageScore
      season
      seasonYear
      popularity
      characters(role: MAIN) {
        nodes {
          image {
            large
            medium
          }
          name {
            first
            middle
            last
            full
            native
            userPreferred
          }
        }
      }
    }
  }
`;
