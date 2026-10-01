import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import books from "../../bookcard/cardbook";
import "./categories.css";

import {
  ShoppingCartOutlined,
  FavoriteBorderOutlined,
  Favorite,
  VisibilityOutlined,
} from "@mui/icons-material";

import {
  ToastContainer,
  toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Categories = () => {

  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] =
    useState("همه");

  const [favorites, setFavorites] = useState([]);


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
  // استخراج دسته‌ها
  // =========================

  const categories = useMemo(() => {

    const allGenres = books
      .map((book) => book.genre)
      .filter(Boolean);

    return [
      "همه",
      ...new Set(allGenres),
    ];

  }, []);


  // =========================
  // فیلتر کتاب‌ها
  // =========================

  const filteredBooks =
    selectedCategory === "همه"
      ? books
      : books.filter(
          (book) =>
            book.genre === selectedCategory
        );


  // =========================
  // آیکون نوتیف
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
          (item) =>
            item.id === book.id
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
        (item) =>
          item.id === book.id
      );


    let updatedFavorites;


    if (exists) {

      updatedFavorites =
        savedFavorites.filter(
          (item) =>
            item.id !== book.id
        );


      toast.info(
        "کتاب از علاقه‌مندی‌ها حذف شد",
        {
          icon: notificationIcon,
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
          icon: notificationIcon,
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
      (item) =>
        item.id === bookId
    );

  };


  return (

    <>

      <section
        className="categories-page"
        dir="rtl"
      >


        {/* =========================
            CATEGORIES
        ========================= */}

        <div className="categories-wrapper">

          <div className="categories-title">

            <div>

              <h2>
                دسته‌بندی‌ها
              </h2>

              <p>
                {categories.length - 1}
                {" "}
                دسته‌بندی موجود است
              </p>

            </div>

          </div>


          <div className="categories-list">

            {categories.map(
              (category) => (

                <button
                  key={category}

                  className={`category-card ${
                    selectedCategory === category
                      ? "active"
                      : ""
                  }`}

                  onClick={() =>
                    setSelectedCategory(
                      category
                    )
                  }
                >

                  <div className="category-icon">

                    {category === "همه"
                      ? "📚"
                      : "📖"}

                  </div>


                  <div className="category-info">

                    <strong>
                      {category}
                    </strong>

                    <span>

                      {category === "همه"
                        ? `${books.length} کتاب`
                        : `${books.filter(
                            (book) =>
                              book.genre ===
                              category
                          ).length} کتاب`}

                    </span>

                  </div>

                </button>

              )
            )}

          </div>

        </div>


        {/* =========================
            BOOKS
        ========================= */}

        <div className="books-section">

          <div className="books-section-header">

            <div>

              <span>
                کتاب‌های موجود
              </span>

              <h2>

                {selectedCategory === "همه"
                  ? "همه کتاب‌ها"
                  : selectedCategory}

              </h2>

            </div>


            <div className="book-count">

              {filteredBooks.length}
              {" "}
              کتاب

            </div>

          </div>


          {/* =========================
              EMPTY
          ========================= */}

          {filteredBooks.length === 0 ? (

            <div className="empty-books">

              <div>
                📚
              </div>

              <h3>
                کتابی پیدا نشد
              </h3>

              <p>
                در این دسته‌بندی هنوز کتابی
                وجود ندارد.
              </p>

            </div>

          ) : (


            <div className="books-grid">

              {filteredBooks.map(
                (book) => (

                  <div
                    className="category-book-card"
                    key={book.id}
                  >


                    {/* IMAGE */}

                    <div className="book-image">

                      <img
                        src={book.image}
                        alt={book.title}
                      />

                      <span>
                        {book.genre}
                      </span>

                    </div>


                    {/* INFO */}

                    <div className="book-info">

                      <h3>
                        {book.title}
                      </h3>


                      {book.author && (

                        <p className="book-author">

                          ✍️{" "}
                          {book.author}

                        </p>

                      )}


                      {book.summary && (

                        <p className="book-summary">

                          {book.summary}

                        </p>

                      )}


                      {/* =========================
                          FOOTER
                      ========================= */}

                      <div className="book-footer">


                        {/* PRICE */}

                        {book.price && (

                          <strong>

                            {Number(
                              book.price
                            ).toLocaleString(
                              "fa-IR"
                            )}

                            {" "}

                            تومان

                          </strong>

                        )}


                        {/* BUTTONS */}

                        <div
                          style={{
                            display: "flex",
                            gap: "7px",
                            alignItems: "center",
                          }}
                        >


                          {/* مشاهده */}

                          <button
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

                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "center",
                              gap: "5px",
                            }}
                          >

                            <VisibilityOutlined
                              sx={{
                                fontSize: 18,
                              }}
                            />

                            مشاهده

                          </button>


                          {/* سبد خرید */}

                          <button
                            onClick={() =>
                              addToCart(book)
                            }

                            title="افزودن به سبد خرید"

                            style={{
                              width: "40px",
                              height: "40px",
                              padding: 0,
                              display:
                                "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "center",
                              background:
                                "#7C3AED",
                              color:
                                "white",
                              border:
                                "none",
                              borderRadius:
                                "10px",
                              cursor:
                                "pointer",
                            }}
                          >

                            <ShoppingCartOutlined
                              sx={{
                                fontSize: 20,
                              }}
                            />

                          </button>


                          {/* علاقه‌مندی */}

                          <button
                            onClick={() =>
                              toggleFavorite(
                                book
                              )
                            }

                            title={
                              isFavorite(
                                book.id
                              )
                                ? "حذف از علاقه‌مندی‌ها"
                                : "افزودن به علاقه‌مندی‌ها"
                            }

                            style={{
                              width: "40px",
                              height: "40px",
                              padding: 0,
                              display:
                                "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "center",
                              background:
                                isFavorite(
                                  book.id
                                )
                                  ? "#FCE7F3"
                                  : "#FFF1F2",
                              color:
                                isFavorite(
                                  book.id
                                )
                                  ? "#DB2777"
                                  : "#E11D48",
                              border:
                                "none",
                              borderRadius:
                                "10px",
                              cursor:
                                "pointer",
                            }}
                          >

                            {isFavorite(
                              book.id
                            ) ? (

                              <Favorite
                                sx={{
                                  fontSize: 21,
                                }}
                              />

                            ) : (

                              <FavoriteBorderOutlined
                                sx={{
                                  fontSize: 21,
                                }}
                              />

                            )}

                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </section>


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

export default Categories;