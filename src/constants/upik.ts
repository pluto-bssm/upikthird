/**
 * Upik Application Constants
 * Central location for all API endpoints, routes, and configuration
 */

// ============================================================================
// API Configuration
// ============================================================================

export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080',
  GRAPHQL_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/graphql',
  OAUTH_PROVIDER: 'https://upik-659794985248.asia-northeast3.run.app',
  TIMEOUT: 15000,
} as const;

// ============================================================================
// OAuth Configuration
// ============================================================================

export const OAUTH = {
  GOOGLE: {
    REDIRECT_URI: `${API.OAUTH_PROVIDER}/login/oauth2/code/google`,
    CALLBACK_PATH: '/login/oauth2/code/google',
  },
} as const;

// ============================================================================
// Route Paths
// ============================================================================

export const ROUTES = {
  // Public routes
  LOGIN: '/login',
  ROOT: '/',
  MAIN: '/',

  // Question routes
  QUESTION: '/question',
  QUESTION_CREATE: '/question/create',
  QUESTION_DETAIL: (id: string) => `/question/${id}`,
  QUESTION_REPORT: (id: string) => `/question/${id}/report`,
  QUESTION_COMMENT_REPORT: (id: string) => `/question/${id}/comment-report`,

  // Vote routes
  VOTE: '/vote',
  VOTE_SEARCH: '/vote/search',

  // My page routes
  MY: '/my',
  MY_VOTES: '/my/my-votes',
  MY_VOTE_RESPONSES: '/my/vote-responses',
  MY_POSTS: '/my/posts',
  MY_INFO: '/my/info',
  MY_ACCOUNT_INFO: '/my/info',
  MY_SAVED_GUIDES: '/my/saved/guide',
  MY_SAVED_POSTS: '/my/saved/post',

  // Other routes
  HOME: '/home',
  GUIDE: '/guide',
  DASHBOARD: '/dashboard',
} as const;

// ============================================================================
// Storage Keys for Authentication
// ============================================================================

export const TOKEN = {
  ACCESS: 'accessToken',
  REFRESH: 'refreshToken',
} as const;

export const STORAGE_KEYS = {
  TOKENS: {
    ACCESS: TOKEN.ACCESS,
    REFRESH: TOKEN.REFRESH,
  },
  USER: 'user',
  THEME: 'theme',
} as const;

// ============================================================================
// HTTP Headers
// ============================================================================

export const HTTP_HEADERS = {
  CONTENT_TYPE: 'application/json',
  AUTHORIZATION: 'Authorization',
  REFRESH_TOKEN: 'Refresh-Token',
} as const;

// ============================================================================
// Status Codes for Error Handling
// ============================================================================

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// ============================================================================
// Error Messages
// ============================================================================

export const ERROR_MESSAGES = {
  UNAUTHORIZED: '다시 로그인 해주세요',
  NETWORK_ERROR: '네트워크 연결을 확인해주세요',
  SERVER_ERROR: '서버 오류가 발생했습니다',
  NOT_FOUND: '요청하신 항목을 찾을 수 없습니다',
} as const;

// ============================================================================
// Feature Flags (Environment-based)
// ============================================================================

export const FEATURE_FLAGS = {
  ENABLE_OAUTH: process.env.NEXT_PUBLIC_ENABLE_OAUTH !== 'false',
  ENABLE_GRAPHQL: process.env.NEXT_PUBLIC_ENABLE_GRAPHQL !== 'false',
  DEBUG_MODE: process.env.NODE_ENV === 'development',
} as const;

// ============================================================================
// Validation Constants
// ============================================================================

export const VALIDATION = {
  QUESTION_TITLE_MAX_LENGTH: 200,
  QUESTION_CONTENT_MAX_LENGTH: 2000,
  REPORT_REASON_MAX_LENGTH: 500,
  MIN_PASSWORD_LENGTH: 8,
} as const;
