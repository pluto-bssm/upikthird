import { gql } from '@apollo/client';

/* ===================== 사용자 관련 ===================== */
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    iam {
      getCurrentUser {
        email
        id
        role
        name
        username
      }
    }
  }
`;

/* ===================== 투표 관련 ===================== */
export const GET_VOTES = gql`
  query GetVotes {
    vote {
      getAllVotes {
        id
        title
        hasVoted
        category
        status
        totalResponses
        finishedAt
        options {
          id
          content
          responseCount
          percentage
        }
      }
    }
  }
`;

export const GET_ALL_VOTES = gql`
  query GetAllVotes {
    vote {
      getAllVotes {
        id
        title
        hasVoted
        category
        status
        totalResponses
        finishedAt
        options {
          id
          content
          responseCount
          percentage
        }
      }
    }
  }
`;

export const GET_MY_VOTES = gql`
  query GetMyVotes {
    vote {
      getMyVotes {
        id
        title
        category
        status
        totalResponses
        finishedAt
        options {
          id
          content
          responseCount
          percentage
        }
      }
    }
  }
`;

export const GET_VOTE_BY_ID = gql`
  query GetVoteById($id: ID!) {
    vote {
      getVoteById(id: $id) {
        id
        title
        category
        status
        totalResponses
        finishedAt
        hasVoted
        options {
          id
          content
          responseCount
          percentage
        }
      }
    }
  }
`;

export const CREATE_VOTE = gql`
  mutation CreateVote($input: CreateVoteInput!) {
    vote {
      createVote(input: $input) {
        id
        title
        category
        status
        totalResponses
        finishedAt
        hasVoted
        options {
          id
          content
          responseCount
          percentage
        }
      }
    }
  }
`;

export const VOTE_ON_OPTION = gql`
  mutation VoteOnOption($voteId: ID!, $optionId: ID!) {
    vote {
      voteOnOption(voteId: $voteId, optionId: $optionId)
    }
  }
`;

export const CREATE_VOTE_RESPONSE = gql`
  mutation CreateVoteResponse($input: CreateVoteResponseInput!) {
    voteResponse {
      createVoteResponse(input: $input) {
        id
        userId
        voteId
        optionId
        optionContent
        voteTitle
        createdAt
      }
    }
  }
`;

export const AIOPTION_CREATE = gql`
  query GenerateOptions($count: Int!, $title: String!) {
    optionGenerator {
      generateOptions(count: $count, title: $title) {
        options
        message
      }
    }
  }
`;

/* ===================== 가이드 관련 ===================== */
export const GET_GUIDES = gql`
  query GetGuides {
    guide {
      getAllGuides {
        id
        title
        content
        category
        createdAt
        like
      }
    }
  }
`;

export const GET_GUIDES_BY_CATEGORY = gql`
  query GetGuidesByCategory($category: String!) {
    guide {
      getGuidesByCategory(category: $category) {
        id
        title
        content
        category
        createdAt
        like
      }
    }
  }
`;

export const GET_GUIDE_BY_ID = gql`
  query GetGuideById($id: ID!) {
    guideById(id: $id) {
      id
      title
      content
      createdAt
      category
      guideType
      likeCount
      revoteCount
      voteId
    }
  }
`;

export const SEARCH_SIMILAR_GUIDES = gql`
  query SearchSimilarGuides($title: String!) {
    keywordGuide {
      searchSimilarByTitle(title: $title) {
        category
        content
        createdAt
        guideType
        id
        keyword
        likeCount
        revoteCount
        title
        userEmail
        userId
        userName
        userProfileImage
      }
    }
  }
`;

/* ===================== 질문/게시판 관련 ===================== */
export const GET_QUESTIONS = gql`
  query GetQuestions($page: Int!, $size: Int!) {
    board {
      getQuestionList(page: $page, size: $size) {
        content {
          id
          title
          userName
          createdAt
          bookmarkCount
          commentCount
          viewCount
        }
        totalElements
        totalPages
      }
    }
  }
