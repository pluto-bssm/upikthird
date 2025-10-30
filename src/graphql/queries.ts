/* ===================== 사용자 관련 ===================== */
export const GET_CURRENT_USER = `
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
export const GET_VOTES = `
  query GetVotes {
    vote {
      getAllVotes(includeExpired: false,includeHasVoted: true) {
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

export const GET_CHECK_BADWORD  = `
query MyQuery ($text: String!) {
  checkBadWord(text: $text) {
    checkedText
    containsBadWord
    message
  }
}`

export const GET_ALL_VOTES = `
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

export const GET_MY_VOTES = `
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

export const GET_VOTE_BY_ID = `
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

export const CREATE_TAIL_VOTE = `
mutation MyMutation($question: String!, $voteId: ID!) {
  tail {
    createTail(question: $question, voteId: $voteId) {
      id
      question
      voteId
    }
  }
}`
;

  export const CREATE_VOTE = `
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
            participantThreshold
        }
      }
    }
  `;

export const VOTE_ON_OPTION = `
  mutation VoteOnOption($voteId: ID!, $optionId: ID!) {
    vote {
      voteOnOption(voteId: $voteId, optionId: $optionId)
    }
  }
`;

export const CREATE_VOTE_RESPONSE = `
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

export const AIOPTION_CREATE = `
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
export const GET_GUIDES = `
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

export const GET_GUIDES_BY_CATEGORY = `
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

export const GET_GUIDE_BY_ID = `
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

export const SEARCH_SIMILAR_GUIDES = `
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
export const GET_QUESTIONS = `
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

export const GET_QUESTION_BY_ID = `
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

export const CREATE_INQUIRY = `
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

export const CREATE_QUESTION = `
  mutation CreateQuestion($title: String!, $content: String!) {
    board {
      createQuestion(input: {title: $title, content: $content}) {
        title
        content
      }
    }
  }
`;

export const REPORT_BOARD = `
  mutation ReportBoard($boardId: ID!, $detail: String!, $reason: String!) {
    board {
      reportBoard(boardId: $boardId, detail: $detail, reason: $reason)
    }
  }
`;

export const REPORT_QUESTION = `
  mutation ReportQuestion($questionId: ID!, $reason: String!) {
    report {
      reportQuestion(questionId: $questionId, reason: $reason) {
        success
        message
      }
    }
  }
`;
export const GET_SAVED_GUIDES = `
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

export const GET_SAVED_QUESTIONS = `
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
export const GET_COMMENTS = `
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

export const CREATE_COMMENT = `
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

export const REPORT_COMMENT = `
  mutation ReportComment($commentId: ID!, $detail: String!, $reason: String!) {
    board {
      reportComment(commentId: $commentId, detail: $detail, reason: $reason)
    }
  }
`;

/* ===================== 북마크 관련 ===================== */

export const GET_BOOKMARKS = `
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

export const TOGGLE_BOOKMARK = `
  mutation ToggleBookmark($guideId: ID!) {
    bookmark {
      toggleBookmark(guideId: $guideId)
    }
  }
`;

export const GET_BOOKMARKED_GUIDES = `
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
export const GET_ALL_GUIDES = `
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

export const GUIDE_BY_ID = `
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
export const REVOTE_MUTATION = `
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
export const TODAY_VOTE = `
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

//가장 인기없는 투표 쿼리(메인)
export const GET_LEAST_POPULAR_OPEN_VOTE = `
query GetLeastPopularOpenVote {
  vote {
    getLeastPopularOpenVote(includeExpired: false, includeHasVoted: false) {
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

//가장 인기많은 투표 쿼리(메인)
export const GET_MOST_POPULAR_OPEN_VOTE = `
query GetMostPopularOpenVote {
  vote {
    getMostPopularOpenVote(includeExpired: false, includeHasVoted: false) {
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

//재투표 요청 뮤테이션
export const ACCEPT_GUIDE_REPORT = `
mutation AcceptGuideReport($guideId: ID!, $userId: ID!) {
  revote {
    acceptGuideReport(guideId: $guideId, userId: $userId) {
      message
      newQuestionId
      success
    }
  }
}
`;

//재투표 요청 뮤테이션
export const OPTION_GENERATOR = `
mutation OptionGenerator($guideId: ID!, $reason: String!, $reporterName: String!) {
  optionGenerator {
    reportGuide(guideId: $guideId, reason: $reason, reporterName: $reporterName) {
      message
      reportId
      success
    }
  }
}
`;