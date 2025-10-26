'use client'

import styled from "@emotion/styled"
import color from "@/packages/design-system/src/color"
import {Home , Vote, Guide, Dashboard} from "@/../public/svg"
import { useRouter } from "next/navigation"

const NavigationBar = () =>{
        
    const router = useRouter();

    return (
        <NavigationBarLayout>
            <NavigationBarItem>
                <Home width="40" height="40" onClick={() => { router.push("/main") }} />
                <Vote width="40" height="40"  onClick={() => { router.push("/vote") }} />
                <Guide width="40" height="40"  onClick={() => { router.push("/guide") }} />
                <Dashboard width="40" height="40"  onClick={() => { router.push("/dashboard") }} />    
            </NavigationBarItem>
        </NavigationBarLayout>
    )   

}

export default NavigationBar;

const NavigationBarLayout = styled.div`
    width: 100%;
    max-width: 600px;
    display: flex; 
    justify-content: center;
    background-color: ${color.white};
    position: fixed;
    bottom: 0;
    height: 50px;
`

const NavigationBarItem = styled.div`
    width : 90%;
    display: flex; 
    justify-content: space-between;
`