'use client'
import styled from "@emotion/styled";
import {MakeSchool,Domitory,Humor} from "../../../public/svg/svg";

export default function GuideCategoryImage({ category }: { category: string }) {
  if (category === "학교생활") {
    return (<ImageLayout>
                <MakeSchool width="100%" height="100%" />
            </ImageLayout>);
  }
  if (category === "기숙사") {
    return (<ImageLayout>
                <Domitory width="100%" height="100%" />
            </ImageLayout>);
  }
  if (category === "유머") {
    return (<ImageLayout>
                <Humor width="100%" height="100%" />
            </ImageLayout>);
  }
  return null;
}

const ImageLayout = styled.div`
    object-fit: fill;
    height: 100%;
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
`