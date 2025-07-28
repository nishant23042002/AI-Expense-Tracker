// src/context/ModalProvider.jsx
import { useState } from "react";
import { ModalContext } from "./ModalContext";

export const ModalProvider = ({ children }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const openModal = () => setIsOpenModal(true);
    const closeModal = () => setIsOpenModal(false);
    const toggleModal = () => setIsOpenModal(prev => !prev);

    
    return (
        <ModalContext.Provider value={{ isOpenModal, openModal, closeModal, toggleModal }}>
            {children}
        </ModalContext.Provider>
    );
};
