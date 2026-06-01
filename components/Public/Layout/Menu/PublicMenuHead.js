
import { Grid, Link } from '@mui/material';
import useStyles from './MenuStyle';

export default function PublicMenuHead(props) {
    const classes = useStyles()();

    return (
        <Grid container spacing={0} sx={{ marginRight: '20px', cursor: 'pointer', alignItems: 'center' }}>
            <Grid item>
                <Link className={props.menuclassname || classes.menu}
                    variant="body2" underline='none'
                    {...props}
                >
                    {props.title}
                </Link>
            </Grid>
            {
                props.posticon
                    ? <Grid item sx={{ display: 'flex' }}>{props.posticon}</Grid>
                    : null
            }
        </Grid>
    )
}