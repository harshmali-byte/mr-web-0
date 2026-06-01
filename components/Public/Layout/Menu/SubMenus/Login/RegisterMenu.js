import React, { useState } from 'react';
import { Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';

const Login = dynamic(() => import('../../../../../Auth/Login'));

export default function RegisterMenu({ showToast }) {
    const theme = useTheme();
    const [openRegister, setOpenRegister] = useState(false);

    function openRegisterBox() {
        setOpenRegister(true);
    }

    function closeRegisterBox(message) {
        setOpenRegister(false);
        showToast(message);
    }

    return (
        <>
            <Link underline='always' onClick={openRegisterBox} sx={{
                cursor: 'pointer', '&:hover': {
                    color: theme.palette.themeColor.main
                }
            }}>Register</Link>
            {
                openRegister
                    ? <Login open={openRegister} handleClose={closeRegisterBox} />
                    : null
            }

        </>
    )
}