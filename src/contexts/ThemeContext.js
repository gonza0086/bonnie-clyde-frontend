// MUI
import { ThemeProvider, createTheme } from '@mui/material';
import { deepPurple, grey, pink } from '@mui/material/colors';

export default function ThemeContext({ children }) {
    const theme = createTheme({
        palette: {
            primary: {
                main: deepPurple[400],
            },
            secondary: {
                main: pink[400],
            },
            cancel: {
                main: grey[300],
            },
        },
    });
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
