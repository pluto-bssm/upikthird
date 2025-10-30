import { upik } from "@/apis";
import { Storage } from "@/apis/storage/storage";
import { TOKEN } from "@/constants/common/constant";
import { API } from "@/constants/upik";

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

export interface InquiryData {
  type: "오류" | "건의사항" | "신고" | "기타";
  content: string;
  email: string;
  agreePrivacy: boolean;
}

export interface SendInquiryResponse {
  success: boolean;
  message: string;
  error?: string;
}

const SEND_INQUIRY_MUTATION = `
  mutation SendInquiry($input: InquiryInput!) {
    inquiry {
      sendInquiry(input: $input) {
        success
        message
        error
      }
    }
  }
`;

export const sendInquiry = async (
  data: InquiryData,
): Promise<SendInquiryResponse> => {
  const token = Storage.getItem(TOKEN.ACCESS);

  try {
    const response = await upik.post(
      API.GRAPHQL_URL,
      {
        query: SEND_INQUIRY_MUTATION,
        variables: {
          input: {
            inquiryType: data.type,
            content: data.content,
            replyEmail: data.email,
            senderName: "사용자",
          },
        },
      } as GraphQLRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const result = response.data?.data?.inquiry?.sendInquiry;
    if (!result) {
      throw new Error("Failed to send inquiry");
    }

    if (!result.success) {
      throw new Error(
        result.error || result.message || "Inquiry submission failed",
      );
    }
    return result;
  } catch (error) {
    throw error;
  }
};
