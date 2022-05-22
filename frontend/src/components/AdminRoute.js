import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Redirect, Route, Routes } from 'react-router';
import MessageBox from './MessageBox';

export default function AdminRoute({children})
{
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    return(
        userInfo ? (userInfo.role==='admin' ? children : <Navigate to='/'></Navigate>) : <Navigate to='/signin'></Navigate>
    );
}