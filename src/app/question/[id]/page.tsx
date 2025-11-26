"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import styled from "@emotion/styled";
import Header from "@/components/common/header";
import NavigationBar from "@/components/common/navigationbar";
import color from "@/packages/design-system/src/color";
import { useQuestionDetail, useQuestionComments } from "@/hooks/useBoard";
import * as boardApi from "@/services/board/api";
import { Bookmark } from "../../../../public/svg/svg";
import font from "@/packages/design-system/src/font";
import { usePathname } from "next/navigation";

const QuestionDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const boardId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const path = usePathname();
   const { question, loading: questionLoading } = useQuestionDetail(
      boardId as string,
    );

  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
    refetch: refetchComments,
  } = useQuestionComments(boardId as string, { page: 0, size: 10 });

  const [comment, setComment] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [replyingTo, setReplyingTo] = React.useState<string | null>(null);
  const [replyContent, setReplyContent] = React.useState("");
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  React.useEffect(() => {
    if (!boardId) {
      console.error("Board ID is missing");
      return;
    }
  }, [boardId]);

  // question이 로드되면 북마크 상태 초기화
  React.useEffect(() => {
    if (question) {
      setIsBookmarked(question.isBookmarked || false);
    }
  }, [question]);

  const handleReportClick = () => {
    router.push(`/question/${boardId}/report`);
  };

  const handleBookmarkClick = async () => {
    if (!boardId) return;

    try {
      await boardApi.toggleBoardBookmark(boardId);
      setIsBookmarked(!isBookmarked);
      await refetchQuestion();
    } catch (error) {
      alert("북마크 처리에 실패했습니다.");
      console.error("Bookmark error:", error);
    }
  };

  const handleReplyClick = (commentId: string) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
    setReplyContent("");
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !boardId) return;

    try {
      setSubmitting(true);
      await boardApi.createComment({
        boardId: boardId as string,
        content: comment,
      });
      setComment("");
      await refetchComments();
    } catch (error) {
      alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
      console.error("Comment submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReplySubmit = async (
    e: React.FormEvent,
    parentCommentId: string,
  ) => {
    e.preventDefault();
    if (!replyContent.trim() || !boardId) return;

    try {
      setSubmitting(true);
      await boardApi.createComment({
        boardId: boardId as string,
        content: replyContent,
        parentId: parentCommentId,
      });
      setReplyContent("");
      setReplyingTo(null);
      await refetchComments();
    } catch (error) {
      alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
      console.error("Reply submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!boardId) {
    return (
      <StyledPage>
        <Header
          types="report and bookmark"
          text=""
          onClose={() => router.back()}
        />
        <Container>
          <ErrorSection>잘못된 접근입니다.</ErrorSection>
        </Container>
        <NavigationBar />
      </StyledPage>
    );
  }

  return (
    <StyledPage>

      <Header
        types="report and bookmark"
        text=""
        onClose={handleReportClick}
        onToggleBookmark={handleBookmarkClick}
        bookmarked={isBookmarked}
        onSubmit={() => {router.push(`${path}/report`);}}
      />
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
                  <Bookmark width={20} filled={isBookmarked} />
                  <BookmarkText>{question.bookmarkCount}</BookmarkText>
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

          {commentsError ? (
            <ErrorText>댓글을 불러오는데 실패했습니다.</ErrorText>
          ) : commentsLoading ? (
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
                        disabled={
                          submitting || !replyContent.trim() || !boardId
                        }
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
              disabled={submitting || !comment.trim() || !boardId}
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

const ErrorText = styled.p`
  text-align: center;
  font-size: 14px;
  color: ${color.black};
  padding: 20px;
  margin: 0;
`;

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
  ${font.D2}
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
  ${font.P1}
  color: ${color.black};
  white-space: nowrap;

  &:not(:last-child)::after {
    content: "";
    width: 1px;
    height: 10px;
    color: ${color.black};
    margin-left: 6px;
  }
`;

const BookmarkBox = styled.div`
  display: flex;
  gap: 2px;
  justify-content: center;
  align-items: center;
`;

const BookmarkText = styled.span`
  font-family: Pretendard, sans-serif;
  ${font.P1}
  color: ${color.black};
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
  color: ${color.black};
  padding: 20px;
`;

const Content = styled.p`
  ${font.P1}
  color: ${color.black};
  line-height: 24px;
  margin: 0;
  word-break: break-word;
  white-space: pre-wrap;
`;

const CommentsSection = styled.div`
  display: flex;
  color: ${color.black};
  flex-direction: column;
  width: 100%;
`;

const CommentCount = styled.p`
  ${font.H2}
  font-weight: 400;
  color: ${color.black};
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
  ${font.H2}
  color: ${color.black};
  margin: 0;
`;

const CommentContent = styled.p`
  ${font.H2}
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
`;

const FooterItem = styled.p`
  ${font.P2}
  color: ${color.black};
  line-height: 1;
  margin: 0;
  white-space: nowrap;
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
  ${font.H2}
  color: ${color.black};
  outline: none;
  resize: none;
  min-height: 40px;

  &::placeholder {
    color: ${color.gray500};
  }
`;

const FooterReportItem = styled.p`
  ${font.P2}
  color: ${color.black};
  line-height: 1;
  margin: 0;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &::before {
    content: "";
    width: 1px;
    height: 10px;
    margin-right: 6px;
    display: inline-block;
  }

  &::after {
    content: "";
    width: 1px;
    height: 10px;
    margin-left: 6px;
    display: inline-block;
  }
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 14px;
  color: ${color.black};
  padding: 20px;
  margin: 0;
`;

const NoCommentText = styled.p`
  text-align: center;
  font-size: 14px;
  color: ${color.black};
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
  color: ${color.black};
`;

const ErrorSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  color: ${color.black};
`;

const ReplyInputWrapper = styled.div`
  padding: 16px;
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
    color: ${color.black};
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
