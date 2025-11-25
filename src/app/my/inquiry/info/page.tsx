"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import Header from "@/components/common/header";
import font from "@/packages/design-system/src/font";

const InfoPage = () => {
  return (
    <StyledInquiryPage>
      <Header types={"title"} text={"개인정보 수집 및 이용"} />
      <Text>
        당사는 고객문의 접수 및 응대를 위해 아래와 같이
        <br /> 개인정보를 수집·이용합니다.
        <br />
        <br />
        1. 수집하는 개인정보 항목
        <br />
        필수 항목: 이메일 주소
        <br />
        선택 항목: 사용자가 작성한 문의 내용 중 포함될 수 있는 개인정보(이름,
        연락처 등)
        <br />
        <br />
        2. 개인정보의 수집 및 이용 목적
        <br />
        문의 내용 확인
        <br />
        사용자 본인 확인
        <br />
        문의에 대한 답변 및 후속 조치
        <br />
        서비스 이용 중 발생한 불편사항 해결
        <br />
        <br />
        3. 개인정보의 보유 및 이용 기간
        <br />
        원칙적으로 문의 처리 완료 후 1년간 보관 후 지체 없이 파기합니다.
        <br />  (법령에서 별도로 정하는 경우 해당 기간 동안 보관합니다.)
        <br />
        <br />
        4. 개인정보의 파기 절차 및 방법
        <br />
        보유 기간 경과 후 즉시 파기합니다.
        <br />
        전자적 파일 형태: 복구 불가능한 방법으로 삭제
        <br />
        문서 형태: 분쇄 또는 소각
        <br />
        <br />
        5. 개인정보 제공 및 위탁
        <br />
        원칙적으로 제3자에게 제공하지 않습니다.
        <br />
        문의 대응 과정에서 필요한 경우 일부 업무를 위탁할 수 있으며, <br />
        위탁 시 관련 내용을 개인정보 처리방침에 공개합니다.
        <br />
        <br />
        6. 이용자의 권리 및 행사 방법
        <br />
        이용자는 언제든지 자신의 개인정보 열람·정정·삭제를 요청할 수 있습니다.
        <br />
        개인정보 열람·정정·삭제 요청은 고객센터를 통해 가능합니다.
        <br />
        <br />
        7. 동의 거부 권리 및 불이익 안내
        <br />
        이용자는 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다.
        <br />
        다만 필수 항목에 대한 동의를 거부할 경우 문의 접수가 불가능합니다.
      </Text>
    </StyledInquiryPage>
  );
};

export default InfoPage;

const StyledInquiryPage = styled.div`
  max-width: 600px;
  width: 100%;
  background-color: ${color.white};
  min-height: 100vh;
  position: relative;
`;

const Text = styled.p`
  ${font.P2}
  margin: 100px 30px;
`;
