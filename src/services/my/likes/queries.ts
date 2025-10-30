export const GET_LIKED_QUESTIONS = `query MyQuery {
  board {
    getQuestionList(page: 0, size: 100) {
      content {
        id
        createdAt
        content
        title
        updatedAt
        userId
        userName
        userProfileImage
        isBookmarked
      }
    }
  }
}`;
