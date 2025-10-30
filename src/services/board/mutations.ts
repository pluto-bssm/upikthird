/**
 * Board (Question) GraphQL Mutations
 */

export const CREATE_QUESTION = `
  mutation CreateQuestion($input: CreateBoardInput!) {
    board {
      createQuestion(input: $input) {
        viewCount
        userProfileImage
        userName
        updatedAt
        userId
        title
        isBookmarked
        id
        createdAt
        commentCount
        bookmarkCount
        content
      }
    }
  }
`;

export const UPDATE_QUESTION = `
  mutation UpdateQuestion($boardId: ID!, $input: UpdateBoardInput!) {
    board {
      updateQuestion(boardId: $boardId, input: $input) {
        viewCount
        userProfileImage
        userName
        updatedAt
        title
        isBookmarked
        id
        createdAt
        content
        commentCount
        bookmarkCount
        userId
      }
    }
  }
`;

export const DELETE_QUESTION = `
  mutation DeleteQuestion($boardId: ID!) {
    board {
      deleteQuestion(boardId: $boardId)
    }
  }
`;

export const CREATE_COMMENT = `
  mutation CreateComment($input: CreateCommentInput!) {
    board {
      createComment(input: $input) {
        boardId
        content
        createdAt
        id
        parentId
        replies {
          boardId
          content
          createdAt
          id
          parentId
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
          updatedAt
          userId
          userName
          userProfileImage
        }
        updatedAt
        userId
        userName
        userProfileImage
      }
    }
  }
`;

export const REPORT_BOARD = `
  mutation ReportBoard($boardId: ID!, $reason: String!, $detail: String!) {
    board {
      reportBoard(boardId: $boardId, reason: $reason, detail: $detail)
    }
  }
`;

export const REPORT_COMMENT = `
  mutation ReportComment($commentId: ID!, $reason: String!, $detail: String!) {
    board {
      reportComment(commentId: $commentId, reason: $reason, detail: $detail)
    }
  }
`;
