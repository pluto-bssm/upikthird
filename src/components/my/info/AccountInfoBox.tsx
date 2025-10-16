import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";

type AccountInfoField = {
  label: string;
  value: string;
};

type AccountInfoBoxProps = {
  fields: AccountInfoField[];
};

const AccountInfoBox = ({ fields }: AccountInfoBoxProps) => {
  return (
    <StyledAccountInfoBox>
      {fields.map((field, index) => (
        <FieldGroup key={index}>
          <FieldLabel>{field.label}</FieldLabel>
          <FieldValue>{field.value}</FieldValue>
        </FieldGroup>
      ))}
    </StyledAccountInfoBox>
  );
};

export default AccountInfoBox;

const StyledAccountInfoBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FieldLabel = styled.p`
  ${font.caption};
  color: ${color.gray400};
  margin: 0;
  padding: 0 20px;
`;

const FieldValue = styled.p`
  ${font.H2};
  color: ${color.black};
  margin: 0;
  padding: 0 20px;
`;
