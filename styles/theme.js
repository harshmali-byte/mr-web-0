import { createTheme } from '@mui/material/styles';
// Add common font family
const theme = {
    'AI': createTheme({
        typography: {
            fontFamily: [
                'Montserrat',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            fontWeightRegular: '500'
        },
        breakpoints: {
            values: {
                xs: 0,
                ms: 400,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
            },
        },
        palette: {
            primary: {
                main: '#3f4b69',
            },
            secondary: {
                main: '#E8E8E8',
            },
            success: {
                main: '#10C400',
                contrastText: '#fff'
            },
            info: {
                light: '#5475f9',
                main: '#375ef9',
                dark: '#234ae5',
                contrastText: '#FFFFFF'
            },
            highlight: {
                light: '#F36036',
                main: '#D1512D',
                dark: '#B14324',
                contrastText: '#FFFFFF'
            },
            highlightButton: {
                light: '#f74c79',
                main: '#FF4475',
                dark: '#f7225a',
                contrastText: '#FFFFFF'
            },
            themeColor: {
                light: '#F36036',
                main: '#D1512D',
                dark: '#B14324',
                contrastText: '#FFFFFF'
            },
            default: {
                light: '#F36036',
                main: '#D1512D',
                dark: '#B14324',
                contrastText: '#FFFFFF'
            },
            white: {
                main: '#FFFFFF',
                contrastText: '#F36036'
            }
        },
        custom: {
            textColor: '#24292D',
            greyText: '#747579',
            borderColor: '#707070'
        }
    }),
    'MR': createTheme({
        typography: {
            fontFamily: [
                'Montserrat',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            fontWeightRegular: '500'
        },
        breakpoints: {
            values: {
                xs: 0,
                ms: 400,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
            },
        },
        palette: {
            primary: {
                main: '#3f4b69',
            },
            secondary: {
                main: '#E8E8E8',
            },
            success: {
                main: '#10C400',
                contrastText: '#fff'
            },
            info: {
                light: '#5475f9',
                main: '#375ef9',
                dark: '#234ae5',
                contrastText: '#FFFFFF'
            },
            highlight: {
                light: '#f74c79',
                main: '#FF4475',
                dark: '#f7225a',
                contrastText: '#FFFFFF'
            },
            highlightButton: {
                light: '#f74c79',
                main: '#FF4475',
                dark: '#f7225a',
                contrastText: '#FFFFFF'
            },
            themeColor: {
                light: '#375EF9',
                main: '#375EF9',
                dark: '#375EF9',
                contrastText: '#FFFFFF'
            },
            default: {
                light: '#375EF9',
                main: '#375EF9',
                dark: '#375EF9',
                contrastText: '#FFFFFF'
            },
            white: {
                main: '#FFFFFF',
                contrastText: '#375EF9'
            }
        },
        custom: {
            textColor: '#24292D',
            greyText: '#747579',
            borderColor: '#707070'
        },
        survey: {
            primary: {
                main: '#3f4b69',
            }
        }
    }),
    'Survey_D&B': createTheme({
        typography: {
            fontFamily: [
                'Montserrat',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            fontWeightRegular: '500'
        },
        palette: {
            primary: {
                light: '#2aa9b9',
                main: '#2aa9b9',
                dark: '#005172',
                contrastText: '#FFFFFF'
            },
            secondary: {
                light: '#005172',
                main: '#005172',
                dark: '#2aa9b9',
                contrastText: '#FFFFFF'
            }
        }
    })
};

export default theme;