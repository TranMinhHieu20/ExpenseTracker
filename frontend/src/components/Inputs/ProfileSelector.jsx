import React, { useRef, useState } from 'react'
import avatar from '../../assets/images/avatar.jpg'
import { FaFileUpload } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

const ProfileSelector = ({ image, setImage }) => {
  const inpRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0]

    // if file is not an image, return
    if (file) {
      setImage(file)
      // generate preview url
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setPreviewUrl(null)
    inpRef.current.value = null
  }

  const onChooseFile = () => {
    inpRef.current.click()
  }
  return (
    <div className="flex justify-center mb-6">
      <input type="file" accept="image/*" ref={inpRef} onChange={handleProfilePicChange} className="hidden" />
      <button className="size-22 rounded-full overflow-hidden relative group cursor-pointer" onClick={onChooseFile}>
        <img src={previewUrl || avatar} alt="avatar" className="size-full object-cover bg-gray-300 text-center" />
        <div className="absolute bottom-0 right-0 inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          {image ? (
            <MdDelete className="text-white" size={30} onClick={handleRemoveImage} />
          ) : (
            <FaFileUpload className="text-white" size={30} />
          )}
        </div>
      </button>
    </div>
  )
}

export default ProfileSelector
