import { css } from "@emotion/react";

const fontGenerator = (weight: number, size: number) => css`
  font-family: "Pretendard";
  font-weight: ${weight};
  font-size: ${size}px;
  line-height: auto;
`;

const font = {
  D1: fontGenerator(700, 22),
  D2: fontGenerator(700, 20),
  D3: fontGenerator(700, 15),

  H1: fontGenerator(600, 14),
  H2: fontGenerator(600, 13),
  H3: fontGenerator(600, 12),

  caption: fontGenerator(400, 10),

  content: css`
    font-family: "Pretendard";
    font-weight: 400;
    font-size: 15px;
    line-height: 24px;
  `,
};

export default font;
