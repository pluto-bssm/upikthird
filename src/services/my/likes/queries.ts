export const GET_LIKED_QUESTIONS = `query MyQuery {
  board {
    getBookmarkedQuestions {
      content {
        bookmarkCount
        content
        commentCount
        viewCount
        userProfileImage
        userName
        userId
        updatedAt
        title
        isBookmarked
        id
        createdAt
      }
      totalPages
      totalElements
    }
  }
}`;
