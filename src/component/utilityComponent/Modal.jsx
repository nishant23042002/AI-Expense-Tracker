import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineX } from "react-icons/hi";

export default function Modal({ setIsOpenModal }) {
    const MotionDiv = motion.div
    return (
        <AnimatePresence>

            <MotionDiv
                className="h-[300px] border bg-black w-[350px] z-50 absolute top-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
            >
                <div className="">
                    <button onClick={() => setIsOpenModal(false)}>
                        <HiOutlineX className="text-2xl text-white cursor-pointer" />
                    </button>
                    <h1 className="text-center">heelllo</h1>
                </div>
            </MotionDiv>

        </AnimatePresence>
    )
}