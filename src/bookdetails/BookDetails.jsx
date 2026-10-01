import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./BookDetails.css";

const BookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const book = location.state?.book;

  const [isFavorite, setIsFavorite] = useState(false);

  // =========================
  // بررسی علاقه‌مندی
  // =========================

  useEffect(() => {
    if (!book) return;

    const favorites =
      JSON.parse(
        localStorage.getItem("favorites")
      ) || [];

    const exists = favorites.some(
      (item) => item.id === book.id
    );

    setIsFavorite(exists);
  }, [book]);

  // =========================
  // افزودن به سبد خرید
  // =========================

  const addToCart = () => {
    if (!book) return;

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

      // =========================
      // Toast موفقیت
      // =========================

      toast.success(
        "کتاب با موفقیت به سبد خرید اضافه شد"
      );
    } catch (error) {
      console.error(
        "Cart Error:",
        error
      );

      // =========================
      // Toast خطا
      // =========================

      toast.error(
        "خطا در افزودن کتاب به سبد خرید"
      );
    }
  };

  // =========================
  // علاقه‌مندی
  // =========================

  const toggleFavorite = () => {
    if (!book) return;

    const favorites =
      JSON.parse(
        localStorage.getItem("favorites")
      ) || [];

    const exists =
      favorites.some(
        (item) => item.id === book.id
      );

    let updatedFavorites;

    if (exists) {
      // =========================
      // حذف از علاقه‌مندی
      // =========================

      updatedFavorites =
        favorites.filter(
          (item) => item.id !== book.id
        );

      setIsFavorite(false);

      toast.info(
        "کتاب از علاقه‌مندی‌ها حذف شد"
      );
    } else {
      // =========================
      // اضافه کردن به علاقه‌مندی
      // =========================

      updatedFavorites = [
        ...favorites,
        book,
      ];

      setIsFavorite(true);

      toast.success(
        "کتاب به علاقه‌مندی‌ها اضافه شد"
      );
    }

    localStorage.setItem(
      "favorites",
      JSON.stringify(
        updatedFavorites
      )
    );
  };

  // =========================
  // کتاب پیدا نشد
  // =========================

  if (!book) {
    return (
      <div
        className="book-not-found"
        dir="rtl"
      >
        <div>
          <h2>
            کتاب پیدا نشد 📚
          </h2>

          <p>
            ابتدا یک کتاب را از صفحه
            کتاب‌ها انتخاب کنید.
          </p>

          <button
            onClick={() =>
              navigate("/books")
            }
            className="back-books-button"
          >
            <ArrowBackIcon />

            بازگشت به کتاب‌ها
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="book-details-page"
        dir="rtl"
      >
        <div className="book-details-container">

          {/* =========================
              IMAGE
          ========================= */}

          <div
            className="book-details-image-section"
          >
            <div
              className="book-details-image-box"
            >
              <img
                src={book.image}
                alt={book.title}
              />
            </div>
          </div>

          {/* =========================
              INFO
          ========================= */}

          <div
            className="book-details-info"
          >

            {/* ژانر */}

            {book.genre && (
              <span
                className="details-genre"
              >
                {book.genre}
              </span>
            )}

            {/* عنوان */}

            <h1>
              {book.title}
            </h1>

            {/* نویسنده */}

            {book.author && (
              <div
                className="details-author"
              >
                <span>
                  نویسنده:
                </span>

                <strong>
                  {book.author}
                </strong>
              </div>
            )}

            {/* امتیاز */}

            <div
              className="details-rating"
            >
              <StarIcon />

              <span>
                4.8
              </span>

              <small>
                امتیاز کاربران
              </small>
            </div>

            {/* توضیحات */}

            {book.summary && (
              <div
                className="details-description"
              >
                <h3>
                  درباره کتاب
                </h3>

                <p>
                  {book.summary}
                </p>
              </div>
            )}

            {/* قیمت */}

            {book.price && (
              <div
                className="details-price-box"
              >
                <span>
                  قیمت کتاب
                </span>

                <strong>
                  {Number(
                    book.price
                  ).toLocaleString(
                    "fa-IR"
                  )}

                  <small>
                    تومان
                  </small>
                </strong>
              </div>
            )}

            {/* =========================
                BUTTONS
            ========================= */}

            <div
              className="details-buttons"
            >

              {/* سبد خرید */}

              <button
                className="add-cart-details"
                onClick={addToCart}
              >
                <ShoppingCartOutlinedIcon />

                افزودن به سبد خرید
              </button>

              {/* علاقه‌مندی */}

              <button
                className={`favorite-details ${
                  isFavorite
                    ? "favorite-active"
                    : ""
                }`}
                title={
                  isFavorite
                    ? "حذف از علاقه‌مندی‌ها"
                    : "افزودن به علاقه‌مندی‌ها"
                }
                onClick={toggleFavorite}
              >
                {isFavorite ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
              </button>

            </div>

            {/* بازگشت */}

            <button
              className="back-to-books"
              onClick={() =>
                navigate("/books")
              }
            >
              <ArrowBackIcon />

              بازگشت به کتاب‌ها
            </button>

          </div>
        </div>
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
        closeButton={false}
        icon={false}

        toastStyle={{
          background:
            "linear-gradient(135deg, #7C3AED, #6D28D9)",

          color: "#fff",

          fontFamily: "vazir",

          fontSize: "13px",

          fontWeight: "bold",

          borderRadius: "14px",

          minHeight: "52px",

          padding: "12px 18px",

          boxShadow:
            "0 8px 25px rgba(124, 58, 237, 0.35)",

          direction: "rtl",

          textAlign: "right",
        }}

        progressStyle={{
          background: "#fff",
        }}
      />
    </>
  );
};

export default BookDetails;