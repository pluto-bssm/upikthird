// Inquiry 관련 GraphQL 쿼리 및 뮤테이션
// (향후 백엔드 연동 시 사용)

export const CREATE_INQUIRY = `
  mutation CreateInquiry($type: String!, $content: String!, $email: String!) {
    inquiry {
      createInquiry(type: $type, content: $content, email: $email) {
        id
        type
        content
        email
        createdAt
      }
    }
  }
`;

export const GET_MY_INQUIRIES = `
  query GetMyInquiries($page: Int!, $size: Int!) {
    inquiry {
      getMyInquiries(page: $page, size: $size) {
        content {
          id
          type
          content
          email
          status
          answer
          createdAt
          answeredAt
        }
        totalElements
        totalPages
      }
    }
  }
`;
