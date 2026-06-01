
import { Grid, Link } from '@mui/material';
import useStyles from '../MenuStyle';
import EmailIcon from '@mui/icons-material/Email';
import { OrgInfo } from '../../../../Common/Constants';

export default function ContactEmailSubMenu({ textFontSize, ...props }) {
    const classes = useStyles({ submenuFontSize: textFontSize })();

    return (
        <>
            <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon className={classes.submenu} />
            </Grid>
            <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                <Link className={classes.submenu} {...props} href={`mailto:${OrgInfo.SalesEmail}`} underline="none" >{OrgInfo.SalesEmail}</Link>
            </Grid>
        </>
    )
}