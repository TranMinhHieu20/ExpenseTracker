import { API_PATHS } from './apiPaths.js'
import axiosInstance from './axiosInstance.js'

export const uploadImage = async (imageFile) => {
  const formData = new FormData()
  // Append the image file to the form data
  formData.append('image', imageFile)

  try {
    const res = await axiosInstance.post(API_PATHS.UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res.data
  } catch (error) {
    console.log('Error uploading the image: ', error)
    throw error
  }
}

export default uploadImage
