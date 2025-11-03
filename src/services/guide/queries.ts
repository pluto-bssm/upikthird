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