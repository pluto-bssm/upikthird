/**
 * Board (Question) GraphQL Mutations
 */

export const CREATE_QUESTION = `
  mutation CreateQuestion($input: CreateBoardInput!) {
    board {
      createQuestion(input: $input) {
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

export const UPDATE_QUESTION = `
  mutation UpdateQuestion($boardId: ID!, $input: UpdateBoardInput!) {
    board {
      updateQuestion(boardId: $boardId, input: $input) {
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
        id
        content
        createdAt
        updatedAt
        author {
          id
          name
        }
      }
    }
  }
`;

export const REPORT_BOARD = `
  mutation ReportBoard($boardId: ID!, $reason: String!, $detail: String!) {
    board {
      reportBoard(boardId: $boardId, reason: $reason, detail: $detail) {
        success
        message
      }
    }
  }
`;

export const REPORT_COMMENT = `
  mutation ReportComment($commentId: ID!, $reason: String!, $detail: String!) {
    board {
      reportComment(commentId: $commentId, reason: $reason, detail: $detail) {
        success
        message
      }
    }
  }
`;
