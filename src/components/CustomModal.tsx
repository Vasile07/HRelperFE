import styled, {keyframes} from "styled-components";
import React, {useState} from "react";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const growIn = keyframes`
    from {
        transform: scale(0);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
`;

const shrinkOut = keyframes`
    from {
        transform: scale(1);
        opacity: 1;
    }
    to {
        transform: scale(0);
        opacity: 0;
    }
`;

const Modal = styled.div<{ $isClosing: boolean }>`
    position: fixed;
    inset: 0;
    background-color: rgba(162, 162, 162, 0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;

    animation: ${props => props.$isClosing ? fadeOut : fadeIn} 0.3s ease-in-out;
`;

const ModalBody = styled.div<{ $isClosing: boolean }>`
    width: 70%;
    height: 60%;
    background-color: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    animation: ${props => props.$isClosing ? shrinkOut : growIn} 0.3s ease-in-out;
`;

const ExitButton = styled.button`
    position: absolute;
    right: 5px;
    top: 5px;
    background-color: #344966;
    color: white;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #2a3a52;
    }
`;

const CustomModal: React.FC<{
    body: React.ReactNode,
    close: () => void
}> = ({body, close}) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            close();
        }, 280); // Match animation duration
    };

    return (
        <Modal $isClosing={isClosing}>
            <ModalBody $isClosing={isClosing}>
                {body}
                <ExitButton onClick={handleClose}>✕</ExitButton>
            </ModalBody>
        </Modal>
    );
};

export default CustomModal;