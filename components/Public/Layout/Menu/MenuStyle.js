import { makeStyles } from '@mui/styles';

const useStyles = props => makeStyles((theme) => ({
    menuBox: {
        left: 0,
        position: 'absolute',
        margin: '0 10px',
        backgroundColor: 'transparent',
        color: theme.palette.primary.main,
        paddingTop: 10,
        '&.hidden': {
            opacity: 0,
            visibility: 'hidden',
            transition: 'opacity 0.4s 0.5s ease, visibility 0.4s 0.5s step-end'
        }
    },
    subMenuBox: {
        position: 'absolute',
        backgroundColor: 'transparent',
        margin: '0 10px',
        color: theme.palette.primary.main,
        paddingTop: 35,
        '&.hidden': {
            opacity: 0,
            visibility: 'hidden',
            transition: 'opacity 0.4s 0.5s ease, visibility 0.4s 0.5s step-end'
        }
    },
    mobileMenuBox: {
        margin: '0 10px',
        color: theme.palette.primary.main,
        paddingTop: 10,
        '&.hidden': {
            opacity: 0,
            visibility: 'hidden',
            transition: 'opacity 0.4s 0.5s ease, visibility 0.4s 0.5s step-end'
        }
    },
    menu: {
        color: theme.palette.primary.main,
        fontWeight: '600',
        '&:hover': {
            color: theme.palette.themeColor.main
        }
    },
    submenu: {
        color: theme.palette.primary.main,
        fontWeight: '500',
        fontSize: props && props.submenuFontSize ? props.submenuFontSize : '14px',
        '&:hover': {
            color: theme.palette.themeColor.main
        }
    }
}));

export default useStyles;
