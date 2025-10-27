export const GET_SAVED_GUIDES = `
  query GetSavedGuides($page: Int!, $size: Int!) {
    bookmark {
      getBookmarkedGuides(page: $page, size: $size) {
        content {
          id
          title
          content
          category
          createdAt
          updatedAt
          views
          bookmarkCount
        }
        totalPages
        totalElements
        currentPage
        pageSize
      }
    }
  }
`;

export const GET_SAVED_POSTS = `
  query GetSavedPosts($page: Int!, $size: Int!) {
    bookmark {
      getBookmarks(page: $page, size: $size) {
        content {
          id
          title
          content
          category
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
        totalPages
        totalElements
        currentPage
        pageSize
      }
    }
  }
`;
