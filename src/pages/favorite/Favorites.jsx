import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Favorites.css";

const Favorites = () => {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);

  // =========================
  // دریافت علاقه‌مندی‌ها
  // =========================

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    try {
      const savedFavorites =
        localStorage.getItem("favorites");

      if (!savedFavorites) {
        setFavorites([]);
        return;
      }

      const parsedFavorites =
        JSON.parse(savedFavorites);

      if (Array.isArray(parsedFavorites)) {
        setFavorites(parsedFavorites);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error(
        "خطا در خواندن علاقه‌مندی‌ها:",
        error
      );

      setFavorites([]);
    }
  };

  // =========================
  // نوتیفیکیشن
  // =========================

  const notificationIcon = (
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
  );

  // =========================
  // حذف از علاقه‌مندی
  // =========================

  const removeFavorite = (id) => {
    const updatedFavorites =
      favorites.filter(
        (book) => book.id !== id
      );

    const removedBook =
      favorites.find(
        (book) => book.id === id
      );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );

    toast.info(
      removedBook
        ? `"${removedBook.title}" از علاقه‌مندی‌ها حذف شد`
        : "کتاب از علاقه‌مندی‌ها حذف شد",
      {
        icon: notificationIcon,
      }
    );
  };

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
        `"${book.title}" به سبد خرید اضافه شد 🛒`,
        {
          icon: notificationIcon,
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
          icon: notificationIcon,
        }
      );
    }
  };

  // =========================
  // سبد علاقه‌مندی خالی
  // =========================

  if (favorites.length === 0) {
    return (
      <div
        className="favorites-page"
        dir="rtl"
      >
        <div className="empty-favorites">

          <FavoriteBorderIcon
            className="empty-favorites-icon"
          />

          <h2>
            علاقه‌مندی‌های شما خالی است
          </h2>

          <p>
            هنوز کتابی را به علاقه‌مندی‌ها
            اضافه نکرده‌اید.
          </p>

          <button
            className="favorites-back-button"
            onClick={() =>
              navigate("/books")
            }
          >
            <ArrowBackIcon />

            مشاهده کتاب‌ها
          </button>

        </div>

        {/* =========================
            TOAST
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

      </div>
    );
  }

  return (
    <div
      className="favorites-page"
      dir="rtl"
    >

      <div className="favorites-container">

        {/* =========================
            BOOKS
        ========================= */}

        <div className="favorites-grid">

          {favorites.map((book) => (

            <article
              className="favorite-book-card"
              key={book.id}
            >

              {/* IMAGE */}

              <div className="favorite-book-image">

                <img
                  src={book.image}
                  alt={book.title}
                />

                {book.genre && (
                  <span>
                    {book.genre}
                  </span>
                )}

                <button
                  className="remove-favorite-button"
                  onClick={() =>
                    removeFavorite(book.id)
                  }
                  title="حذف از علاقه‌مندی‌ها"
                >
                  <FavoriteIcon />
                </button>

              </div>

              {/* INFO */}

              <div className="favorite-book-info">

                <h3>
                  {book.title}
                </h3>

                {book.author && (
                  <p className="favorite-author">
                    ✍️ {book.author}
                  </p>
                )}

                {book.summary && (
                  <p className="favorite-summary">
                    {book.summary}
                  </p>
                )}

                {/* FOOTER */}

                <div className="favorite-book-footer">

                  {book.price && (
                    <strong>
                      {Number(
                        book.price
                      ).toLocaleString("fa-IR")}

                      <small>
                        تومان
                      </small>
                    </strong>
                  )}

                  <div className="favorite-actions">

                    {/* مشاهده */}

                    <button
                      className="favorite-view-button"
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
                    >
                      <VisibilityOutlinedIcon />

                      مشاهده
                    </button>

                    {/* سبد خرید */}

                    <button
                      className="favorite-cart-button"
                      onClick={() =>
                        addToCart(book)
                      }
                      title="افزودن به سبد خرید"
                    >
                      <ShoppingCartOutlinedIcon />
                    </button>

                  </div>

                </div>

              </div>

            </article>

          ))}

        </div>

        {/* BACK */}

        <button
          className="favorites-back-books"
          onClick={() =>
            navigate("/books")
          }
        >
          <ArrowBackIcon />

          ادامه مشاهده کتاب‌ها
        </button>

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

    </div>
  );
};

export default Favorites;