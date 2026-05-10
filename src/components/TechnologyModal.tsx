import styled from "styled-components";
import React, {useEffect} from "react";
import CustomModal from "./CustomModal.tsx";
import type Technology from "../model/Technology.ts";
import {logEvent} from "../analytics/logger";

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
    correlationId: string;
    close: () => void;
}> = ({tech, correlationId, close}) => {

    useEffect(() => {
        const openTime = Date.now();

        logEvent({
            type: 'technology_modal_enter',
            timestamp: new Date(openTime).toISOString(),
            payload: {
                correlationId,
                technology: tech.name,
            },
        });

        return () => {
            const closeTime = Date.now();

            logEvent({
                type: 'technology_modal_exit',
                timestamp: new Date(closeTime).toISOString(),
                payload: {
                    correlationId,
                    technology: tech.name,
                    durationMs: closeTime - openTime,
                },
            });
        };
    }, [tech.name]);

    const body = (
        <>
            <TechName>{tech.name}</TechName>
            <TechDescription>
                {tech.description}
            </TechDescription>
        </>
    );

    return <CustomModal body={body} close={close}/>;
};

export default TechnologyModal;