import {createTheme} from "@mui/material/styles";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    navButtons: true;
    normalButtons: true;
    outlineButtons: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    logo: true;
    mainText: true;
    title: true;
  }
}

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    footerPaper: true;
  }
}

const color = {
  primary: {
    contrastText: "#fff",
    dark: "#00AAA1",
    light: "#F2F8F7",
    veryLight: "#E5E5E5",
    main: "#E8F3F3",
    mainText: "#555555",
    title: "#222222",
  },
};

const {primary} = color;

export const mainTheme = createTheme({
  palette: {
    primary,
  },
  typography: {
    fontFamily: '"Noto+Sans", "Helvetica", "Arial", sans-serif',
  },

  components: {
    MuiButton: {
      variants: [
        {
          props: {variant: "navButtons"},
          style: {
            fontWeight: 700,
            my: 2,
            display: "block",
            "&:hover": {
              backgroundColor: primary.dark,
              color: primary.light,
            },
          },
        },
        {
          props: {variant: "outlineButtons"},
          style: {
            fontWeight: 700,
            width: "145px",
            color: primary.dark,
            backgroundColor: "transparent",
            border: `1px solid ${primary.dark}`,
            borderRadius: "6px",
            display: "block",
            "&:hover": {
              backgroundColor: primary.dark,
              color: primary.light,
            },
          },
        },
        {
          props: {variant: "normalButtons"},
          style: {
            fontWeight: 700,
            borderRadius: "6px",
            width: "145px",
            color: primary.light,
            backgroundColor: primary.dark,
            display: "block",
            "&:hover": {
              backgroundColor: primary.light,
              color: primary.dark,
            },
          },
        },
      ],
    },

    MuiTypography: {
      variants: [
        {
          props: {variant: "logo"},
          style: {
            fontFamily: "Noto Sans",
            backgroundColor: primary.dark,
            padding: 1,
            fontWeight: 700,
            letterSpacing: "0.3rem",
            textDecoration: "none",
            color: primary.light,
            fontSize: 20,
            textAlign: "center",
          },
        },
        {
          props: {variant: "mainText"},
          style: {
            fontFamily: "Noto Sans",
            fontWeight: 400,
            textDecoration: "none",
            color: primary.mainText,
            fontSize: 15,
            // textAlign: "center",
          },
        },
        {
          props: {variant: "title"},
          style: {
            fontFamily: "Noto Sans",
            fontWeight: 600,
            textDecoration: "none",
            color: primary.title,
            fontSize: 17,
            textAlign: "center",
          },
        },
      ],
    },

    MuiPaper: {
      variants: [
        {
          props: {variant: "footerPaper"},
          style: {
            display: "flex",
            alignItems: "start",
            gap: "24px",
            flexDirection: "column",
            height: 240,
            backgroundColor: "black",
            border: "none",
          },
        },
      ],
    },
  },
});
console.log(createTheme());
