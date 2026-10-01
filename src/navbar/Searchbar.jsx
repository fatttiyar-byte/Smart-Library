import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
  Button,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import books from "../bookcard/cardbook";

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const normalizedSearch = search
    .toLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .trim();

  const results = normalizedSearch
    ? books.filter((book) => {
        const title =
          book.title?.toLowerCase() || "";

        const author =
          book.author?.toLowerCase() || "";

        const genre =
          book.genre?.toLowerCase() || "";

        return (
          title.includes(normalizedSearch) ||
          author.includes(normalizedSearch) ||
          genre.includes(normalizedSearch)
        );
      })
    : [];

  const closeModal = () => {
    setOpen(false);
    setSearch("");
  };

  // مشاهده کتاب
  const handleViewBook = (book) => {
    closeModal();

    navigate("/book-details", {
      state: {
        book: book,
      },
    });
  };

  return (
    <>
      {/* =========================
          SEARCH BUTTON
      ========================= */}

      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          borderRadius: "14px",
          color: "#7C3AED",
          p: 1.2,
          transition: "0.3s",
        }}
      >
        <SearchIcon fontSize="medium" />
      </IconButton>


      {/* =========================
          MODAL
      ========================= */}

      <Modal
        open={open}
        onClose={closeModal}
      >
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",

            width: {
              xs: "94%",
              sm: 550,
            },

            maxHeight: "80vh",
            overflowY: "auto",

            bgcolor: "#fff",

            borderRadius: "22px",

            border: "3px solid #7C3AED",

            boxShadow:
              "0 20px 60px rgba(124,58,237,.25)",

            p: {
              xs: 2,
              sm: 4,
            },

            outline: "none",
          }}
        >

          {/* HEADER */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >

            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#7C3AED",
                fontSize: {
                  xs: "20px",
                  sm: "25px",
                },
              }}
            >
              جستجوی کتاب 📚
            </Typography>

            <IconButton
              onClick={closeModal}
            >
              <CloseRoundedIcon />
            </IconButton>

          </Box>


          {/* SEARCH INPUT */}

          <TextField
            fullWidth
            autoFocus
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="نام کتاب، نویسنده یا ژانر..."
            variant="outlined"

            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      color: "#7C3AED",
                    }}
                  />
                </InputAdornment>
              ),
            }}

            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "40px",

                bgcolor: "#faf7ff",

                "& fieldset": {
                  borderColor: "#7C3AED",
                },

                "&:hover fieldset": {
                  borderColor: "#6D28D9",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#7C3AED",
                  borderWidth: "2px",
                },
              },
            }}
          />


          {/* RESULTS */}

          <Box sx={{ mt: 3 }}>

            {/* BEFORE SEARCH */}

            {!search && (
              <Box
                sx={{
                  textAlign: "center",
                  py: 5,
                  color: "#999",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "40px",
                    mb: 1,
                  }}
                >
                  🔎
                </Typography>

                <Typography
                  sx={{
                    fontSize: "13px",
                  }}
                >
                  نام کتاب یا نویسنده را جستجو کنید
                </Typography>
              </Box>
            )}


            {/* NO RESULT */}

            {search &&
              results.length === 0 && (
                <Box
                  sx={{
                    textAlign: "center",
                    py: 5,
                  }}
                >

                  <Typography
                    sx={{
                      fontSize: "40px",
                      mb: 1,
                    }}
                  >
                    📚
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "#444",
                    }}
                  >
                    کتابی پیدا نشد
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      color: "#999",
                      fontSize: "12px",
                    }}
                  >
                    نام کتاب یا نویسنده دیگری را امتحان کنید.
                  </Typography>

                </Box>
              )}


            {/* BOOK RESULTS */}

            {results.map((book) => (

              <Box
                key={book.id}
                sx={{
                  display: "flex",
                  gap: 2,

                  p: 1.5,

                  mb: 2,

                  borderRadius: "18px",

                  bgcolor: "#faf7ff",

                  border:
                    "1px solid #eee5ff",

                  transition: "0.25s",

                  "&:hover": {
                    boxShadow:
                      "0 8px 25px rgba(124,58,237,.12)",

                    transform:
                      "translateY(-2px)",
                  },

                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                }}
              >

                {/* IMAGE */}

                <Box
                  sx={{
                    width: {
                      xs: "100%",
                      sm: 130,
                    },

                    height: {
                      xs: 230,
                      sm: 180,
                    },

                    flexShrink: 0,

                    borderRadius: "14px",

                    overflow: "hidden",

                    bgcolor: "#eee",
                  }}
                >

                  <img
                    src={book.image}
                    alt={book.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                </Box>


                {/* INFORMATION */}

                <Box
                  sx={{
                    flex: 1,
                    textAlign: "right",
                  }}
                >

                  {/* TITLE */}

                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "#29233c",
                      fontSize: "17px",
                      mb: 1,
                    }}
                  >
                    {book.title}
                  </Typography>


                  {/* AUTHOR */}

                  {book.author && (
                    <Typography
                      sx={{
                        color: "#7C3AED",
                        fontSize: "12px",
                        mb: 1,
                      }}
                    >
                      ✍️ {book.author}
                    </Typography>
                  )}


                  {/* GENRE */}

                  {book.genre && (
                    <Box
                      sx={{
                        display: "inline-block",

                        px: 1.3,
                        py: 0.5,

                        borderRadius: "20px",

                        bgcolor: "#ede9fe",

                        color: "#6D28D9",

                        fontSize: "10px",

                        mb: 1.5,
                      }}
                    >
                      {book.genre}
                    </Box>
                  )}


                  {/* SUMMARY */}

                  {book.summary && (
                    <Typography
                      sx={{
                        color: "#777",

                        fontSize: "11px",

                        lineHeight: 1.9,

                        display: "-webkit-box",

                        WebkitLineClamp: 3,

                        WebkitBoxOrient: "vertical",

                        overflow: "hidden",

                        mb: 2,
                      }}
                    >
                      {book.summary}
                    </Typography>
                  )}


                  {/* PRICE */}

                  {book.price && (
                    <Typography
                      sx={{
                        color: "#5B21B6",

                        fontWeight: "bold",

                        fontSize: "13px",

                        mb: 1.5,
                      }}
                    >
                      {Number(
                        book.price
                      ).toLocaleString("fa-IR")}{" "}
                      تومان
                    </Typography>
                  )}


                  {/* مشاهده کتاب */}

                  <Button
                    variant="contained"
                    onClick={() =>
                      handleViewBook(book)
                    }
                    sx={{
                      width: "100%",

                      minHeight: 40,

                      borderRadius: "11px",

                      bgcolor: "#7C3AED",

                      fontFamily: "inherit",

                      fontSize: "12px",

                      fontWeight: "bold",

                      boxShadow: "none",

                      "&:hover": {
                        bgcolor: "#6D28D9",

                        boxShadow:
                          "0 6px 18px rgba(124,58,237,.25)",
                      },
                    }}
                  >
                    مشاهده کتاب
                  </Button>

                </Box>

              </Box>

            ))}

          </Box>

        </Box>
      </Modal>
    </>
  );
}