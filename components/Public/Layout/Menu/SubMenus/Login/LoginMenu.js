import React, { useState } from 'react';
import { Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';

const Login = dynamic(() => import('../../../../../Auth/Login'));

export default function LoginMenu({ showToast, classNames }) {
    const theme = useTheme();
    const [openLogin, setOpenLogin] = useState(false);

    function openLoginBox() {
        setOpenLogin(true);
    }

    function closeLoginBox(message) {
        setOpenLogin(false);
        showToast(message);
    }
    return (
        <>
            <Link underline='always' onClick={openLoginBox} sx={{
                cursor: 'pointer', ml: { lg: 2 }, '&:hover': {
                    color: theme.palette.themeColor.main
                }
            }} className={classNames}>Login</Link>
            {
                openLogin
                    ? <Login open={openLogin} handleClose={closeLoginBox} />
                    : null
            }
        </>
    )
}