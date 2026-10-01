import React, { useRef, useEffect, useState } from "react";
import books from "./cardbook";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Button,
  IconButton,
} from "@mui/material";

import {
  LocalFireDepartment,
  ArrowBackIosNew,
  ArrowForwardIos,
  ShoppingCartOutlined,
  FavoriteBorderOutlined,
  Favorite,
  MenuBookOutlined,
} from "@mui/icons-material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Popular = () => {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);

  const scrollRef = useRef(null);

  // =========================
  // کتاب‌های پرطرفدار
  // =========================

  const popularBooks = books.filter(
    (book) => book.popular === true
  );

  // =========================
  // دریافت علاقه‌مندی‌ها
  // =========================

  useEffect(() => {
    const savedFavorites =
      JSON.parse(
        localStorage.getItem("favorites")
      ) || [];

    setFavorites(savedFavorites);
  }, []);

  // =========================
  // مقدار اسکرول
  // =========================

  const getScrollAmount = () => {
    const container = scrollRef.current;

    if (!container) return 0;

    const card =
      container.querySelector(".book-card");

    if (!card) return 0;

    const cardWidth = card.offsetWidth;

    const gap = 16;

    return cardWidth + gap;
  };

  // =========================
  // اسکرول راست
  // =========================

  const scrollRight = () => {
    const container = scrollRef.current;

    if (!container) return;

    const amount = getScrollAmount();

    container.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  // =========================
  // اسکرول چپ
  // =========================

  const scrollLeft = () => {
    const container = scrollRef.current;

    if (!container) return;

    const amount = getScrollAmount();

    container.scrollBy({
      left: -amount,
      behavior: "smooth",
    });
  };

  // =========================
  // اسکرول خودکار
  // =========================

  useEffect(() => {
    const interval = setInterval(() => {
      const container = scrollRef.current;

      if (!container) return;

      const amount = getScrollAmount();

      if (!amount) return;

      const maxScroll =
        container.scrollWidth -
        container.clientWidth;

      if (
        container.scrollLeft >=
        maxScroll - 10
      ) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: amount,
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // =========================
  // افزودن به سبد خرید
  // =========================

  const addToCart = (book) => {
    try {
      const savedCart =
        localStorage.getItem("cart");

      const cart = savedCart
        ? JSON.parse(savedCart)
        : [];

      const existingIndex =
        cart.findIndex(
          (item) => item.id === book.id
        );

      let updatedCart;

      if (existingIndex !== -1) {
        updatedCart = [...cart];

        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],

          quantity:
            (updatedCart[existingIndex]
              .quantity || 1) + 1,
        };
      } else {
        updatedCart = [
          ...cart,
          {
            ...book,
            quantity: 1,
          },
        ];
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

      toast.success(
        "کتاب با موفقیت به سبد خرید اضافه شد",
        {
          icon: (
            <span
              style={{
                width: "24px",
                height: "24px",
                border: "2px solid #fff",
                borderRadius: "7px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              ✓
            </span>
          ),
        }
      );
    } catch (error) {
      console.error(
        "Cart Error:",
        error
      );

      toast.error(
        "خطا در افزودن کتاب به سبد خرید",
        {
          icon: (
            <span
              style={{
                width: "24px",
                height: "24px",
                border: "2px solid #fff",
                borderRadius: "7px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              ✓
            </span>
          ),
        }
      );
    }
  };

  // =========================
  // علاقه‌مندی
  // =========================

  const toggleFavorite = (book) => {
    const savedFavorites =
      JSON.parse(
        localStorage.getItem(
          "favorites"
        )
      ) || [];

    const exists =
      savedFavorites.some(
        (item) => item.id === book.id
      );

    let updatedFavorites;

    if (exists) {
      updatedFavorites =
        savedFavorites.filter(
          (item) => item.id !== book.id
        );

      toast.info(
        "کتاب از علاقه‌مندی‌ها حذف شد",
        {
          icon: (
            <span
              style={{
                width: "24px",
                height: "24px",
                border: "2px solid #fff",
                borderRadius: "7px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              ✓
            </span>
          ),
        }
      );
    } else {
      updatedFavorites = [
        ...savedFavorites,
        book,
      ];

      toast.success(
        "کتاب به علاقه‌مندی‌ها اضافه شد",
        {
          icon: (
            <span
              style={{
                width: "24px",
                height: "24px",
                border: "2px solid #fff",
                borderRadius: "7px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              ✓
            </span>
          ),
        }
      );
    }

    localStorage.setItem(
      "favorites",
      JSON.stringify(
        updatedFavorites
      )
    );

    setFavorites(
      updatedFavorites
    );
  };

  // =========================
  // بررسی علاقه‌مندی
  // =========================

  const isFavorite = (bookId) => {
    return favorites.some(
      (item) => item.id === bookId
    );
  };

  // =========================
  // JSX
  // =========================

  return (
    <>
      <Box
        sx={{
          py: {
            xs: 2.5,
            sm: 3,
            md: 4,
          },

          position: "relative",

          width: "100%",

          maxWidth: "100%",

          overflow: "hidden",

          boxSizing: "border-box",

          fontFamily: "vazir",

          margin: 0,
        }}
      >

        {/* =========================
            عنوان
        ========================= */}

        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: 1,

            mb: {
              xs: 1.8,
              sm: 2.2,
              md: 2.5,
            },

            px: {
              xs: 1,
              sm: 1.5,
              md: 1,
            },
          }}
        >
          <LocalFireDepartment
            sx={{
              color: "#7C3AED",

              fontSize: {
                xs: 23,
                sm: 26,
                md: 28,
              },
            }}
          />

          <Typography
            sx={{
              fontFamily: "vazir",

              fontWeight: "bold",

              fontSize: {
                xs: 15,
                sm: 17,
                md: 20,
              },
            }}
          >
            کتاب‌های پرطرفدار
          </Typography>
        </Box>

        {/* =========================
            دکمه چپ
        ========================= */}

        <IconButton
          onClick={scrollLeft}
          sx={{
            position: "absolute",

            left: {
              xs: 2,
              sm: 5,
              md: 8,
            },

            top: {
              xs: "56%",
              sm: "55%",
              md: "55%",
            },

            transform:
              "translateY(-50%)",

            zIndex: 10,

            width: {
              xs: 28,
              sm: 34,
              md: 38,
            },

            height: {
              xs: 28,
              sm: 34,
              md: 38,
            },

            bgcolor: "#fff",

            boxShadow:
              "0 4px 15px rgba(0,0,0,.15)",

            "&:hover": {
              bgcolor: "#7C3AED",
              color: "#fff",
            },
          }}
        >
          <ArrowBackIosNew
            sx={{
              fontSize: {
                xs: 11,
                sm: 14,
                md: 16,
              },
            }}
          />
        </IconButton>

        {/* =========================
            دکمه راست
        ========================= */}

        <IconButton
          onClick={scrollRight}
          sx={{
            position: "absolute",

            right: {
              xs: 2,
              sm: 5,
              md: 8,
            },

            top: {
              xs: "56%",
              sm: "55%",
              md: "55%",
            },

            transform:
              "translateY(-50%)",

            zIndex: 10,

            width: {
              xs: 28,
              sm: 34,
              md: 38,
            },

            height: {
              xs: 28,
              sm: 34,
              md: 38,
            },

            bgcolor: "#fff",

            boxShadow:
              "0 4px 15px rgba(0,0,0,.15)",

            "&:hover": {
              bgcolor: "#7C3AED",
              color: "#fff",
            },
          }}
        >
          <ArrowForwardIos
            sx={{
              fontSize: {
                xs: 11,
                sm: 14,
                md: 16,
              },
            }}
          />
        </IconButton>

        {/* =========================
            لیست کتاب‌ها
        ========================= */}

        <Box
          ref={scrollRef}
          sx={{
            display: "flex",

            gap: {
              xs: 1.5,
              sm: 2,
              md: 2,
            },

            overflowX: "auto",

            overflowY: "hidden",

            scrollBehavior: "smooth",

            px: {
              xs: 4,
              sm: 5,
              md: 6,
            },

            pb: 2,

            width: "100%",

            maxWidth: "100%",

            boxSizing: "border-box",

            "&::-webkit-scrollbar": {
              height: 5,
            },

            "&::-webkit-scrollbar-track": {
              background: "#eee",

              borderRadius: 10,
            },

            "&::-webkit-scrollbar-thumb": {
              background: "#7C3AED",

              borderRadius: 10,
            },

            "&::-webkit-scrollbar-thumb:hover": {
              background: "#6D28D9",
            },

            scrollbarWidth: "thin",

            scrollbarColor:
              "#7C3AED #eee",
          }}
        >
          {popularBooks.map(
            (book) => (
              <Card
                key={book.id}

                className="book-card"

                sx={{
                  minWidth: {
                    xs: 170,
                    sm: 195,
                    md: 210,
                  },

                  maxWidth: {
                    xs: 170,
                    sm: 195,
                    md: 210,
                  },

                  flexShrink: 0,

                  borderRadius: {
                    xs: 2.5,
                    sm: 3,
                  },

                  overflow: "hidden",

                  boxShadow:
                    "0 5px 20px rgba(0,0,0,.08)",

                  transition:
                    "transform .3s, box-shadow .3s",

                  fontFamily: "vazir",

                  "&:hover": {
                    transform:
                      "translateY(-5px)",

                    boxShadow:
                      "0 12px 28px rgba(124,58,237,.2)",
                  },
                }}
              >

                {/* =========================
                    عکس
                ========================= */}

                <CardMedia
                  component="img"

                  image={book.image}

                  alt={book.title}

                  sx={{
                    height: {
                      xs: 200,
                      sm: 225,
                      md: 245,
                    },

                    objectFit: "cover",
                  }}
                />

                {/* =========================
                    محتوا
                ========================= */}

                <CardContent
                  sx={{
                    p: {
                      xs: 1.1,
                      sm: 1.5,
                      md: 1.7,
                    },

                    fontFamily: "vazir",
                  }}
                >

                  {/* ژانر */}

                  {book.genre && (
                    <Chip
                      label={book.genre}

                      size="small"

                      sx={{
                        mb: 0.8,

                        height: {
                          xs: 22,
                          sm: 25,
                        },

                        fontSize: {
                          xs: 9,
                          sm: 11,
                        },

                        bgcolor:
                          "#F3E8FF",

                        color:
                          "#7C3AED",

                        fontWeight:
                          "bold",

                        fontFamily:
                          "vazir",
                      }}
                    />
                  )}

                  {/* عنوان */}

                  <Typography
                    sx={{
                      mb: 0.5,

                      fontFamily:
                        "vazir",

                      fontWeight:
                        "bold",

                      fontSize: {
                        xs: 13,
                        sm: 15,
                        md: 16,
                      },

                      whiteSpace:
                        "nowrap",

                      overflow:
                        "hidden",

                      textOverflow:
                        "ellipsis",
                    }}
                  >
                    {book.title}
                  </Typography>

                  {/* =========================
                      نویسنده
                  ========================= */}

                  <Button
                    variant="text"

                    onClick={() =>
                      navigate(
                        "/author",
                        {
                          state: {
                            author:
                              book.author,
                          },
                        }
                      )
                    }

                    sx={{
                      width: "100%",

                      justifyContent:
                        "flex-start",

                      p: 0,

                      mb: 1.2,

                      minHeight: 26,

                      fontFamily:
                        "vazir",

                      fontSize: {
                        xs: 10,
                        sm: 11,
                        md: 12,
                      },

                      color:
                        "#7C3AED",

                      fontWeight:
                        "bold",

                      overflow:
                        "hidden",

                      textOverflow:
                        "ellipsis",

                      whiteSpace:
                        "nowrap",

                      "&:hover": {
                        backgroundColor:
                          "transparent",

                        color:
                          "#6D28D9",
                      },
                    }}
                  >
                    ✍️ {book.author}
                  </Button>

                  {/* =========================
                      دکمه‌ها
                  ========================= */}

                  <Box
                    sx={{
                      display: "flex",

                      gap: {
                        xs: 0.7,
                        sm: 1,
                      },

                      alignItems:
                        "center",

                      width: "100%",
                    }}
                  >

                    {/* مشاهده کتاب */}

                    <Button
                      onClick={() =>
                        navigate(
                          "/book-details",
                          {
                            state: {
                              book,
                            },
                          }
                        )
                      }

                      title="مشاهده کتاب"

                      sx={{
                        minWidth: {
                          xs: 36,
                          sm: 40,
                        },

                        width: {
                          xs: 36,
                          sm: 40,
                        },

                        height: {
                          xs: 36,
                          sm: 40,
                        },

                        p: 0,

                        flexShrink: 0,

                        borderRadius: 2,

                        backgroundColor:
                          "#F3E8FF",

                        color:
                          "#7C3AED",

                        "&:hover": {
                          backgroundColor:
                            "#E9D5FF",
                        },
                      }}
                    >
                      <MenuBookOutlined
                        sx={{
                          fontSize: {
                            xs: 19,
                            sm: 21,
                          },
                        }}
                      />
                    </Button>

                    {/* سبد خرید */}

                    <IconButton
                      onClick={() =>
                        addToCart(book)
                      }

                      title="افزودن به سبد خرید"

                      sx={{
                        width: {
                          xs: 36,
                          sm: 40,
                        },

                        height: {
                          xs: 36,
                          sm: 40,
                        },

                        flexShrink: 0,

                        backgroundColor:
                          "#7C3AED",

                        color: "#fff",

                        borderRadius: 2,

                        "&:hover": {
                          backgroundColor:
                            "#6D28D9",
                        },
                      }}
                    >
                      <ShoppingCartOutlined
                        sx={{
                          fontSize: {
                            xs: 18,
                            sm: 20,
                          },
                        }}
                      />
                    </IconButton>

                    {/* علاقه‌مندی */}

                    <IconButton
                      onClick={() =>
                        toggleFavorite(book)
                      }

                      title={
                        isFavorite(
                          book.id
                        )
                          ? "حذف از علاقه‌مندی‌ها"
                          : "افزودن به علاقه‌مندی‌ها"
                      }

                      sx={{
                        width: {
                          xs: 36,
                          sm: 40,
                        },

                        height: {
                          xs: 36,
                          sm: 40,
                        },

                        flexShrink: 0,

                        borderRadius: 2,

                        backgroundColor:
                          isFavorite(
                            book.id
                          )
                            ? "#FCE7F3"
                            : "#FFF1F2",

                        color:
                          "#991de1",

                        "&:hover": {
                          backgroundColor:
                            "#FCE7F3",
                        },
                      }}
                    >
                      {isFavorite(
                        book.id
                      ) ? (
                        <Favorite
                          sx={{
                            fontSize: {
                              xs: 19,
                              sm: 21,
                            },
                          }}
                        />
                      ) : (
                        <FavoriteBorderOutlined
                          sx={{
                            fontSize: {
                              xs: 19,
                              sm: 21,
                            },
                          }}
                        />
                      )}
                    </IconButton>

                  </Box>

                </CardContent>

              </Card>
            )
          )}
        </Box>
      </Box>

      {/* =========================
          Toastify
      ========================= */}

      <ToastContainer
        position="bottom-left"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover

        toastStyle={{
          background:
            "linear-gradient(135deg, #7C3AED, #6D28D9)",

          color: "#fff",

          fontFamily: "vazir",

          fontSize: "13px",

          fontWeight: "bold",

          borderRadius: "14px",

          boxShadow:
            "0 8px 25px rgba(124,58,237,.35)",

          minHeight: "52px",

          direction: "rtl",

          padding: "10px 14px",
        }}

        progressStyle={{
          background: "#fff",
        }}

        closeButton={false}
      />
    </>
  );
};

export default Popular;