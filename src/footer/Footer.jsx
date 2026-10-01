import React from "react";
import { Link } from "react-router-dom";

import {
  MenuBookOutlined,
  Instagram,
  Telegram,
  EmailOutlined,
  PhoneOutlined,
  LocationOnOutlined,
  ArrowUpward,
} from "@mui/icons-material";

import "./footer.css";

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer" dir="rtl">

      <div className="footer-container">

        {/* ================= معرفی ================= */}

        <div className="footer-about">

          <div className="footer-logo">

            <div className="footer-logo-icon">
              <MenuBookOutlined />
            </div>

            <h2>کتابدار هوشمند</h2>

          </div>

          <p>
            جایی برای کشف کتاب‌های جدید،
            خواندن داستان‌های ماندگار و
            پیدا کردن کتابی که با سلیقه تو
            هماهنگ باشد.
          </p>

          {/* شبکه‌های اجتماعی */}

          <div className="footer-social">

            <a href="#" aria-label="Instagram">
              <Instagram />
            </a>

            <a href="#" aria-label="Telegram">
              <Telegram />
            </a>

            <a href="#" aria-label="Email">
              <EmailOutlined />
            </a>

          </div>

        </div>


        {/* ================= دسترسی سریع ================= */}

        <div className="footer-column">

          <h3>دسترسی سریع</h3>

          <Link to="/">خانه</Link>

          <Link to="/books">
            همه کتاب‌ها
          </Link>

          <Link to="/category">
            دسته‌بندی‌ها
          </Link>

          <Link to="/chatbot">
            کتابدار هوشمند
          </Link>

        </div>


        {/* ================= بخش‌های سایت ================= */}

        <div className="footer-column">

          <h3>بخش‌های سایت</h3>

          <Link to="/favorites">
            علاقه‌مندی‌ها
          </Link>

          <Link to="/cardshop">
            سبد خرید
          </Link>

          <Link to="/authors">
            نویسندگان
          </Link>

          <Link to="/contact">
            تماس با ما
          </Link>

        </div>


        {/* ================= تماس ================= */}

        <div className="footer-contact">

          <h3>ارتباط با ما</h3>

          <div className="contact-item">

            <EmailOutlined />

            <span>
              info@ketabkhane.ir
            </span>

          </div>


          <div className="contact-item">

            <PhoneOutlined />

            <span>
              ۰۲۱-۱۲۳۴۵۶۷۸
            </span>

          </div>


          <div className="contact-item">

            <LocationOnOutlined />

            <span>
              تهران، خیابان انقلاب،
              مرکز کتاب و فرهنگ
            </span>

          </div>

        </div>

      </div>


      {/* ================= خط ================= */}

      <div className="footer-divider"></div>


      {/* ================= پایین فوتر ================= */}

      <div className="footer-bottom">

        <p>
          © ۱۴۰۵ کتاب‌خانه | تمامی حقوق محفوظ است.
        </p>


        <button
          className="back-top"
          onClick={scrollToTop}
        >

          <span>
            بازگشت به بالا
          </span>

          <span className="back-top-icon">
            <ArrowUpward />
          </span>

        </button>

      </div>

    </footer>
  );
};

export default Footer;