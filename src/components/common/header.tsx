import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color"
import font from "@/packages/design-system/src/font"
import Image from "next/image";

type variant = 'default' | "bookmark" | "close" | "register" | "report and close" | "report and bookmark" | "title" | "close and option" | "search"


type HeaderProps = {
    types : variant
    text? : string
    placeholers? : string
}
const Header = ({types , text , placeholers} : HeaderProps ) => {

    switch(types) {
        case 'default':
            return (
                <HeaderLayout>

                    <HeaderItemBox>

                        <LeftItemBox>  
                            <Image src="/svg/logo.svg" alt="logo" width={50} height={50} />
                        </LeftItemBox>

                        <RightItemBox>
                            <Image src="/svg/bell.svg" alt="bell" width={25} height={25} />
                            <Image src="/svg/search.svg" alt="search" width={25} height={25} />
                            <Image src="/svg/user.svg" alt="user" width={25} height={25} />
                        </RightItemBox>

                    </HeaderItemBox>

                </HeaderLayout>
            )
    
    
    case 'bookmark':
        return (
            <HeaderLayout>

                <HeaderItemBox>

                    <LeftItemBox>  
                        <Image src="/svg/Back.svg" alt="back" width={22} height={22} />
                    </LeftItemBox>

                    <RightItemBox>
                        <Image src="/svg/bookmark.svg" alt="bookmark" width={25} height={25} />
                    </RightItemBox>

                </HeaderItemBox>

            </HeaderLayout>
        )
    case 'close':
        return (
            <HeaderLayout>

                <HeaderItemBox>

                    <LeftItemBox>  
                        <Image src="/svg/Back.svg" alt="back" width={22} height={22} />
                    </LeftItemBox>

                    <RightItemBox>
                        <Image src="/svg/close.svg" alt="close" width={25} height={25} />
                    </RightItemBox>

                </HeaderItemBox>

            </HeaderLayout>
        )

    case 'register':
        return (
            <HeaderLayout>

                <HeaderItemBox>

                    <LeftItemBox>  
                        <Image src="/svg/close.svg" alt="close" width={25} height={25} />
                    </LeftItemBox>

                    <RightItemBox>
                        <RegisterButton>등록</RegisterButton>
                    </RightItemBox>

                </HeaderItemBox>

            </HeaderLayout>
        )

    case 'report and close':
        return (
            <HeaderLayout>

                <HeaderItemBox>

                    <LeftItemBox>  
                        <Image src="/svg/back.svg" alt="back" width={22} height={22} />
                    </LeftItemBox>

                    <RightItemBox>
                        <Image src="/svg/report.svg" alt="report" width={25} height={25} />
                        <Image src="/svg/close.svg" alt="close" width={25} height={25} />
                    </RightItemBox>

                </HeaderItemBox>

            </HeaderLayout>
        )

    case 'report and bookmark':
        return (
            <HeaderLayout>

                <HeaderItemBox>

                    <LeftItemBox>  
                        <Image src="/svg/back.svg" alt="back" width={22} height={22} />
                    </LeftItemBox>

                    <RightItemBox>
                        <Image src="/svg/report.svg" alt="report" width={25} height={25} />
                        <Image src="/svg/bookmark.svg" alt="bookmark" width={25} height={25} />
                    </RightItemBox>

                </HeaderItemBox>

            </HeaderLayout>
        )

    case 'title':
        return (
            <HeaderLayout>

                <HeaderItemBox>

                    <LeftItemBox>  
                        <Image src="/svg/back.svg" alt="back" width={22} height={22} />
                    </LeftItemBox>

                    <CenterItemBox>
                        <Title>{text}</Title>
                    </CenterItemBox>

                </HeaderItemBox>

            </HeaderLayout>
        )

    case 'close and option':
        return (
            <HeaderLayout>

                <HeaderItemBox>

                    <LeftItemBox>  
                        <Image src="/svg/back.svg" alt="back" width={22} height={22} />
                    </LeftItemBox>

                    <RightItemBox>
                        <Image src="/svg/close.svg" alt="close" width={25} height={25} />
                        <Image src="/svg/Options.svg" alt="option" width={25} height={25} />
                    </RightItemBox>

                </HeaderItemBox>

            </HeaderLayout>
        )

    case 'search':
        return (
            <HeaderLayout>

                <HeaderItemBox>

                    <LeftItemBox>  
                        <Image src="/svg/back2.svg" alt="back" width={22} height={22} />
                    </LeftItemBox>

                    <CenterItemBox>
                        <SearchInput placeholder={placeholers} />
                    </CenterItemBox>

                </HeaderItemBox>

            </HeaderLayout>
        )
    }

}

export default Header;

const SearchInput = styled.input`
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 32px;
    background-color: ${color.gray50};
    padding-left: 20px;
    ${font.H1};
    color: ${color.gray500};
    outline: none;
    ::placeholder {
        ${font.H1};
        color: ${color.gray500};
    }
    `

const Title = styled.p`
    ${font.D3};
    color: ${color.black};
`

const RegisterButton = styled.button`
    ${font.D3};
    color: ${color.primary};
    background-color: #FFD8A2;
    width: 60px;
    height: 32px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    `


const LeftItemBox = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    `

const RightItemBox = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    `
const CenterItemBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 480px;
    left: 50%;
    transform: translateX(-50%);
`;

const HeaderItemBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    `
    

const HeaderLayout = styled.div`
    width: 100%;
    max-width: 600px;
    position: fixed;
    top: 0;
    height: 64px;
    background-color: ${color.white};
    display: flex;
    justify-content: center;
    align-items: center;
`