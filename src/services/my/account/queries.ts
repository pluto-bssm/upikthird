export const GET_CURRENT_USER = `
  query GetCurrentUser {
    iam {
      getCurrentUser {
        id
        name
        email
        studentId
        role
        status
        avatar
        createdAt
      }
    }
  }
`;
