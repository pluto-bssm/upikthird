export const GET_LIKED_QUESTIONS = `query MyQuery {
  board {
    getMyQuestions(page: 10, size: 10) {
      content {
        userProfileImage
        viewCount
        userName
        userId
        updatedAt
        title
        isBookmarked
        createdAt
        id
        content
        commentCount
        bookmarkCount
      }
      totalElements
      totalPages
    }
  }
}`;
