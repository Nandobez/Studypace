import { createTheme, Shadows } from '@mui/material/styles';

const noShadow: Shadows = [
    'none', 'none', 'none', 'none', 'none',
    'none', 'none', 'none', 'none', 'none',
    'none', 'none', 'none', 'none', 'none',
    'none', 'none', 'none', 'none', 'none',
    'none', 'none', 'none', 'none', 'none'
];

const theme = createTheme({
    typography: {
        fontFamily: `'Pixellari', system-ui, Avenir, Helvetica, Arial, sans-serif`,
    },
    shape: {
        borderRadius: 0,
    },
    shadows: noShadow,
    components: {
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    filter: 'contrast(200%)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: '4px 4px 0px #ffcc34',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: '4px 4px 0px #ffcc34',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 0,
                    boxShadow: '4px 4px 0px #ffcc34',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: '4px 4px 0px #ffcc34',
                },
            },
        },
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#004c6d',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#ffcc33',
            contrastText: '#002744',
        },
        error: {
            main: '#d95d39',
        },
        background: {
            default: '#141414',
        },
        text: {
            primary: '#004c6d',
            secondary: '#004c6d',
        },
    }
});

export default theme;
