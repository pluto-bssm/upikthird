export const GET_MY_POSTS = `
  query MyQuery {
    board {
      getMyPosts {
        id
        title
        content
        category
        status
        createdAt
        updatedAt
        views
        likes
        commentCount
        author {
          id
          name
        }
      }
    }
  }
`;
