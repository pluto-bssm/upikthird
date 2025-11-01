"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import styled from "@emotion/styled";
import Header from "@/components/common/header";
import NavigationBar from "@/components/common/navigationbar";
import color from "@/packages/design-system/src/color";
import { useQuestionDetail, useQuestionComments } from "@/hooks/useBoard";
import * as boardApi from "@/services/board/api";

const QuestionDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const boardId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const { question, loading: questionLoading } = useQuestionDetail(
    boardId as string,
  );
  const {
    comments,
    loading: commentsLoading,
    refetch: refetchComments,
  } = useQuestionComments(boardId as string, { page: 0, size: 10 });

  const [comment, setComment] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [replyingTo, setReplyingTo] = React.useState<string | null>(null);
  const [replyContent, setReplyContent] = React.useState("");

  const handleReportClick = () => {
    router.push(`/question/${boardId}/report`);
  };

  const handleReplyClick = (commentId: string) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
    setReplyContent("");
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setSubmitting(true);
      await boardApi.createComment({
        boardId: boardId as string,
        content: comment,
      });
      setComment("");
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  const handleReplySubmit = async (
    e: React.FormEvent,
    parentCommentId: string,
  ) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    try {
      setSubmitting(true);
      await boardApi.createComment({
        boardId: boardId as string,
        content: replyContent,
        parentId: parentCommentId,
      });
      setReplyContent("");
      setReplyingTo(null);
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StyledPage>
      <Header types="report and close" text="" onClose={handleReportClick} />
      <Container>
        {questionLoading ? (
          <LoadingSection>로딩 중...</LoadingSection>
        ) : question ? (
          <>
            <Section>
              <Title>{question.title}</Title>
              <MetaInfo>
                <MetaItem>{question.author?.name || "작성자 미상"}</MetaItem>
                <MetaItem>
                  {new Date(question.createdAt).toLocaleString("ko-KR")}
                </MetaItem>
                <BookmarkBox>
                  <BookmarkText>{question.likes}</BookmarkText>
                </BookmarkBox>
              </MetaInfo>
            </Section>

            <Divider />

            <ContentSection>
              <Content>{question.content}</Content>
            </ContentSection>
          </>
        ) : (
          <ErrorSection>질문을 찾을 수 없습니다.</ErrorSection>
        )}

        <Divider />

        <CommentsSection>
          <CommentCount>댓글 {comments?.totalElements || 0}</CommentCount>
          {commentsLoading ? (
            <LoadingText>댓글 로딩 중...</LoadingText>
          ) : comments?.content && comments.content.length > 0 ? (
            comments.content.map((comment) => (
              <React.Fragment key={comment.id}>
                <CommentItemWrapper isReply={false}>
                  <CommentBox>
                    <CommentHeader>
                      <AuthorName>
                        {comment.author?.name || "작성자 미상"}
                      </AuthorName>
                    </CommentHeader>
                    <CommentContent>{comment.content}</CommentContent>
                    <CommentFooter>
                      <FooterItem>
                        {new Date(comment.createdAt).toLocaleString("ko-KR")}
                      </FooterItem>
                      <FooterReportItem
                        onClick={() =>
                          router.push(
                            `/question/${boardId}/comment-report?commentId=${comment.id}`,
                          )
                        }
                      >
                        신고하기
                      </FooterReportItem>
                      <FooterItem onClick={() => handleReplyClick(comment.id)}>
                        답글쓰기
                      </FooterItem>
                    </CommentFooter>
                  </CommentBox>
                </CommentItemWrapper>

                {replyingTo === comment.id && (
                  <ReplyInputWrapper>
                    <ReplyInputBox>
                      <ReplyInputField
                        placeholder="답글을 입력해주세요"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                      />
                      <ReplySubmitButton
                        onClick={(e) => handleReplySubmit(e, comment.id)}
                        disabled={submitting}
                      >
                        등록
                      </ReplySubmitButton>
                    </ReplyInputBox>
                  </ReplyInputWrapper>
                )}

                {comment.replies &&
                  comment.replies.length > 0 &&
                  comment.replies.map((reply) => (
                    <CommentItemWrapper key={reply.id} isReply={true}>
                      <CommentBox>
                        <CommentHeader>
                          <AuthorName>
                            {reply.author?.name || "작성자 미상"}
                          </AuthorName>
                        </CommentHeader>
                        <CommentContent>{reply.content}</CommentContent>
                        <CommentFooter>
                          <FooterItem>
                            {new Date(reply.createdAt).toLocaleString("ko-KR")}
                          </FooterItem>
                          <FooterReportItem
                            onClick={() =>
                              router.push(
                                `/question/${boardId}/comment-report?commentId=${reply.id}`,
                              )
                            }
                          >
                            신고하기
                          </FooterReportItem>
                        </CommentFooter>
                      </CommentBox>
                    </CommentItemWrapper>
                  ))}
              </React.Fragment>
            ))
          ) : (
            <NoCommentText>댓글이 없습니다.</NoCommentText>
          )}

          <CommentInputBox>
            <CommentInputField
              placeholder="댓글을 입력해주세요"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <CommentSubmitButton
              onClick={handleCommentSubmit}
              disabled={submitting}
            >
              등록
            </CommentSubmitButton>
          </CommentInputBox>
        </CommentsSection>
      </Container>

      <NavigationBar />
    </StyledPage>
  );
};

export default QuestionDetailPage;

const StyledPage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: ${color.white};
  min-height: 100vh;
  padding-top: 80px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
