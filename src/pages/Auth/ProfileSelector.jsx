import { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu"

const ProfilePicSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(null);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file)
            const preview = URL.createObjectURL(file)
            setPreview(preview)
        }
    }
    const handleRemoveImage = () => {
        setImage(null)
        setPreview(null)
    }

    const onChooseFile = () => {
        inputRef.current.click();
    }
    return (
        <div>
            <input name="profilePic" id="profilePic" type="file" accept="image/*" ref={inputRef} onChange={handleImage} className="hidden" />
            {
                !image ? (
                    <div className="w-20 h-20 flex items-center justify-center bg-[#d2c8ff] rounded-full relative">
                        <LuUser className="text-4xl text-[#7D5FFF]" />
                        <button className="w-8 h-8 flex justify-center items-center bg-[#7D5FFF] hover:bg-[#6C4DFF] cursor-pointer text-white rounded-full absolute -bottom-1 -right-1" type="button" onClick={onChooseFile}>
                            <LuUpload />
                        </button>
                    </div>
                ) : (
                    <div onClick={handleRemoveImage} className="relative">
                        <img src={preview} alt="profile" className="w-20 h-20 rounded-full object-fill" />
                        <button type="button" className="flex justify-center items-center bg-red-600 p-1.5 cursor-pointer  text-white rounded-full absolute -bottom-1 -right-1" onClick={handleRemoveImage}>
                            <LuTrash />
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default ProfilePicSelector