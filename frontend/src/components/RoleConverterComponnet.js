import React from 'react'

export default function RoleConverterComponnet(props) {
    const {role} = props
  return (
    <>
     {role && role === "user" ? " - người dùng" : role === "admin" ? " - quản trị viên" : role === "contributer" ? " - tình nguyện viên" : role === "professional" && " - chuyên gia tâm lý"}   
    </>
  )
}
