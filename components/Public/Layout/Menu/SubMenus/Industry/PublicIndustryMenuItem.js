import { useState } from 'react';
import { Box } from '@mui/material';
import useStyles from '../../MenuStyle';
import dynamic from 'next/dynamic';

const PublicMenuHead = dynamic(() => import('../../PublicMenuHead'));

export default function PublicIndustryMenuItem({ children, menuName, posticon, classMenuBox }) {
  const webClasses = useStyles()();
  const [listboxVisible, setListboxVisible] = useState(false);

  return (
    <div
      onMouseOver={() => { setListboxVisible(true) }}
      onMouseOut={() => setListboxVisible(false)}
      onFocus={() => setListboxVisible(true)}
      onBlur={() => setListboxVisible(false)}

    >
      <PublicMenuHead title={menuName} posticon={posticon} />
      <Box className={`test ${classMenuBox || webClasses.menuBox} ${listboxVisible ? '' : 'hidden'}`} >
        {children}
      </Box>
    </div>
  );
}
