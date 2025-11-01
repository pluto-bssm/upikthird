export const GET_QUESTION_LIST = `query MyQuery($page: Int!, $size: Int!) {
  board {
    getQuestionList(page: $page, size: $size) {
      content {
        bookmarkCount
        commentCount
        content
        createdAt
        id
        isBookmarked
        title
        updatedAt
        userName
        userId
        userProfileImage
        viewCount
      }
      totalElements
      totalPages
    }
  }
}`;

export const GET_QUESTION_DETAIL = `query MyQuery($boardId: ID!) {
  board {
    getQuestionDetail(boardId: $boardId) {
      bookmarkCount
      commentCount
      content
      createdAt
      id
      isBookmarked
      title
      updatedAt
      userId
      userName
      userProfileImage
    }
  }
}`;

export const GET_COMMENTS = `query MyQuery($boardId: ID!, $page: Int!, $size: Int!) {
  board {
    getComments(boardId: $boardId, page: $page, size: $size) {
      content {
        content
        createdAt
        id
        parentId
        boardId
        updatedAt
        userId
        userName
        userProfileImage
        replies {
          boardId
          content
          createdAt
          id
          parentId
          updatedAt
          userId
          userName
          userProfileImage
          replies {
            boardId
            createdAt
            content
            id
            parentId
            updatedAt
            userId
            userName
            userProfileImage
            replies {
              boardId
              createdAt
              content
              id
              parentId
              updatedAt
              userId
              userName
              userProfileImage
            }
          }
        }
      }
      totalElements
      totalPages
    }
  }
}`;

export const SEARCH_QUESTIONS = `query SearchQuestions($keyword: String!, $page: Int!, $size: Int!) { board { searchQuestions(keyword: $keyword, page: $page, size: $size) { content { id title content category status createdAt updatedAt views likes commentCount author { id name } } totalPages totalElements currentPage pageSize } } }`;

export const GET_REPORTS_BY_TARGET = `query GetReportsByTarget($targetId: ID!) {
  report {
    getReportsByTarget(targetId: $targetId) {
      authorId
      authorName
      category
      content
      guideType
      createdAt
      likeCount
      reason
      revoteCount
      targetCreatedAt
      targetId
      targetTitle
      targetType
      userId
    }
  }
}`;
