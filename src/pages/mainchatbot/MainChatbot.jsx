import React, { useState, useRef, useEffect } from "react";
import "./mainchatbot.css";

import {
  SmartToy,
  Send,
  AutoAwesome,
  Person,
  MenuBook,
  Psychology,
  Search,
  AutoStories,
  Close,
} from "@mui/icons-material";

import books from "../../chatbot-btn/books";

const MainChatbot = () => {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "سلام! 👋 من دستیار کتابخانه هستم.",
    },
    {
      id: 2,
      sender: "bot",
      text: "می‌تونم بر اساس دیتای کتاب‌های سایت، کتاب معرفی کنم، اطلاعات کتاب بدم و بر اساس ژانر یا سلیقه‌ات پیشنهاد بدم. 📚",
    },
  ]);

  const messagesEndRef = useRef(null);

  /* =========================
     AUTO SCROLL
  ========================= */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  /* =========================
     NORMALIZE
  ========================= */

  const normalize = (text = "") => {
    return text
      .toString()
      .toLowerCase()
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .replace(/\u200c/g, " ")
      .trim();
  };

  /* =========================
     FIND BOOK
  ========================= */

  const findBook = (text) => {
    const normalizedText = normalize(text);

    return books.find((book) => {
      const title = normalize(book.title);

      return (
        normalizedText.includes(title) ||
        title.includes(normalizedText)
      );
    });
  };

  /* =========================
     FIND BOOKS BY GENRE
  ========================= */

  const findBooksByGenre = (text) => {
    const normalizedText = normalize(text);

    return books.filter((book) => {
      const genres = Array.isArray(book.genres)
        ? book.genres
        : book.genre
        ? [book.genre]
        : [];

      return genres.some((genre) =>
        normalizedText.includes(normalize(genre))
      );
    });
  };

  /* =========================
     RECOMMEND BOOKS
  ========================= */

  const recommendBooks = (text) => {
    const normalizedText = normalize(text);

    let selectedGenres = [];
    let selectedMoods = [];

    if (
      normalizedText.includes("روان") ||
      normalizedText.includes("ذهن") ||
      normalizedText.includes("روانشناسی")
    ) {
      selectedGenres.push("روانشناسی");
      selectedMoods.push("روانشناختی");
    }

    if (
      normalizedText.includes("معمایی") ||
      normalizedText.includes("جنایی") ||
      normalizedText.includes("راز")
    ) {
      selectedGenres.push("معمایی", "جنایی");
      selectedMoods.push("مرموز", "هیجان‌انگیز");
    }

    if (
      normalizedText.includes("فلسف") ||
      normalizedText.includes("عمیق")
    ) {
      selectedGenres.push("فلسفی");
      selectedMoods.push("عمیق", "فکری");
    }

    if (
      normalizedText.includes("فانتزی") ||
      normalizedText.includes("جادو")
    ) {
      selectedGenres.push("فانتزی");
      selectedMoods.push("فانتزی", "ماجراجویانه");
    }

    if (
      normalizedText.includes("عاشق") ||
      normalizedText.includes("احساس")
    ) {
      selectedGenres.push("عاشقانه");
      selectedMoods.push("احساسی");
    }

    if (
      normalizedText.includes("کوتاه") ||
      normalizedText.includes("کم حجم")
    ) {
      selectedGenres.push("کوتاه");
    }

    let results = books
      .map((book) => {
        let score = 0;

        const genres = Array.isArray(book.genres)
          ? book.genres
          : book.genre
          ? [book.genre]
          : [];

        const moods = Array.isArray(book.mood)
          ? book.mood
          : book.mood
          ? [book.mood]
          : [];

        genres.forEach((genre) => {
          if (
            selectedGenres.some(
              (item) =>
                normalize(genre).includes(normalize(item)) ||
                normalize(item).includes(normalize(genre))
            )
          ) {
            score += 3;
          }
        });

        moods.forEach((mood) => {
          if (
            selectedMoods.some(
              (item) =>
                normalize(mood).includes(normalize(item)) ||
                normalize(item).includes(normalize(mood))
            )
          ) {
            score += 2;
          }
        });

        if (
          selectedGenres.includes("کوتاه") &&
          book.length === "کوتاه"
        ) {
          score += 4;
        }

        return {
          ...book,
          score,
        };
      })
      .filter((book) => book.score > 0)
      .sort((a, b) => b.score - a.score);

    if (results.length === 0) {
      results = books.filter(
        (book) => book.popular === true
      );
    }

    if (results.length === 0) {
      results = books;
    }

    return results.slice(0, 3);
  };

  /* =========================
     BOT RESPONSE
  ========================= */

  const getBotResponse = (question) => {
    const text = normalize(question);

    if (!books || books.length === 0) {
      return "متأسفانه هنوز هیچ کتابی در دیتای سایت وجود ندارد.";
    }

    const book = findBook(text);

    /* سلام */

    if (
      text.includes("سلام") ||
      text.includes("درود") ||
      text.includes("hello")
    ) {
      return "سلام! 👋 خوش اومدی. دوست داری چه کتابی بخونی؟";
    }

    /* خلاصه */

    if (
      text.includes("خلاصه") ||
      text.includes("داستان") ||
      text.includes("درباره")
    ) {
      if (book) {
        return (
          `📖 ${book.title}\n\n` +
          `✍️ نویسنده: ${
            book.author || "نامشخص"
          }\n\n` +
          `${book.summary || book.description || "توضیحی برای این کتاب ثبت نشده است."}`
        );
      }

      return (
        "حتماً 📚 اسم کتاب رو هم بگو تا اطلاعاتش رو از دیتای سایت پیدا کنم.\n\n" +
        "مثلاً:\n" +
        "«خلاصه 1984 رو بگو»"
      );
    }

    /* نویسنده */

    if (
      text.includes("نویسنده") ||
      text.includes("نویسنده‌ش")
    ) {
      if (book) {
        return `✍️ نویسنده کتاب «${book.title}»، ${
          book.author || "نامشخص"
        } است.`;
      }

      return "اسم کتاب رو بگو تا نویسنده‌اش رو از دیتای کتاب‌ها پیدا کنم. 📚";
    }

    /* محبوب */

    if (
      text.includes("محبوب") ||
      text.includes("پرطرفدار") ||
      text.includes("پرفروش")
    ) {
      const popularBooks = books.filter(
        (book) => book.popular === true
      );

      if (popularBooks.length > 0) {
        let response = "🔥 کتاب‌های محبوب سایت:\n\n";

        popularBooks.slice(0, 5).forEach((book, index) => {
          response += `${index + 1}. ${book.title}\n`;
        });

        return response;
      }
    }

    /* پیشنهاد */

    if (
      text.includes("پیشنهاد") ||
      text.includes("معرفی") ||
      text.includes("چه کتابی") ||
      text.includes("کتاب خوب") ||
      text.includes("کتاب مناسب") ||
      text.includes("چی بخونم")
    ) {
      const recommendations = recommendBooks(text);

      let response =
        "✨ چند کتاب که ممکنه دوست داشته باشی:\n\n";

      recommendations.forEach((book, index) => {
        response +=
          `${index + 1}. ${book.title}\n` +
          `✍️ ${book.author || "نویسنده نامشخص"}\n` +
          `💡 ${
            book.description ||
            book.summary ||
            "توضیحی ثبت نشده است."
          }\n\n`;
      });

      return response;
    }

    /* ژانر */

    const genreBooks = findBooksByGenre(text);

    if (genreBooks.length > 0) {
      let response = "📚 کتاب‌های مرتبط با این موضوع:\n\n";

      genreBooks.slice(0, 5).forEach((book, index) => {
        response +=
          `${index + 1}. ${book.title}\n` +
          `✍️ ${book.author || "نویسنده نامشخص"}\n\n`;
      });

      return response;
    }

    /* اطلاعات مستقیم کتاب */

    if (book) {
      const genres = Array.isArray(book.genres)
        ? book.genres.join("، ")
        : book.genre || "نامشخص";

      return (
        `📚 ${book.title}\n\n` +
        `✍️ نویسنده: ${book.author || "نامشخص"}\n` +
        `🏷️ ژانر: ${genres}\n` +
        `📄 حجم: ${book.length || "نامشخص"}\n\n` +
        `${book.description || book.summary || "توضیحی ثبت نشده است."}`
      );
    }

    /* قیمت */

    if (
      text.includes("ارزان") ||
      text.includes("قیمت پایین")
    ) {
      const cheapBooks = [...books]
        .filter(
          (book) =>
            typeof book.price === "number"
        )
        .sort((a, b) => a.price - b.price)
        .slice(0, 5);

      if (cheapBooks.length > 0) {
        let response =
          "💰 چند کتاب با قیمت مناسب:\n\n";

        cheapBooks.forEach((book, index) => {
          response +=
            `${index + 1}. ${book.title}\n` +
            `💵 ${book.price.toLocaleString()} تومان\n\n`;
        });

        return response;
      }
    }

    /* DEFAULT */

    return (
      "🤔 هنوز نتونستم دقیق متوجه بشم.\n\n" +
      "می‌تونی یکی از این موارد رو امتحان کنی:\n\n" +
      "📖 خلاصه یک کتاب\n" +
      "✍️ پیدا کردن نویسنده\n" +
      "✨ پیشنهاد کتاب\n" +
      "🔥 کتاب‌های محبوب\n" +
      "🧠 کتاب‌های روانشناسی\n" +
      "🔎 کتاب‌های معمایی\n" +
      "🪄 کتاب‌های فانتزی\n\n" +
      "مثلاً بنویس:\n" +
      "«یک کتاب معمایی پیشنهاد بده»"
    );
  };

  /* =========================
     SEND MESSAGE
  ========================= */

  const sendMessage = () => {
    if (!message.trim()) return;

    const userText = message;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: userText,
      },
    ]);

    setMessage("");

    setTimeout(() => {
      const response = getBotResponse(userText);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: response,
        },
      ]);
    }, 400);
  };

  /* =========================
     QUICK QUESTIONS
  ========================= */

  const quickQuestions = [
    {
      text: "یک کتاب پیشنهاد بده",
      icon: <AutoAwesome />,
    },
    {
      text: "یک کتاب معمایی معرفی کن",
      icon: <Search />,
    },
    {
      text: "یک کتاب فلسفی معرفی کن",
      icon: <Psychology />,
    },
    {
      text: "کتاب‌های محبوب رو بگو",
      icon: <MenuBook />,
    },
  ];

  return (
    <div className="main-chatbot-page">

    

      {/* MAIN CHAT AREA */}

      <main className="chat-main">

        <div className="chat-container">

          {/* SIDEBAR */}

          <aside className="chat-sidebar">

            <div className="sidebar-logo">
              <div className="sidebar-logo-icon">
                <AutoStories />
              </div>

              <div>
                <span>دستیار کتاب</span>
              </div>
            </div>

            <div className="sidebar-line"></div>

            <h3>چه کمکی می‌خوای؟</h3>

            <button
              className="side-option"
              onClick={() =>
                setMessage("یک کتاب پیشنهاد بده")
              }
            >
              <span className="side-option-icon">
                <AutoAwesome />
              </span>

              <div>
                <strong>پیشنهاد کتاب</strong>
                <small>
                  کتاب مناسب سلیقه من
                </small>
              </div>
            </button>

            <button
              className="side-option"
              onClick={() =>
                setMessage("یک کتاب معمایی معرفی کن")
              }
            >
              <span className="side-option-icon">
                <Search />
              </span>

              <div>
                <strong>کتاب‌های معمایی</strong>
                <small>
                  رازآلود و هیجان‌انگیز
                </small>
              </div>
            </button>

            <button
              className="side-option"
              onClick={() =>
                setMessage("یک کتاب فلسفی معرفی کن")
              }
            >
              <span className="side-option-icon">
                <Psychology />
              </span>

              <div>
                <strong>کتاب‌های فلسفی</strong>
                <small>
                  عمیق و فکری
                </small>
              </div>
            </button>

            <button
              className="side-option"
              onClick={() =>
                setMessage("کتاب‌های محبوب رو بگو")
              }
            >
              <span className="side-option-icon">
                <MenuBook />
              </span>

              <div>
                <strong>کتاب‌های محبوب</strong>
                <small>
                  محبوب‌ترین‌های سایت
                </small>
              </div>
            </button>

           

          </aside>


          {/* CHAT */}

          <section className="chat-box">

            {/* CHAT HEADER */}

            <div className="chat-header">

              <div className="chat-profile">

                <div className="profile-avatar">
                  <SmartToy />
                  <span></span>
                </div>

                <div>
                  <h2>
                    دستیار کتابخانه
                  </h2>

                  <p>
                    <i></i>
                    آنلاین و آماده پاسخگویی
                  </p>
                </div>

              </div>

              <div className="books-count">
                <MenuBook />

                <span>
                  {books.length} کتاب
                </span>
              </div>

            </div>


            {/* MESSAGES */}

            <div className="messages-area">

              <div className="welcome-card">

                <div className="welcome-icon">
                  <AutoAwesome />
                </div>

                <div>
                  <h3>
                    از من هر چیزی درباره کتاب‌ها بپرس
                  </h3>

                  <p>
                    من از دیتای کتاب‌های سایت استفاده
                    می‌کنم تا بهترین جواب رو بهت بدم.
                  </p>
                </div>

              </div>


              {messages.map((msg) => (

                <div
                  key={msg.id}
                  className={`message-row ${
                    msg.sender === "user"
                      ? "user-message"
                      : "bot-message"
                  }`}
                >

                  {msg.sender === "bot" && (
                    <div className="message-avatar bot-avatar">
                      <SmartToy />
                    </div>
                  )}

                  <div className="message-content">

                    <div className="message-bubble">
                      {msg.text}
                    </div>

                    <span className="message-time">
                      {msg.sender === "bot"
                        ? "دستیار کتاب"
                        : "شما"}
                    </span>

                  </div>

                  {msg.sender === "user" && (
                    <div className="message-avatar user-avatar">
                      <Person />
                    </div>
                  )}

                </div>

              ))}

              <div ref={messagesEndRef}></div>

            </div>


            {/* QUICK QUESTIONS */}

            <div className="quick-area">

              <div className="quick-title">
                <AutoAwesome />
                سوالات پیشنهادی
              </div>

              <div className="quick-list">

                {quickQuestions.map((question) => (

                  <button
                    key={question.text}
                    onClick={() =>
                      setMessage(question.text)
                    }
                    className="quick-button"
                  >
                    {question.icon}
                    {question.text}
                  </button>

                ))}

              </div>

            </div>


            {/* INPUT */}

            <div className="input-area">

              <div className="input-wrapper">

                <textarea
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  onKeyDown={(e) => {

                    if (
                      e.key === "Enter" &&
                      !e.shiftKey
                    ) {
                      e.preventDefault();
                      sendMessage();
                    }

                  }}
                  placeholder="مثلاً: یک کتاب معمایی پیشنهاد بده..."
                  rows="1"
                />

                <button
                  className="send-button"
                  onClick={sendMessage}
                  disabled={!message.trim()}
                >
                  <Send />
                </button>

              </div>

              <p className="input-hint">
                برای ارسال پیام Enter را بزنید
              </p>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
};

export default MainChatbot;