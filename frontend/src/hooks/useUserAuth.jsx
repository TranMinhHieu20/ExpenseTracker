import React from 'react'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { API_PATHS } from '../utils/apiPaths'
import axiosInstance from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'

export const useUserAuth = () => {
  const { user, clearUser, updateUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) return

    // 2. Lấy token từ ổ cứng
    const token = localStorage.getItem('token')

    // 3. Nếu KHÔNG CÓ token, sút về trang Login ngay và luôn
    if (!token) {
      navigate('/login')
      return
    }

    let isMounted = true
    const fetchUserInfo = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.AUTH.GET_USER)
        if (isMounted && res.data) {
          console.log('userAuth', res.data)
          updateUser(res.data.user)
        }
      } catch (error) {
        console.error('Failed to fetch user data: ', error)
        if (isMounted) {
          clearUser()
          navigate('/login')
        }
      }
    }
    fetchUserInfo()
    return () => {
      isMounted = false
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUser, clearUser, navigate])

  return <>1231231</>
}
