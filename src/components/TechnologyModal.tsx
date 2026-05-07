import styled from "styled-components";
import React from "react";
import CustomModal from "./CustomModal.tsx";
import type Technology from "../model/Technology.ts";

const TechName = styled.p`
    font-family: "Jomolhari", serif;
    font-size: 3rem;
    color: #000;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 30px;
`;

const TechDescription = styled.p`
    font-family: "Jomolhari", serif;
    font-size: 1rem;
    color: #000;
    text-align: center;
    max-width: 500px;
    line-height: 1.6;
    padding: 0 40px;
`;

const TechnologyModal: React.FC<{
    tech: Technology;
    close: () => void;
}> = ({tech, close}) => {

    const body = (
        <>
            <TechName>{tech.name}</TechName>
            <TechDescription key={tech.description}>{tech.description}</TechDescription>
        </>
    );

    return <CustomModal body={body} close={close}/>;
};

export default TechnologyModal;
