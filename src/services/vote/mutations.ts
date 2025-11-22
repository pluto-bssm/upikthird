/* ===================== 투표 관련 ===================== */
export const CREATE_TAIL_VOTE = `
  mutation MyMutation($question: String!, $voteId: ID!) {
    tail {
      createTail(question: $question, voteId: $voteId) {
        id
        question
        voteId
      }
    }
  }
`;

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
        closureType
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

/* ===================== 질문/게시판 관련 ===================== */
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

/* ===================== 댓글 관련 ===================== */
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
export const TOGGLE_BOOKMARK = `
  mutation ToggleBookmark($guideId: ID!) {
    bookmark {
      toggleBookmark(guideId: $guideId)
    }
  }
`;

/* ===================== 재투표 관련 ===================== */
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

export const OPTION_GEERATOR_COUNT =`

mutation MyMutation {
  aiQuota {
    useAIQuota {
      canUseNow
      lastResetDate
      maxUsageCount
      usageCount
      remainingCount
    }
  }
}
`