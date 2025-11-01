export interface ReportData {
  reason: string;
  detail: string;
  email: string;
  boardId: string;
  boardTitle?: string;
}

export const sendReport = async (data: ReportData) => {
  try {
    const templateParams = {
      to_email: data.email,
      from_name: "UPIK 신고 시스템",
      subject: `[UPIK 신고 알림] 게시물 신고 - ${data.reason}`,
      reason: data.reason,
      detail: data.detail,
      board_id: data.boardId,
      board_title: data.boardTitle || "제목 없음",
      timestamp: new Date().toLocaleString("ko-KR"),
    };

    const response = await emailjs.send(
      templateParams,
    );
    return { success: true, messageId: response.status };
  } catch (error) {
    throw error;
  }
};

export const sendReportToAdmin = async (
  data: ReportData,
  adminEmail: string,
) => {
  try {
    const templateParams = {
      to_email: adminEmail,
      from_name: data.email,
      subject: `[UPIK 신고] 게시물 신고 - ${data.reason}`,
      reason: data.reason,
      detail: data.detail,
      board_id: data.boardId,
      board_title: data.boardTitle || "제목 없음",
      reporter_email: data.email,
      timestamp: new Date().toLocaleString("ko-KR"),
    };

    const response = await emailjs.send(
      templateParams,
    );
    return { success: true, messageId: response.status };
  } catch (error) {
    throw error;
  }
};
