import React, {useEffect, useState} from "react";
import styled from "styled-components";

const LoadingBody = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const LoadingCircle = styled.div`
    display: flex;
    height: 40%;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 5px solid #000;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const CircleAura = styled.div`
    height: 100%;
    width: 100%;
    border-radius: 50%;
    //padding: 30px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    box-shadow: 0 0 50px rgba(59, 73, 102, 1);
`;

const CircleCover = styled.div`
    height: 100%;
    width: 100%;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`

const LoadingWrapper = styled.div`
    position: relative;
    font-weight: bold;
    color: #344966;
    font-size: 150%;
    font-family: "Jomolhari", serif;
`;

const LoadingText = styled.span`
`;

const Dots = styled.span`
    position: absolute;
    left: 100%;
    top: 0;
`;

// const Star = styled.div`
//     position: absolute;
//     width: 60px;
//     height: 60px;
//
//     background: conic-gradient(
//             from 45deg at 50% 50%,
//             #2d3e54 0deg,
//             rgba(45, 62, 84, 0) 90deg,
//             #2d3e54 180deg,
//             rgba(45, 62, 84, 0) 270deg,
//             #2d3e54 360deg
//     );
//
//     filter: blur(25px);
//     pointer-events: none;
//
//     top: 0;
//     left: 50%;
//
//     margin-left: -40px;
//     margin-top: -40px;
//
//     animation: orbitBorder 5s linear infinite;
//     transform-origin: 40px calc(50% + 20vh);
//
//     @keyframes orbitBorder {
//         from {
//             transform: rotate(0deg);
//         }
//         to {
//             transform: rotate(360deg);
//         }
//     }
// `;

const LoadingComponent: React.FC<{ color: string }> = ({color}) => {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDots(prev => (prev.length === 3 ? "" : `${prev}.`));
        }, 500);

        return () => clearTimeout(timer);
    }, [dots]);

    return (
        <LoadingBody style={{backgroundColor: color}}>
            <LoadingCircle style={{backgroundColor: color}}>

                <CircleAura/>
                <CircleCover style={{backgroundColor: color}}/>

                <LoadingWrapper>
                    <LoadingText>Loading</LoadingText>
                    <Dots>{dots}</Dots>
                </LoadingWrapper>

                {/*<Star/>*/}
            </LoadingCircle>
        </LoadingBody>
    );
};

export default LoadingComponent;