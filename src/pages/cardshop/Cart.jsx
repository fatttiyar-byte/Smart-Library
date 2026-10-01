import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./cart.css";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  // =========================
  // خواندن سبد خرید
  // =========================

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem("cart");

      if (!savedCart) {
        setCart([]);
        return;
      }

      const parsedCart = JSON.parse(savedCart);

      if (Array.isArray(parsedCart)) {
        setCart(parsedCart);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("خطا در خواندن سبد خرید:", error);
      setCart([]);
    }
  };

  // =========================
  // افزایش تعداد
  // =========================

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: (item.quantity || 1) + 1,
        };
      }

      return item;
    });

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // =========================
  // کاهش تعداد
  // =========================

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: (item.quantity || 1) - 1,
          };
        }

        return item;
      })
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // =========================
  // حذف کتاب
  // =========================

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // =========================
  // خالی کردن سبد
  // =========================

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  // =========================
  // تعداد کل کتاب‌ها
  // =========================

  const totalItems = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 1),
    0
  );

  // =========================
  // قیمت کل
  // =========================

  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  // =========================
  // سبد خالی
  // =========================

  if (cart.length === 0) {
    return (
      <div className="cart-page" dir="rtl">
        <div className="empty-cart">

          <ShoppingCartOutlinedIcon
            className="empty-cart-icon"
          />

          <h2>
            سبد خرید شما خالی است
          </h2>

          <p>
            هنوز کتابی به سبد خرید اضافه نکرده‌اید.
          </p>

          <button
            className="back-books-button"
            onClick={() => navigate("/books")}
          >
            <ArrowBackIcon />

            رفتن به کتاب‌ها
          </button>

        </div>
      </div>
    );
  }

  // =========================
  // صفحه سبد خرید
  // =========================

  return (
    <div className="cart-page" dir="rtl">

      <div className="cart-container">



        {/* =========================
            CONTENT
        ========================= */}

        <div className="cart-content">

          {/* =========================
              PRODUCTS
          ========================= */}

          <div className="cart-products">

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                {/* عکس */}

                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                />


                {/* اطلاعات */}

                <div className="cart-item-info">

                  <h3>
                    {item.title}
                  </h3>

                  {item.author && (
                    <p>
                      نویسنده: {item.author}
                    </p>
                  )}

                  {item.genre && (
                    <span>
                      {item.genre}
                    </span>
                  )}

                </div>


                {/* تعداد */}

                <div className="quantity-box">

                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                    title="افزایش"
                  >
                    <AddIcon />
                  </button>

                  <strong>
                    {item.quantity || 1}
                  </strong>

                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                    title="کاهش"
                  >
                    <RemoveIcon />
                  </button>

                </div>


                {/* قیمت */}

                <div className="cart-item-price">

                  {(
                    Number(item.price || 0) *
                    Number(item.quantity || 1)
                  ).toLocaleString("fa-IR")}

                  <small>
                    تومان
                  </small>

                </div>


                {/* حذف */}

                <button
                  className="delete-cart-item"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  title="حذف کتاب"
                >
                  🗑️
                </button>

              </div>

            ))}

          </div>


          {/* =========================
              SUMMARY
          ========================= */}

          <div className="cart-summary">

            <h2>
              خلاصه سفارش
            </h2>


            <div className="summary-row">

              <span>
                تعداد کتاب
              </span>

              <strong>
                {totalItems}
              </strong>

            </div>


            <div className="summary-row">

              <span>
                مبلغ کل
              </span>

              <strong>
                {totalPrice.toLocaleString("fa-IR")}
                <small>
                  {" "}تومان
                </small>
              </strong>

            </div>


            <div className="summary-line" />


            <div className="summary-total">

              <span>
                مبلغ نهایی
              </span>

              <strong>
                {totalPrice.toLocaleString("fa-IR")}
                <small>
                  {" "}تومان
                </small>
              </strong>

            </div>


            <button
              className="checkout-button"
              onClick={() =>
                alert(
                  "بخش پرداخت به زودی فعال می‌شود."
                )
              }
            >
              ادامه خرید
            </button>


            <button
              className="clear-cart-button"
              onClick={clearCart}
            >
              خالی کردن سبد
            </button>

          </div>

        </div>


        {/* =========================
            BACK
        ========================= */}

        <button
          className="back-to-books"
          onClick={() => navigate("/books")}
        >
          <ArrowBackIcon />

          ادامه مشاهده کتاب‌ها
        </button>

      </div>

    </div>
  );
};

export default Cart;