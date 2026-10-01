import { Box } from "@mui/material";

import Slider from "../slider/Slider";
import Item1 from "../items/Item1";

import BookChatbot from "../chatbot-btn/BookChatbot";
import Authors from "../author/Authors";
import BookQuotes from "../bookquotes/BookQuotes";
import Popular from "../bookcard/Popular";

export default function Home() {
  return (
    <Box
      sx={{
        width: "100%",
        margin: 0,
        padding: 0,

        overflow: "hidden",

        pr: {
          xs: 0,
          md: 1,
        },

        pl: 0,
      }}
    >

      {/* ================= SLIDER + ITEM ================= */}

      <Box
        sx={{
          display: {
            xs: "block",
            md: "flex",
          },

          width: "100%",

          margin: 0,
          padding: 0,

          gap: {
            xs: 0,
            md: 1,
          },

          alignItems: "stretch",
        }}
      >

        {/* ================= SLIDER ================= */}

        <Box
          sx={{
            flex: 1,

            minWidth: 0,

            width: {
              xs: "100%",
              md: "auto",
            },

            margin: 0,
            padding: 0,
          }}
        >
          <Slider />
        </Box>


        {/* ================= ITEM 1 ================= */}

        <Box
          sx={{
            width: {
              xs: "100%",
              md: "300px",
            },

            display: {
              xs: "block",
              md: "block",
            },

            margin: 0,

            mt: {
              xs: 1.5,
              md: 0,
            },

            padding: 0,

            flexShrink: 0,
          }}
        >
          <Item1 />
        </Box>

      </Box>


      {/* ================= POPULAR ================= */}

      <Box
        sx={{
          width: "100%",

          margin: 0,

          mt: {
            xs: 1,
            md: 0,
          },

          padding: 0,
        }}
      >
        <Popular />
      </Box>


      {/* ================= AUTHORS ================= */}

      <Box
        sx={{
          width: "100%",

          margin: 0,

          padding: 0,

          mt: {
            xs: 1,
            md: 0,
          },
        }}
      >
        <Authors />
      </Box>


      {/* ================= BOOK QUOTES ================= */}

      <Box
        sx={{
          width: "100%",

          margin: 0,

          padding: 0,

          mt: {
            xs: 1,
            md: 0,
          },
        }}
      >
        <BookQuotes />
      </Box>


      {/* ================= CHATBOT ================= */}

      <BookChatbot />

    </Box>
  );
}