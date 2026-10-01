import React, { useState, useRef, useEffect } from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Fab,
  Fade,
  Chip,
  Divider,
} from "@mui/material";

import {
  SmartToy,
  Close,
  Send,
  AutoAwesome,
  Person,
} from "@mui/icons-material";

import books from "./books";


// =========================
// ترجمه متن
// =========================

const translateToPersian = async (text) => {
  try {
    if (!text) return "";

    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=en|fa`
    );

    const data = await response.json();

    return data.responseData.translatedText || text;
  } catch (error) {
    console.log("Translation error:", error);
    return text;
  }
};


// =========================
// CHATBOT
// =========================

const BookChatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "سلام! 👋 من دستیار هوشمند کتابخانه هستم.",
    },
    {
      id: 2,
      sender: "bot",
      text:
        "می‌تونم کتاب معرفی کنم، خلاصه کتاب بدم و بر اساس سلیقه‌ات پیشنهاد بدم. 📚",
    },
  ]);

  const messagesEndRef = useRef(null);


  // =========================
  // AUTO SCROLL
  // =========================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);


  // =========================
  // NORMALIZE
  // =========================

  const normalize = (text) => {
    return text
      .toLowerCase()
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .trim();
  };


  // =========================
  // FIND BOOK
  // =========================

  const findBook = (text) => {
    const normalizedText = normalize(text);

    return books.find((book) =>
      normalizedText.includes(
        normalize(book.title)
      )
    );
  };


  // =========================
  // RECOMMEND BOOK
  // =========================

  const recommendBooks = (text) => {
    const normalizedText = normalize(text);

    let selectedGenres = [];
    let selectedMoods = [];

    if (
      normalizedText.includes("روان") ||
      normalizedText.includes("ذهن")
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

        book.genres.forEach((genre) => {
          if (selectedGenres.includes(genre)) {
            score += 3;
          }
        });

        book.mood.forEach((mood) => {
          if (selectedMoods.includes(mood)) {
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
      results = books.slice(0, 3);
    }

    return results.slice(0, 3);
  };


  // =========================
  // BOT RESPONSE
  // =========================

  const getBotResponse = (question) => {
    const text = normalize(question);
    const book = findBook(text);


    // سلام

    if (
      text.includes("سلام") ||
      text.includes("درود") ||
      text.includes("hello")
    ) {
      return "سلام! 👋 خوش اومدی. دوست داری چه کتابی بخونی؟";
    }


    // خلاصه

    if (
      text.includes("خلاصه") ||
      text.includes("داستان") ||
      text.includes("درباره")
    ) {
      if (book) {
        return (
          `📖 ${book.title}\n\n` +
          `نویسنده: ${book.author}\n\n` +
          `${book.summary}`
        );
      }

      return (
        "حتماً 📚 اسم کتاب رو هم بگو تا خلاصه‌اش رو برات نمایش بدم.\n\n" +
        "مثلاً:\n" +
        "«خلاصه 1984 رو بگو»"
      );
    }


    // نویسنده

    if (
      text.includes("نویسنده") ||
      text.includes("نویسنده‌ش")
    ) {
      if (book) {
        return `✍️ نویسنده کتاب «${book.title}»، ${book.author} است.`;
      }

      return "اسم کتاب رو بگو تا نویسنده‌اش رو بهت بگم. 📚";
    }


    // پیشنهاد

    if (
      text.includes("پیشنهاد") ||
      text.includes("معرفی") ||
      text.includes("چه کتابی") ||
      text.includes("کتاب خوب") ||
      text.includes("کتاب مناسب")
    ) {
      const recommendations =
        recommendBooks(text);

      let response =
        "✨ چند کتاب که ممکنه دوست داشته باشی:\n\n";

      recommendations.forEach((book, index) => {
        response +=
          `${index + 1}. ${book.title}\n` +
          `✍️ ${book.author}\n` +
          `💡 ${book.description}\n\n`;
      });

      return response;
    }


    // ژانرها

    if (
      text.includes("روانشناسی") ||
      text.includes("روان")
    ) {
      return (
        "🧠 اگر به کتاب‌های روانشناختی علاقه داری، " +
        "«جنایت و مکافات» انتخاب جالبی است چون روی " +
        "ذهن و کشمکش‌های درونی شخصیت اصلی تمرکز دارد."
      );
    }


    if (
      text.includes("معمایی") ||
      text.includes("جنایی")
    ) {
      return (
        "🔎 اگر دنبال کتاب معمایی و جنایی هستی، " +
        "«دختری در قطار» می‌تونه انتخاب خوبی باشه."
      );
    }


    if (text.includes("فلسفی")) {
      return (
        "🧠 برای شروع فلسفه از مسیر داستان، " +
        "«بیگانه»، «کیمیاگر» و «شازده کوچولو» گزینه‌های خوبی هستند."
      );
    }


    if (text.includes("فانتزی")) {
      return (
        "✨ اگر دنیای فانتزی و جادویی دوست داری، " +
        "«هری پاتر» انتخاب مناسبیه."
      );
    }


    // اطلاعات کتاب

    if (book) {
      return (
        `📚 ${book.title}\n\n` +
        `نویسنده: ${book.author}\n` +
        `ژانر: ${book.genres.join("، ")}\n` +
        `حجم: ${book.length}\n\n` +
        `${book.description}`
      );
    }


    // DEFAULT

    return (
      "🤔 می‌تونم در چند زمینه کمکت کنم:\n\n" +
      "📖 خلاصه کتاب\n" +
      "✍️ اطلاعات نویسنده\n" +
      "✨ پیشنهاد کتاب\n" +
      "🧠 کتاب‌های فلسفی و روانشناسی\n" +
      "🔎 کتاب‌های جنایی و معمایی\n" +
      "🪄 کتاب‌های فانتزی\n\n" +
      "مثلاً بنویس:\n" +
      "«من کتاب‌های معمایی دوست دارم، چی پیشنهاد می‌کنی؟»"
    );
  };


  // =========================
  // SEND MESSAGE
  // =========================

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
      const response =
        getBotResponse(userText);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: response,
        },
      ]);
    }, 500);
  };


  // =========================
  // ENTER
  // =========================

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      sendMessage();
    }
  };


  // =========================
  // QUICK QUESTIONS
  // =========================

  const quickQuestions = [
    "یک کتاب پیشنهاد بده",
    "یک کتاب معمایی معرفی کن",
    "یک کتاب فلسفی معرفی کن",
    "خلاصه 1984 رو بگو",
  ];


  return (
    <>
      {/* =========================
          FLOAT BUTTON
      ========================= */}

      {!open && (
        <Fade in={!open}>
          <Fab
            onClick={() => setOpen(true)}
            sx={{
              position: "fixed",

              bottom: {
                xs: 14,
                sm: 20,
                md: 25,
              },

              right: {
                xs: 14,
                sm: 20,
                md: 25,
              },

              width: {
                xs: 50,
                sm: 58,
                md: 62,
              },

              height: {
                xs: 50,
                sm: 58,
                md: 62,
              },

              minHeight: 0,

              zIndex: 9999,

              background:
                "linear-gradient(135deg,#7c3aed,#a855f7)",

              color: "#fff",

              boxShadow:
                "0 8px 25px rgba(124,58,237,.35)",

              "&:hover": {
                background:
                  "linear-gradient(135deg,#6d28d9,#9333ea)",
              },
            }}
          >
            <SmartToy
              sx={{
                fontSize: {
                  xs: 24,
                  sm: 28,
                  md: 30,
                },
              }}
            />
          </Fab>
        </Fade>
      )}


      {/* =========================
          CHAT WINDOW
      ========================= */}

      {open && (
        <Fade in={open}>
          <Paper
            elevation={0}
            sx={{
              position: "fixed",

              zIndex: 9999,

              display: "flex",
              flexDirection: "column",

              overflow: "hidden",

              direction: "rtl",

              background:
                "linear-gradient(145deg,#1e1b4b,#0f172a)",

              backdropFilter: "blur(20px)",

              border:
                "1px solid rgba(255,255,255,.12)",

              boxShadow:
                "0 25px 70px rgba(0,0,0,.45)",


              // =========================
              // MOBILE
              // =========================

              width: {
                xs: "100vw",
                sm: 390,
              },

              height: {
                xs: "100dvh",
                sm: 620,
              },

              maxWidth: "100vw",
              maxHeight: "100dvh",

              top: {
                xs: 0,
                sm: "auto",
              },

              bottom: {
                xs: 0,
                sm: 25,
              },

              left: {
                xs: 0,
                sm: "auto",
              },

              right: {
                xs: 0,
                sm: 25,
              },

              borderRadius: {
                xs: 0,
                sm: "24px",
              },
            }}
          >

            {/* =========================
                HEADER
            ========================= */}

            <Box
              sx={{
                p: {
                  xs: 1.5,
                  sm: 2,
                },

                display: "flex",
                alignItems: "center",

                gap: {
                  xs: 1,
                  sm: 1.5,
                },

                flexShrink: 0,

                background:
                  "linear-gradient(135deg,rgba(124,58,237,.45),rgba(168,85,247,.2))",
              }}
            >

              <Avatar
                sx={{
                  width: {
                    xs: 38,
                    sm: 44,
                  },

                  height: {
                    xs: 38,
                    sm: 44,
                  },

                  background:
                    "linear-gradient(135deg,#7c3aed,#c084fc)",
                }}
              >
                <SmartToy
                  sx={{
                    fontSize: {
                      xs: 21,
                      sm: 25,
                    },
                  }}
                />
              </Avatar>


              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                }}
              >

                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 700,

                    fontSize: {
                      xs: 14,
                      sm: 16,
                    },
                  }}
                >
                  دستیار کتاب 📚
                </Typography>


                <Typography
                  sx={{
                    color:
                      "rgba(255,255,255,.65)",

                    fontSize: {
                      xs: 10,
                      sm: 12,
                    },
                  }}
                >
                  پیشنهاددهنده هوشمند کتاب
                </Typography>

              </Box>


              <IconButton
                onClick={() => setOpen(false)}
                sx={{
                  color: "#fff",

                  width: {
                    xs: 38,
                    sm: 42,
                  },

                  height: {
                    xs: 38,
                    sm: 42,
                  },
                }}
              >
                <Close />
              </IconButton>

            </Box>


            {/* =========================
                MESSAGES
            ========================= */}

            <Box
              sx={{
                flex: 1,

                minHeight: 0,

                overflowY: "auto",

                p: {
                  xs: 1.2,
                  sm: 2,
                },

                "&::-webkit-scrollbar": {
                  width: 4,
                },

                "&::-webkit-scrollbar-thumb": {
                  background: "#7c3aed",
                  borderRadius: 10,
                },
              }}
            >

              {messages.map((msg) => (

                <Box
                  key={msg.id}
                  sx={{
                    display: "flex",

                    justifyContent:
                      msg.sender === "user"
                        ? "flex-start"
                        : "flex-end",

                    mb: {
                      xs: 1.2,
                      sm: 1.5,
                    },
                  }}
                >

                  <Box
                    sx={{
                      display: "flex",

                      gap: 0.8,

                      flexDirection:
                        msg.sender === "user"
                          ? "row"
                          : "row-reverse",

                      maxWidth: {
                        xs: "92%",
                        sm: "88%",
                      },
                    }}
                  >

                    <Avatar
                      sx={{
                        width: {
                          xs: 28,
                          sm: 32,
                        },

                        height: {
                          xs: 28,
                          sm: 32,
                        },

                        flexShrink: 0,

                        bgcolor:
                          msg.sender === "user"
                            ? "rgba(255,255,255,.1)"
                            : "#7c3aed",
                      }}
                    >
                      {msg.sender === "user" ? (
                        <Person
                          sx={{
                            fontSize: 17,
                          }}
                        />
                      ) : (
                        <SmartToy
                          sx={{
                            fontSize: 17,
                          }}
                        />
                      )}
                    </Avatar>


                    <Box
                      sx={{
                        px: {
                          xs: 1.3,
                          sm: 1.7,
                        },

                        py: {
                          xs: 1,
                          sm: 1.2,
                        },

                        borderRadius:
                          msg.sender === "user"
                            ? "18px 18px 4px 18px"
                            : "18px 18px 18px 4px",

                        background:
                          msg.sender === "user"
                            ? "linear-gradient(135deg,#7c3aed,#9333ea)"
                            : "rgba(255,255,255,.08)",

                        color: "#fff",

                        whiteSpace: "pre-line",

                        minWidth: 0,
                      }}
                    >

                      <Typography
                        sx={{
                          fontSize: {
                            xs: 12,
                            sm: 13.5,
                          },

                          lineHeight: 1.8,

                          overflowWrap:
                            "anywhere",
                        }}
                      >
                        {msg.text}
                      </Typography>

                    </Box>

                  </Box>

                </Box>

              ))}

              <div ref={messagesEndRef} />

            </Box>


            {/* =========================
                QUICK QUESTIONS
            ========================= */}

            <Box
              sx={{
                px: {
                  xs: 1,
                  sm: 1.5,
                },

                pb: 1,

                display: "flex",

                gap: 0.7,

                overflowX: "auto",

                flexShrink: 0,

                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >

              {quickQuestions.map((question) => (

                <Chip
                  key={question}

                  icon={
                    <AutoAwesome
                      sx={{
                        fontSize: 15,
                      }}
                    />
                  }

                  label={question}

                  onClick={() =>
                    setMessage(question)
                  }

                  sx={{
                    color: "#ddd6fe",

                    borderColor:
                      "rgba(167,139,250,.4)",

                    background:
                      "rgba(124,58,237,.12)",

                    fontSize: {
                      xs: 10,
                      sm: 11,
                    },

                    flexShrink: 0,
                  }}

                  variant="outlined"
                />

              ))}

            </Box>


            <Divider
              sx={{
                borderColor:
                  "rgba(255,255,255,.08)",
              }}
            />


            {/* =========================
                INPUT
            ========================= */}

            <Box
              sx={{
                p: {
                  xs: 1,
                  sm: 1.5,
                },

                display: "flex",

                gap: 0.8,

                alignItems: "center",

                flexShrink: 0,
              }}
            >

              <TextField
                fullWidth

                multiline

                maxRows={3}

                value={message}

                onChange={(e) =>
                  setMessage(e.target.value)
                }

                onKeyDown={handleKeyDown}

                placeholder="درباره یک کتاب بپرس..."

                dir="rtl"

                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "#fff",

                    borderRadius: "16px",

                    background:
                      "rgba(255,255,255,.06)",

                    fontSize: {
                      xs: 12,
                      sm: 14,
                    },

                    "& fieldset": {
                      borderColor:
                        "rgba(255,255,255,.1)",
                    },
                  },

                  "& input::placeholder, & textarea::placeholder":
                    {
                      color:
                        "rgba(255,255,255,.45)",

                      opacity: 1,
                    },
                }}
              />


              <IconButton
                onClick={sendMessage}
                disabled={!message.trim()}
                sx={{
                  width: {
                    xs: 44,
                    sm: 50,
                  },

                  height: {
                    xs: 44,
                    sm: 50,
                  },

                  flexShrink: 0,

                  color: "#fff",

                  background:
                    "linear-gradient(135deg,#7c3aed,#a855f7)",

                  "&:hover": {
                    background:
                      "linear-gradient(135deg,#6d28d9,#9333ea)",
                  },
                }}
              >
                <Send
                  sx={{
                    fontSize: {
                      xs: 19,
                      sm: 22,
                    },
                  }}
                />
              </IconButton>

            </Box>

          </Paper>
        </Fade>
      )}
    </>
  );
};


export default BookChatbot;