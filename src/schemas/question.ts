import { z } from "zod";

export const QuestionCreateSchema = z.object({
  title: z
    .string()
    .min(1, "제목을 작성해주세요")
    .min(2, "제목은 2자 이상이어야 해요"),
  content: z
    .string()
    .min(1, "내용을 작성해주세요")
    .min(10, "내용은 10자 이상이어야 해요"),
});

export type QuestionCreateInput = z.infer<typeof QuestionCreateSchema>;

export const validateQuestionCreate = (data: unknown) => {
  return QuestionCreateSchema.safeParse(data);
};
