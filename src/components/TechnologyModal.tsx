import styled from "styled-components";
import React from "react";
import CustomModal from "./CustomModal.tsx";

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
    name: string;
    description: string;
    close: () => void;
}> = ({name, description, close}) => {
    const body = (
        <>
            <TechName>{name}</TechName>
            <TechDescription>{description}</TechDescription>
        </>
    );

    return <CustomModal body={body} close={close}/>;
};

export default TechnologyModal;
