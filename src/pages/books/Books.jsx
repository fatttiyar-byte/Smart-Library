import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import books from "../../bookcard/cardbook";
import "./books.css";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Books = () => {
  const [search, setSearch] = useState("");

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  const navigate = useNavigate();

  // =========================
  // جستجوی کتاب
  // =========================

  const filteredBooks = books.filter((book) => {
    const text = search.toLowerCase().trim();

    return (
      book.title?.toLowerCase().includes(text) ||
      book.author?.toLowerCase().includes(text) ||
      book.genre?.toLowerCase().includes(text)
    );
  });

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
            (updatedCart[existingIndex].quantity || 1) +
            1,
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
      console.error("Cart Error:", error);

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
  // علاقه‌مندی‌ها
  // =========================

  const toggleFavorite = (book) => {
    const savedFavorites =
      JSON.parse(
        localStorage.getItem("favorites")
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
      JSON.stringify(updatedFavorites)
    );

    setFavorites(updatedFavorites);
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
  // مشاهده کتاب
  // =========================

  const viewBook = (book) => {
    navigate("/book-details", {
      state: {
        book: book,
      },
    });
  };

  // =========================
  // JSX
  // =========================

  return (
    <>
      <div
        className="books-page"
        dir="rtl"
      >

        <main className="books-content">

          {/* =========================
              SEARCH
          ========================= */}

          <div className="books-toolbar">

            <div className="search-box">

              <span>⌕</span>

              <input
                type="text"
                placeholder="جستجوی کتاب، نویسنده یا ژانر..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          {/* =========================
              TITLE
          ========================= */}

          <div className="books-title">

            <div>

              <span>
                مجموعه کتاب‌ها
              </span>

              <h2>
                همه کتاب‌ها
              </h2>

            </div>

            <div className="books-count">
              {filteredBooks.length} کتاب
            </div>

          </div>

          {/* =========================
              BOOKS
          ========================= */}

          {filteredBooks.length === 0 ? (

            <div className="no-books">

              <div>📚</div>

              <h3>
                کتابی پیدا نشد
              </h3>

              <p>
                نام کتاب یا نویسنده دیگری را جستجو کن.
              </p>

            </div>

          ) : (

            <div className="books-grid">

              {filteredBooks.map((book) => (

                <article
                  className="book-card"
                  key={book.id}
                >

                  {/* =========================
                      IMAGE
                  ========================= */}

                  <div className="book-image">

                    <img
                      src={book.image}
                      alt={book.title}
                    />

                    {book.genre && (
                      <span className="book-genre">
                        {book.genre}
                      </span>
                    )}

                    {book.popular && (
                      <span className="popular-badge">
                        ⭐ محبوب
                      </span>
                    )}

                    {/* FAVORITE */}

                    <button
                      className={`favorite-button ${
                        isFavorite(book.id)
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        toggleFavorite(book)
                      }
                      title={
                        isFavorite(book.id)
                          ? "حذف از علاقه‌مندی‌ها"
                          : "افزودن به علاقه‌مندی‌ها"
                      }
                    >

                      {isFavorite(book.id) ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )}

                    </button>

                  </div>

                  {/* =========================
                      INFO
                  ========================= */}

                  <div className="book-info">

                    <h3>
                      {book.title}
                    </h3>

                    {book.author && (
                      <p className="book-author">
                        ✍️ {book.author}
                      </p>
                    )}

                    {book.summary && (
                      <p className="book-summary">
                        {book.summary}
                      </p>
                    )}

                    {/* =========================
                        BOTTOM
                    ========================= */}

                    <div className="book-bottom">

                      {book.price && (
                        <strong className="book-price">

                          {Number(
                            book.price
                          ).toLocaleString("fa-IR")}

                          <small>
                            {" "}تومان
                          </small>

                        </strong>
                      )}

                      <div className="book-actions">

                        {/* مشاهده کتاب */}

                        <button
                          className="book-view-button"
                          onClick={() =>
                            viewBook(book)
                          }
                        >
                          مشاهده کتاب
                        </button>

                        {/* سبد خرید */}

                        <button
                          className="book-cart-button"
                          onClick={() =>
                            addToCart(book)
                          }
                        >
                          <ShoppingCartOutlinedIcon />
                        </button>

                      </div>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

        </main>

      </div>

      {/* =========================
          TOASTIFY
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

export default Books;