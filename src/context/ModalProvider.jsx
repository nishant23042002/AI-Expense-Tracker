// src/context/ModalProvider.jsx
import { useState } from "react";
import { ModalContext } from "./modalContext.jsx";

export const ModalProvider = ({ children }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalType, setModalType] = useState(null);

    const openModal = (type) => {
        setModalType(type);
        setIsOpenModal(true);
    };
    const closeModal = () => {
        setIsOpenModal(false);
        setModalType(null);
    };
    const toggleModal = () => setIsOpenModal(prev => !prev);


    return (
        <ModalContext.Provider value={{ isOpenModal, openModal, closeModal, toggleModal, modalType }}>
            {children}
        </ModalContext.Provider>
    );
};
