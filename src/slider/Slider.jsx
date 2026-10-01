import React, { useState, useEffect } from "react";

import {
  Box,
  Typography,
  Fade,
} from "@mui/material";

import slide1 from "../image/baner/slide1.png";
import slide2 from "../image/baner/slide2.png";
import slide3 from "../image/baner/slide3.png";
import slide4 from "../image/baner/slide4.png";

const slides = [
  {
    image: slide1,
    title: "هر کتاب، یک جهان تازه",
    text: "در میان صفحات کتاب‌ها، دنیاهایی منتظر کشف شدن هستند.",
  },

  {
    image: slide2,
    title: "درهای خیال را باز کن",
    text: "گاهی یک کتاب کافی است تا از دنیای واقعی فاصله بگیری و وارد سرزمینی پر از داستان، ماجراجویی و خیال شوی.",
  },

  {
    image: slide3,
    title: "کتابخانه دیجیتال مدرن",
    text: "کتاب‌های مورد علاقه خود را سریع پیدا کنید.",
  },

  {
    image: slide4,
    title: "از یک صفحه شروع می‌شود...",
    text: "کتاب مورد علاقه‌ات را پیدا کن و داستان جدیدی را شروع کن.",
  },
];

export default function Slider() {
  const [activeSlide, setActiveSlide] = useState(0);

  // =========================
  // AUTO SLIDER
  // =========================

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      {/* =========================
          SLIDER
      ========================= */}

      <Box
        sx={{
          width: "100%",

          height: {
            xs: "180px",
            sm: "240px",
            md: "320px",
            lg: "370px",
            xl: "420px",
          },

          position: "relative",
          overflow: "hidden",

          borderRadius: {
            xs: 0,
            sm: "14px",
            md: "20px",
            lg: "24px",
          },

          boxShadow: {
            xs: "none",
            sm: "0 10px 30px rgba(0,0,0,.14)",
            md: "0 15px 40px rgba(0,0,0,.18)",
          },
        }}
      >

        {/* =========================
            IMAGE
        ========================= */}

        <Fade
          in={true}
          timeout={700}
          key={activeSlide}
        >
          <Box
            component="img"
            src={slides[activeSlide].image}
            alt={slides[activeSlide].title}
            sx={{
              width: "100%",
              height: "100%",

              objectFit: "cover",
              objectPosition: "center",

              position: "absolute",
              inset: 0,

              userSelect: "none",
            }}
          />
        </Fade>

        {/* =========================
            DARK OVERLAY
        ========================= */}

        <Box
          sx={{
            position: "absolute",
            inset: 0,

            background:
              "linear-gradient(90deg, rgba(0,0,0,.08), rgba(0,0,0,.58))",

            zIndex: 1,
          }}
        />

        {/* =========================
            TEXT
        ========================= */}

        <Box
          sx={{
            position: "absolute",

            right: {
              xs: "10%",
              sm: "10%",
              md: "8%",
              lg: "7%",
            },

            top: "50%",

            transform: "translateY(-50%)",

            color: "#fff",

            textAlign: "right",

            width: {
              xs: "70%",
              sm: "60%",
              md: "52%",
              lg: "45%",
            },

            maxWidth: {
              xs: "270px",
              sm: "360px",
              md: "500px",
              lg: "560px",
            },

            zIndex: 2,
          }}
        >

          {/* TITLE */}

          <Typography
            component="h2"
            sx={{
              fontWeight: 700,

              fontSize: {
                xs: "16px",
                sm: "21px",
                md: "29px",
                lg: "36px",
              },

              lineHeight: 1.5,
            }}
          >
            {slides[activeSlide].title}
          </Typography>

          {/* TEXT */}

          <Typography
            sx={{
              mt: {
                xs: 0.8,
                sm: 1,
                md: 1.5,
              },

              fontSize: {
                xs: "9px",
                sm: "11px",
                md: "14px",
                lg: "15px",
              },

              lineHeight: {
                xs: 1.7,
                sm: 1.8,
                md: 1.9,
              },
            }}
          >
            {slides[activeSlide].text}
          </Typography>

        </Box>
      </Box>

      {/* =========================
          DOTS
      ========================= */}

      <Box
        sx={{
          display: "flex",

          justifyContent: "center",
          alignItems: "center",

          gap: {
            xs: 0.7,
            sm: 1,
          },

          mt: {
            xs: 1,
            sm: 1.5,
          },

          mb: {
            xs: 0.5,
            sm: 1,
          },
        }}
      >

        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setActiveSlide(index)}
            sx={{
              width:
                activeSlide === index
                  ? {
                      xs: 22,
                      sm: 28,
                      md: 32,
                    }
                  : {
                      xs: 7,
                      sm: 8,
                      md: 9,
                    },

              height: {
                xs: 7,
                sm: 8,
                md: 9,
              },

              borderRadius: "20px",

              cursor: "pointer",

              background:
                activeSlide === index
                  ? "#7c3aed"
                  : "#ddd6fe",

              transition: "all .3s ease",

              "&:hover": {
                background: "#a855f7",
              },
            }}
          />
        ))}

      </Box>
    </Box>
  );
}