`;

export const GET_QUESTION_BY_ID = gql`
  query GetQuestionById($id: ID!) {
    board {
      getQuestionDetail(boardId: $id) {
        id
        title
        content
        userName
        createdAt
        bookmarkCount
        commentCount
        viewCount
      }
    }
  }
`;

export const CREATE_INQUIRY = gql`
  mutation CreateInquiry($input: CreateBoardInput!) {
    board {
      createQuestion(input: $input) {
        id
        title
        content
        createdAt
      }
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation CreateQuestion($title: String!, $content: String!) {
    board {
      createQuestion(input: {title: $title, content: $content}) {
        title
        content
      }
    }
  }
`;

export const REPORT_BOARD = gql`
  mutation ReportBoard($boardId: ID!, $detail: String!, $reason: String!) {
    board {
      reportBoard(boardId: $boardId, detail: $detail, reason: $reason)
    }
  }
`;

export const REPORT_QUESTION = gql`
  mutation ReportQuestion($questionId: ID!, $reason: String!) {
    report {
      reportQuestion(questionId: $questionId, reason: $reason) {
        success
        message
      }
    }
  }
`;
export const GET_SAVED_GUIDES = gql`
  query GetSavedGuides {
    bookmark {
      getBookmarkedGuides {
        id
        title
        content
        category
        createdAt
        like
      }
    }
  }
`;

export const GET_SAVED_QUESTIONS = gql`
  query GetSavedQuestions {
    bookmark {
      getBookmarks {
        id
        userId
        guideId
        createdAt
      }
    }
  }
`;
/* ===================== 댓글 관련 ===================== */
export const GET_COMMENTS = gql`
  query GetComments($boardId: ID!, $page: Int!, $size: Int!) {
    board {
      getComments(boardId: $boardId, page: $page, size: $size) {
        content {
          id
          content
          userName
          createdAt
          updatedAt
          parentId
          replies {
            id
            content
            userName
            createdAt
          }
        }
        totalElements
        totalPages
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    board {
      createComment(input: $input) {
        id
        content
        userName
        createdAt
      }
    }
  }
`;

export const REPORT_COMMENT = gql`
  mutation ReportComment($commentId: ID!, $detail: String!, $reason: String!) {
    board {
      reportComment(commentId: $commentId, detail: $detail, reason: $reason)
    }
  }
`;

/* ===================== 북마크 관련 ===================== */

export const GET_BOOKMARKS = gql`
  query GetBookmarks {
    bookmark {
      getBookmarks {
        createdAt
        guideId
        id
        userId
      }
    }
  }
`;

export const TOGGLE_BOOKMARK = gql`
  mutation ToggleBookmark($guideId: ID!) {
    bookmark {
      toggleBookmark(guideId: $guideId)
    }
  }
`;

export const GET_BOOKMARKED_GUIDES = gql`
  query GetBookmarkedGuides {
    bookmark {
      getBookmarkedGuides {
        id
        title
        content
        createdAt
      }
    }
  }
`;

//모든 가읻드
export const GET_ALL_GUIDES = gql`
query GetAllGuides($page: Int, $size: Int, $sortBy: String) {
  getAllGuides(page: $page, size: $size, sortBy: $sortBy) {
    content {
      category
      content
      createdAt
      id
      like
      title
      voteId
    }
    hasNext
    pageNumber
    size
    totalElements
    totalPages
  }
}
`;

export const GUIDE_BY_ID = gql`
query GuideById($id: ID!) {
  guideById(id: $id) {
    category
    content
    createdAt
    guideType
    id
    likeCount
    revoteCount
    title
    voteId
  }
}
`;

//재투표 뮤테이션
export const REVOTE_MUTATION = gql`
mutation RevoteMutation($input: CreateRevoteRequestInput!) {
  revote {
    createRevoteRequest(input: $input) {
      createdAt
      detailReason
      guideId
      id
      reason
      userId
    }
  }
}
`;

//오늘의 투표
export const TODAY_VOTE = gql`
query TodayVote {
  vote {
    getLeastPopularOpenVote {
      category
      finishedAt
      hasVoted
      id
      options {
        content
        id
        percentage
        responseCount
      }
      status
      title
      totalResponses
    }
  }
}
`;

