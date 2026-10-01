import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Avatar,
  CircularProgress,
} from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// =========================
// ترجمه متن انگلیسی به فارسی
// =========================

const translateToPersian = async (text) => {
  try {
    if (!text) return "";

    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=en|fa`
    );

    const data = await response.json();

    return data.responseData.translatedText || text;
  } catch (error) {
    console.log("Translation error:", error);

    return text;
  }
};

export default function Item1() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // GET ARTICLES
  // =========================

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await fetch(
          "https://dev.to/api/articles?per_page=3"
        );

        const data = await response.json();

        const translatedArticles = await Promise.all(
          data.map(async (article) => {
            const translatedTitle = await translateToPersian(
              article.title
            );

            const translatedDescription =
              await translateToPersian(article.description);

            return {
              ...article,
              translatedTitle,
              translatedDescription,
            };
          })
        );

        setArticles(translatedArticles);
      } catch (error) {
        console.log("Articles error:", error);
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        p: {
          xs: 1,
          sm: 1.5,
          md: 2,
        },
        borderRadius: {
          xs: 2,
          sm: 3,
        },
        bgcolor: "#fff",
        direction: "rtl",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* =========================
          HEADER
      ========================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: {
            xs: 1.5,
            sm: 2,
          },
        }}
      >
        <Typography
          fontWeight="bold"
          sx={{
            fontSize: {
              xs: "14px",
              sm: "17px",
              md: "18px",
            },
          }}
        >
          مقالات پیشنهادی
        </Typography>

        {/* دکمه فقط در دسکتاپ */}

        <IconButton
          size="small"
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },

            width: 32,
            height: 32,

            bgcolor: "#6C63FF",
            color: "#fff",

            "&:hover": {
              bgcolor: "#6C63FF",
            },
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* =========================
          LOADING
      ========================= */}

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 3,
          }}
        >
          <CircularProgress
            size={25}
            sx={{
              color: "#6C63FF",
            }}
          />
        </Box>
      ) : (
        <>
          {/* ==================================================
              DESKTOP
          ================================================== */}

          <Box
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            {articles.map((article) => (
              <Card
                key={article.id}
                sx={{
                  display: "flex",
                  alignItems: "center",

                  mb: 2,
                  p: 1,

                  height: 95,

                  borderRadius: 3,

                  boxShadow:
                    "0 4px 12px rgba(0,0,0,.08)",
                }}
              >
                {/* AVATAR */}

                <Avatar
                  src={
                    article.user?.profile_image ||
                    article.cover_image
                  }
                  alt={article.user?.name}
                  sx={{
                    width: 50,
                    height: 50,
                    ml: 1,
                    flexShrink: 0,
                  }}
                />

                {/* TEXT */}

                <CardContent
                  sx={{
                    p: 0,
                    flex: 1,
                    minWidth: 0,

                    "&:last-child": {
                      paddingBottom: 0,
                    },
                  }}
                >
                  <Typography
                    fontSize={13}
                    fontWeight="bold"
                    sx={{
                      lineHeight: 1.5,

                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {article.translatedTitle}
                  </Typography>

                  <Typography
                    fontSize={11}
                    color="text.secondary"
                    sx={{
                      mt: 0.5,

                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {article.translatedDescription}
                  </Typography>
                </CardContent>

                {/* OPEN */}

                <IconButton
                  onClick={() => {
                    window.open(article.url, "_blank");
                  }}
                  sx={{
                    width: 30,
                    height: 30,

                    mr: 1,

                    flexShrink: 0,

                    bgcolor: "#6C63FF",
                    color: "#fff",

                    "&:hover": {
                      bgcolor: "#6C63FF",
                    },
                  }}
                >
                  <OpenInNewIcon
                    sx={{
                      fontSize: 16,
                    }}
                  />
                </IconButton>
              </Card>
            ))}
          </Box>

          {/* ==================================================
              MOBILE
          ================================================== */}

          <Box
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },

              width: "100%",

              justifyContent: "space-around",

              alignItems: "flex-start",

              gap: 1,
            }}
          >
            {articles.map((article) => (
              <Box
                key={article.id}
                onClick={() => {
                  window.open(article.url, "_blank");
                }}
                sx={{
                  flex: 1,

                  minWidth: 0,

                  display: "flex",
                  flexDirection: "column",

                  alignItems: "center",

                  cursor: "pointer",

                  textAlign: "center",
                }}
              >
                {/* =========================
                    ARTICLE ICON
                ========================= */}

                <Avatar
                  src={
                    article.user?.profile_image ||
                    article.cover_image
                  }
                  alt={article.user?.name}
                  sx={{
                    width: {
                      xs: 48,
                      sm: 58,
                    },

                    height: {
                      xs: 48,
                      sm: 58,
                    },

                    mb: 0.7,

                    border: "2px solid #ddd6fe",

                    boxShadow:
                      "0 4px 12px rgba(108,99,255,.15)",

                    transition:
                      "transform .2s ease",

                    "&:hover": {
                      transform: "scale(1.08)",
                    },
                  }}
                />

                {/* =========================
                    ARTICLE TITLE
                ========================= */}

                <Typography
                  sx={{
                    width: "100%",

                    fontSize: {
                      xs: "9px",
                      sm: "10px",
                    },

                    fontWeight: "bold",

                    lineHeight: 1.5,

                    display: "-webkit-box",

                    WebkitLineClamp: 2,

                    WebkitBoxOrient: "vertical",

                    overflow: "hidden",

                    wordBreak: "break-word",
                  }}
                >
                  {article.translatedTitle}
                </Typography>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}