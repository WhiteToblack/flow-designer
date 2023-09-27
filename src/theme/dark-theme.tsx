import { createTheme } from "@mui/material";

declare module '@mui/material/styles' {
    interface TypographyVariants {
        poster: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        poster?: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        poster: true;
        h3: false;
    }
}

const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#303267',
        },
    },   
    typography: {
        allVariants: {
            color: 'white'
        },
        poster: {
            fontSize: '3rem'
        },

    }
});

export default DarkTheme;