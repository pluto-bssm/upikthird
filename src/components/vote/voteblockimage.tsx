import styled from "@emotion/styled";
import {School,Domitorys,Humors} from "../../../public/svg/svg";


type Props = {
    category : string;
}

const VoteBlockImage = ({category}: Props) => {
    switch(category) {
        case 'school':
            return (
                <VoteBlockImageLayout>
                    <School width="100" height="100"/>
                </VoteBlockImageLayout>
            );
        
        case 'domitory':
            return (
                <VoteBlockImageLayout>
                    <Domitorys width="100%" height="100%"/>
                </VoteBlockImageLayout>
            );
        
        case 'humor':
            return (
                <VoteBlockImageLayout>
                    <Humors width="100%" height="100%"/>
                </VoteBlockImageLayout>
            );
        }
    }

export default VoteBlockImage;

const VoteBlockImageLayout = styled.div`
    object-fit: fill;
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
`