export const GET_MY_POSTS = `
  query MyQuery($page: Int!, $size: Int!) {
    board {
      getMyQuestions(page: $page, size: $size) {
        content {
          bookmarkCount
          commentCount
          content
          createdAt
          id
          isBookmarked
          updatedAt
          title
          userId
          userName
          userProfileImage
          viewCount
        }
        totalElements
        totalPages
      }
    }
  }
`;
