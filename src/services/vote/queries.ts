/* ===================== 사용자 관련 ===================== */
export const GET_CURRENT_USER = `query GetCurrentUser { iam { getCurrentUser { email id role name username } } }`;

/* ===================== 투표 관련 ===================== */
export const GET_VOTES = `query GetVotes { vote { getAllVotes(includeExpired: false, includeHasVoted: true) { id title hasVoted category status totalResponses finishedAt options { id content responseCount percentage } } } }`;

export const GET_CHECK_BADWORD = `query MyQuery($text: String!) { checkBadWord(text: $text) { checkedText containsBadWord message } }`;

export const GET_ALL_VOTES = `query GetAllVotes { vote { getAllVotes(includeHasVoted: true, includeExpired: false) { id title hasVoted category status totalResponses finishedAt options { id content responseCount percentage } } } }`;

export const GET_MY_VOTES = `query GetMyVotes { vote { getMyVotes { id title category status totalResponses finishedAt options { id content responseCount percentage } } } }`;

export const GET_VOTE_BY_ID = `query GetVoteById($id: String!) { vote { getVoteById(id: $id) { id title category status totalResponses finishedAt hasVoted options { id content responseCount percentage } } } }`;

export const AIOPTION_CREATE = `query GenerateOptions($count: Int!, $title: String!) { optionGenerator { generateOptions(count: $count, title: $title) { options message } } }`;

export const TODAY_VOTE = `query TodayVote { vote { getLeastPopularOpenVote { category finishedAt hasVoted id options { content id percentage responseCount } status title totalResponses } } }`;

export const GET_LEAST_POPULAR_OPEN_VOTE = `query GetLeastPopularOpenVote { vote { getLeastPopularOpenVote(includeExpired: false, includeHasVoted: false) { category finishedAt hasVoted id options { content id percentage responseCount } status title totalResponses } } }`;

export const GET_MOST_POPULAR_OPEN_VOTE = `query GetMostPopularOpenVote { vote { getMostPopularOpenVote(includeExpired: false, includeHasVoted: false) { category finishedAt hasVoted id options { content id percentage responseCount } status title totalResponses } } }`;

/* ===================== 가이드 관련 ===================== */
export const GET_GUIDES = `query GetGuides { guide { getAllGuides { id title content category createdAt like } } }`;

export const GET_GUIDES_BY_CATEGORY = `query GetGuidesByCategory($category: String!) { guide { getGuidesByCategory(category: $category) { id title content category createdAt like } } }`;

export const GET_GUIDE_BY_ID = `query GetGuideById($id: ID!) { guideById(id: $id) { id title content createdAt category guideType likeCount revoteCount voteId } }`;

export const SEARCH_SIMILAR_GUIDES = `query SearchSimilarGuides($title: String!) { keywordGuide { searchSimilarByTitle(title: $title) { category content createdAt guideType id keyword likeCount revoteCount title userEmail userId userName userProfileImage } } }`;

export const GET_ALL_GUIDES = `query GetAllGuides($page: Int, $size: Int, $sortBy: String) { getAllGuides(page: $page, size: $size, sortBy: $sortBy) { content { category content createdAt id like title voteId } hasNext pageNumber size totalElements totalPages } }`;

export const GUIDE_BY_ID = `query GuideById($id: ID!) { guideById(id: $id) { category content createdAt guideType id likeCount revoteCount title voteId } }`;

/* ===================== 질문/게시판 관련 ===================== */
export const GET_QUESTIONS = `query GetQuestions($page: Int!, $size: Int!) { board { getQuestionList(page: $page, size: $size) { content { id title userName createdAt bookmarkCount commentCount viewCount } totalElements totalPages } } }`;

export const GET_QUESTION_BY_ID = `query GetQuestionById($id: ID!) { board { getQuestionDetail(boardId: $id) { id title content userName createdAt bookmarkCount commentCount viewCount } } }`;

export const GET_SAVED_GUIDES = `query GetSavedGuides { bookmark { getBookmarkedGuides { id title content category createdAt like } } }`;

export const GET_SAVED_QUESTIONS = `query GetSavedQuestions { bookmark { getBookmarks { id userId guideId createdAt } } }`;

/* ===================== 댓글 관련 ===================== */
export const GET_COMMENTS = `query GetComments($boardId: ID!, $page: Int!, $size: Int!) { board { getComments(boardId: $boardId, page: $page, size: $size) { content { id content userName createdAt updatedAt parentId replies { id content userName createdAt } } totalElements totalPages } } }`;

/* ===================== 북마크 관련 ===================== */
export const GET_BOOKMARKS = `query GetBookmarks { bookmark { getBookmarks { createdAt guideId id userId } } }`;

export const GET_BOOKMARKED_GUIDES = `query GetBookmarkedGuides { bookmark { getBookmarkedGuides { id title content createdAt } } }`;
