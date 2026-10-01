import React from "react";
import { Link, useLocation } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const Breadcrumb = () => {
  const location = useLocation();

  const paths = {
    "/": "خانه",
    "/books": "کتاب‌ها",
    "/category": "دسته‌بندی‌ها",
    "/chatbot": "کتابدار هوشمند",
    "/cardshop": "سبد خرید",
    "/favorites": "علاقه‌مندی‌ها",
    "/book-details": "مشاهده کتاب",
  };

  // صفحه اصلی Breadcrumb نمی‌خواهد
  if (location.pathname === "/") {
    return null;
  }

  const currentPage =
    paths[location.pathname] || "صفحه";

  return (
    <div
      dir="rtl"
      style={{
        width: "100%",
        padding: "18px 5%",
        background: "#faf7ff",
        borderBottom: "1px solid #eee5ff",
        boxSizing: "border-box",
      }}
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "14px",
        }}
      >

        {/* خانه */}

        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: "#7C3AED",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          <HomeOutlinedIcon
            sx={{
              fontSize: 19,
            }}
          />

          خانه
        </Link>


        {/* جداکننده */}

        <NavigateBeforeIcon
          sx={{
            color: "#999",
            fontSize: 20,
          }}
        />


        {/* صفحه فعلی */}

        <span
          style={{
            color: "#555",
            fontWeight: "500",
          }}
        >
          {currentPage}
        </span>

      </div>

    </div>
  );
};

export default Breadcrumb;