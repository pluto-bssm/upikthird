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
