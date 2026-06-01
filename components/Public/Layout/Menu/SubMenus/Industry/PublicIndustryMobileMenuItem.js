import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import useStyles from '../../MenuStyle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import dynamic from 'next/dynamic';

const PublicMenuHead = dynamic(() => import('../../PublicMenuHead'));

export default function PublicIndustryMobileMenuItem({ children, menuName }) {
  const classes = useStyles()();
  const [listboxVisible, setListboxVisible] = useState(false);
  const [postIcon, setPostIcon] = useState(null);

  useEffect(() => {
    if (listboxVisible) {
      setPostIcon(<KeyboardArrowUpIcon color="primary" />);
    }
    else {
      setPostIcon(<KeyboardArrowDownIcon color="primary" />);
    }
  }, [listboxVisible])

  return (
    <div>
      <PublicMenuHead title={menuName} posticon={postIcon} onClick={() => setListboxVisible(!listboxVisible)} />
      <Box className={`${classes.mobileMenuBox} ${listboxVisible ? '' : 'hidden'}`} >
        {children}
      </Box>
    </div>
  );
}
