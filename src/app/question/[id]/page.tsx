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
        boardId as string
    );

    const {
        comments,
        loading: commentsLoading,
        error: commentsError,
        refetch: refetchComments,
    } = useQuestionComments(boardId as string, { page: 0, size: 10 });

    const [comment, setComment] = React.useState("");
    const [submitting, setSubmitting] = React.useState(false);
    const [replyingTo, setReplyingTo] = React.useState<{
        id: string;
        name: string;
    } | null>(null);
    const [isBookmarked, setIsBookmarked] = React.useState(false);

    React.useEffect(() => {
        if (!boardId) {
            console.error("Board ID is missing");
            return;
        }
    }, [boardId]);

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
        } catch (error) {
            alert("북마크 처리에 실패했습니다.");
            console.error("Bookmark error:", error);
        }
    };

    const handleReplyClick = (commentId: string, authorName: string) => {
        if (replyingTo?.id === commentId) {
            setReplyingTo(null);
            setComment("");
        } else {
            setReplyingTo({ id: commentId, name: authorName });
            setComment("");
        }
    };

    const handleCancelReply = () => {
        setReplyingTo(null);
        setComment("");
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim() || !boardId) return;

        try {
            setSubmitting(true);

            if (replyingTo) {
                // 답글 작성
                await boardApi.createComment({
                    boardId: boardId as string,
                    content: comment,
                    parentId: replyingTo.id,
                });
                setReplyingTo(null);
            } else {
                // 일반 댓글 작성
                await boardApi.createComment({
                    boardId: boardId as string,
                    content: comment,
                });
            }

            setComment("");
            await refetchComments();
        } catch (error) {
            alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
            console.error("Comment submission error:", error);
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
                onSubmit={() => {
                    router.push(`${path}/report`);
                }}
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
                    <CommentCount>댓글 <CommentCountNumber>{comments?.totalElements || 0}</CommentCountNumber></CommentCount>

                    {commentsError ? (
                        <ErrorText>댓글을 불러오는데 실패했습니다.</ErrorText>
                    ) : commentsLoading ? (
                        <LoadingText>댓글 로딩 중...</LoadingText>
                    ) : comments?.content && comments.content.length > 0 ? (
                        comments.content.map((commentItem) => (
                            <React.Fragment key={commentItem.id}>
                                <CommentItemWrapper isReply={false}>
                                    <CommentBox>
                                        <CommentHeader>
                                            <AuthorName>
                                                {commentItem.author?.name || "작성자 미상"}
                                            </AuthorName>
                                        </CommentHeader>
                                        <CommentContent>{commentItem.content}</CommentContent>
                                        <CommentFooter>
                                            <FooterItem>
                                                {new Date(commentItem.createdAt).toLocaleString(
                                                    "ko-KR"
                                                )}
                                            </FooterItem>
                                            <FooterReportItem
                                                onClick={() =>
                                                    router.push(
                                                        `/question/${boardId}/comment-report?commentId=${commentItem.id}`
                                                    )
                                                }
                                            >
                                                신고하기
                                            </FooterReportItem>
                                            <FooterItem
                                                onClick={() =>
                                                    handleReplyClick(
                                                        commentItem.id,
                                                        commentItem.author?.name || "작성자 미상"
                                                    )
                                                }
                                            >
                                                답글쓰기
                                            </FooterItem>
                                        </CommentFooter>
                                    </CommentBox>
                                </CommentItemWrapper>

                                {commentItem.replies &&
                                    commentItem.replies.length > 0 &&
                                    commentItem.replies.map((reply) => (
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
                                                                `/question/${boardId}/comment-report?commentId=${reply.id}`
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
                </CommentsSection>
            </Container>
            <CommentInputWrapper>
                {replyingTo && (
                    <ReplyingToBar>
                        <ReplyingToText>@{replyingTo.name}에게 답글 작성 중</ReplyingToText>
                        <CancelReplyButton onClick={handleCancelReply}>
                            취소
                        </CancelReplyButton>
                    </ReplyingToBar>
                )}
                <CommentInputBox>
                    <CommentInputField
                        placeholder={
                            replyingTo ? "답글을 입력해주세요" : "댓글을 입력해주세요"
                        }
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
            </CommentInputWrapper>

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
  padding-bottom: 140px; /* 댓글 입력창 + 네비게이션바 높이 */
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
  color: ${color.gray600};
  white-space: nowrap;

  &:not(:last-child)::after {
    content: "";
    width: 1px;
    height: 10px;
    color: ${color.gray600};
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
  color: ${color.black};
  padding: 20px;
`;

const Content = styled.p`
  ${font.P1}
  color: ${color.black};
  line-height: 24px;
  margin: 0;
    min-height: 200px;
  word-break: break-word;
  white-space: pre-wrap;
`;

const CommentsSection = styled.div`
  display: flex;
  color: ${color.black};
  flex-direction: column;
    border-radius: 4px;
  width: 100%;
`;

const CommentCount = styled.p`
  ${font.P1}
  background-color: ${color.gray50};
  color: ${color.black};
  line-height: 1;
  margin: 0;
  padding: 20px;
  padding-bottom: 0;
`;

const CommentCountNumber = styled.span`
    ${font.P1}
    color: ${color.primary};
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
  ${font.H1}
  color: ${color.black};
  margin: 0;
`;

const CommentContent = styled.p`
  ${font.P1}
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
  cursor: pointer;
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

/* 하단 고정 댓글 입력 영역 */
const CommentInputWrapper = styled.div`
  position: fixed;
  bottom: 80px; 
  left: 0;
  right: 0;
  max-width: 600px;
  margin: 0 auto;
  background-color: ${color.white};
  border-top: 1px solid ${color.gray200};
  z-index: 100;
`;

const ReplyingToBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  background-color: ${color.gray100};
  border-bottom: 1px solid ${color.gray200};
`;

const ReplyingToText = styled.span`
  ${font.P2}
  color: ${color.black};
`;

const CancelReplyButton = styled.button`
  background: none;
  border: none;
  ${font.P2}
  color: ${color.gray500};
  cursor: pointer;
  padding: 4px 8px;

  &:hover {
    color: ${color.black};
  }
`;

const CommentInputBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 12px 20px;
`;

const CommentInputField = styled.textarea`
  flex: 1;
  border: none;
  border-radius: 8px;
  padding: 10px 4px 12px 12px;
  ${font.H2}
  line-height: 22px;
  color: ${color.gray50};
  outline: none;
  resize: none;
    max-height: 100px;
    
`;

const CommentSubmitButton = styled.button`
  background-color: ${(props) =>
    props.disabled ? color.gray200 : color.primary};
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
    ${font.P1}
  color: ${color.white};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;
