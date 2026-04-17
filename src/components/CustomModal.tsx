import styled from "styled-components";
import React from "react";

const Modal = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(162, 162, 162, 0.5);

    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 9999;
`;

const ModalBody = styled.div`
    width: 70%;
    //max-width: 600px;
    height: 60%;
    background-color: #fff;

    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ExitButton = styled.button`
    position: absolute;
    right: 5px;
    top: 5px;
    background-color: #344966;

`;

const CustomModal: React.FC<{
    body: React.ReactNode,
    close: () => void
}> = ({body, close}) => {

    return (
        <Modal>
            <ModalBody>
                {body}

                <ExitButton onClick={() => close()}>✕</ExitButton>
            </ModalBody>
        </Modal>
    )
}

export default CustomModal