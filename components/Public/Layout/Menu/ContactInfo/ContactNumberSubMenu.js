
import { Grid, Link } from '@mui/material';
import useStyles from '../MenuStyle';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Contacts } from '../../../../Common/Constants';

export default function ContactNumberSubMenu({ textFontSize, ...props }) {
    const classes = useStyles({ submenuFontSize: textFontSize })();

    return (
        <>
            <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalPhoneIcon className={classes.submenu} />
            </Grid>
            <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                <Link className={classes.submenu} {...props} href={`tel:${Contacts.UK.Contact}`} underline="none" >{Contacts.UK.Contact}</Link>
            </Grid>
        </>
    )
}