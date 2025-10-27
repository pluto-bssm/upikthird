/**
 * Board (Question) GraphQL Queries
 */

export const GET_QUESTION_LIST = `
  query GetQuestionList($page: Int!, $size: Int!) {
    board {
      getQuestionList(page: $page, size: $size) {
        content {
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
        totalPages
        totalElements
        currentPage
        pageSize
      }
    }
  }
`;

export const GET_QUESTION_DETAIL = `
  query GetQuestionDetail($boardId: ID!) {
    board {
      getQuestionDetail(boardId: $boardId) {
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

export const GET_COMMENTS = `
  query GetComments($boardId: ID!, $page: Int!, $size: Int!) {
    board {
      getComments(boardId: $boardId, page: $page, size: $size) {
        content {
          id
          content
          createdAt
          updatedAt
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

export const SEARCH_QUESTIONS = `
  query SearchQuestions($keyword: String!, $page: Int!, $size: Int!) {
    board {
      searchQuestions(keyword: $keyword, page: $page, size: $size) {
        content {
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
        totalPages
        totalElements
        currentPage
        pageSize
      }
    }
  }
`;