`;

const Title = styled.h1`
  font-family: Pretendard, sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: ${color.black};
  line-height: 1;
  margin: 0;
  word-break: break-word;
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
`;

const MetaItem = styled.span`
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: ${color.gray600};
  white-space: nowrap;

  &:not(:last-child)::after {
    content: "";
    width: 1px;
    height: 10px;
    background-color: ${color.gray600};
    margin-left: 6px;
  }
`;

const BookmarkBox = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  margin-left: 6px;
`;

const BookmarkText = styled.span`
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: ${color.gray600};
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${color.gray200};
  width: 100%;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
`;

const Content = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: ${color.gray700};
  line-height: 24px;
  margin: 0;
  word-break: break-word;
  white-space: pre-wrap;
`;

const CommentsSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CommentCount = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: ${color.gray600};
  line-height: 1;
  margin: 0;
  padding: 20px;
  padding-bottom: 0;
`;

const CommentItemWrapper = styled.div<{ isReply?: boolean }>`
  display: flex;
  gap: 10px;
  padding: 20px;
  padding-left: ${(props) => (props.isReply ? "50px" : "20px")};
  border-bottom: 1px solid ${color.gray100};
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  padding: 20px;
`;

const CommentHeader = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const AuthorName = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: ${color.black};
  line-height: 1;
  margin: 0;
`;

const CommentContent = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${color.black};
  line-height: 1;
  margin: 0;
  word-break: break-word;
  white-space: normal;
`;

const CommentFooter = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: space-between;
`;

const FooterItem = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: ${color.gray300};
  line-height: 1;
  margin: 0;
  white-space: nowrap;

  &:not(:last-child)::after {
    content: "";
    width: 1px;
    height: 10px;
    background-color: ${color.gray300};
    margin-left: 6px;
  }
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const SubmitButton = styled.button`
  font-family: Pretendard, sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: ${color.primary};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const CommentInputBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 20px;
  border-top: 1px solid ${color.gray100};
`;

const CommentInputField = styled.textarea`
  flex: 1;
  background: none;
  border: none;
  font-family: Pretendard, sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: ${color.black};
  outline: none;
  resize: none;
  min-height: 40px;

  &::placeholder {
    color: ${color.gray500};
  }
`;

const FooterReportItem = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: ${color.primary};
  line-height: 1;
  margin: 0;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &::before {
    content: "";
    width: 1px;
    height: 10px;
    background-color: ${color.gray300};
    margin-right: 6px;
    display: inline-block;
  }

  &::after {
    content: "";
    width: 1px;
    height: 10px;
    background-color: ${color.gray300};
    margin-left: 6px;
    display: inline-block;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  max-height: 90vh;
  overflow-y: auto;
  width: 90vw;
  max-width: 400px;
`;

const ModalContent = styled.div`
  background-color: ${color.white};
  border: 1px solid ${color.gray200};
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ModalTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ModalSubtitle = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: ${color.gray700};
  line-height: 1;
  margin: 0;
`;

const ModalTitle = styled.h2`
  font-family: Pretendard, sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: ${color.black};
  line-height: 1;
  margin: 0;
`;

const ModalReasonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ModalDetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LabelWithRequired = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const Label = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${color.gray700};
  line-height: 1;
  margin: 0;
`;

const RequiredMark = styled.span`
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #e71d36;
  line-height: 1;
  margin: 0;
`;

const ReasonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ReasonButton = styled.button<{ isSelected: boolean }>`
  border: 1px solid
    ${(props) => (props.isSelected ? color.primary : color.gray100)};
  border-radius: 16px;
  padding: 19px 20px;
  background-color: ${(props) =>
    props.isSelected ? color.primary : color.white};
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${(props) => (props.isSelected ? color.white : color.gray600)};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    opacity: 0.8;
  }
`;

const DetailTextarea = styled.textarea`
  border: 1px solid ${color.gray100};
  border-radius: 16px;
  padding: 20px;
  min-height: 120px;
  font-family: Pretendard, sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: ${color.black};
  background-color: ${color.white};
  resize: none;
  outline: none;

  &::placeholder {
    color: ${color.gray300};
  }
`;

const CharCount = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: ${color.gray300};
  line-height: 1;
  margin: 0;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ModalCancelButton = styled.button`
  flex: 1;
  background-color: ${color.white};
  border: 1px solid ${color.gray100};
  border-radius: 100px;
  padding: 12px 20px;
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${color.black};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const ModalConfirmButton = styled.button`
  flex: 1;
  background-color: ${(props) =>
    props.disabled ? color.gray200 : color.primary};
  border: none;
  border-radius: 100px;
  padding: 12px 20px;
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${color.white};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 14px;
  color: ${color.gray600};
  padding: 20px;
  margin: 0;
`;

const NoCommentText = styled.p`
  text-align: center;
  font-size: 14px;
  color: ${color.gray600};
  padding: 40px 20px;
  margin: 0;
`;

const CommentSubmitButton = styled.button`
  background-color: ${(props) =>
    props.disabled ? color.gray200 : color.primary};
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: ${color.white};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const LoadingSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  color: ${color.gray600};
`;

const ErrorSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  color: ${color.gray600};
`;

const ReplyInputWrapper = styled.div`
  padding: 0 20px 16px 40px;
`;

const ReplyInputBox = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;

const ReplyInputField = styled.input`
  flex: 1;
  border: 1px solid ${color.gray200};
  border-radius: 6px;
  padding: 10px 12px;
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: ${color.black};
  background-color: ${color.white};
  outline: none;

  &::placeholder {
    color: ${color.gray300};
  }

  &:focus {
    border-color: ${color.primary};
  }
`;

const ReplySubmitButton = styled.button`
  background-color: ${(props) =>
    props.disabled ? color.gray200 : color.primary};
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: ${color.white};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
  }
`;
