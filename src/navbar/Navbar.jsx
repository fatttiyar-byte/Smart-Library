import * as React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import AppsIcon from "@mui/icons-material/Apps";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";

import logo from "../image/logo.png";
import SearchBar from "./Searchbar";
import Login from "./Login";

import { Link } from "react-router-dom";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  // =========================
  // تعداد علاقه‌مندی و سبد خرید
  // =========================

  const [cartCount, setCartCount] = React.useState(0);

  const [favoriteCount, setFavoriteCount] =
    React.useState(0);

  // =========================
  // آپدیت تعداد
  // =========================

  const updateCounts = () => {
    try {
      const cart =
        JSON.parse(
          localStorage.getItem("cart")
        ) || [];

      const favorites =
        JSON.parse(
          localStorage.getItem("favorites")
        ) || [];

      setCartCount(cart.length);

      setFavoriteCount(
        favorites.length
      );
    } catch (error) {
      console.error(
        "Count Error:",
        error
      );

      setCartCount(0);
      setFavoriteCount(0);
    }
  };

  // =========================
  // دریافت اولیه
  // =========================

  React.useEffect(() => {
    updateCounts();

    window.addEventListener(
      "storage",
      updateCounts
    );

    return () => {
      window.removeEventListener(
        "storage",
        updateCounts
      );
    };
  }, []);

  // =========================
  // هنگام باز شدن منو
  // =========================

  React.useEffect(() => {
    if (open) {
      updateCounts();
    }
  }, [open]);

  // =========================
  // Drawer
  // =========================

  const toggleDrawer =
    (newOpen) => () => {
      setOpen(newOpen);
    };

  // =========================
  // Badge تعداد
  // =========================

  const CountBadge = ({ count }) => {
    if (count === 0) return null;

    return (
      <Box
        sx={{
          position: "absolute",

          // بالای آیکون
          left: {
            xs: 30,
            sm: 32,
          },

          top: 5,

          width: 19,
          height: 19,

          borderRadius: "50%",

          backgroundColor:
            "#C084FC",

          color: "#fff",

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          fontSize: "10px",

          fontWeight: "bold",

          fontFamily: "vazir",

          boxShadow:
            "0 2px 7px rgba(124,58,237,.25)",

          zIndex: 10,
        }}
      >
        {count > 99 ? "99+" : count}
      </Box>
    );
  };

  // =========================
  // منوی اصلی
  // =========================

  const menuItems = [
    {
      text: "خانه",
      path: "/",
      icon: (
        <HomeOutlinedIcon
          sx={{
            color: "#7C3AED",
          }}
        />
      ),
    },

    {
      text: "کتاب‌ها",
      path: "/books",
      icon: (
        <AutoStoriesOutlinedIcon
          sx={{
            color: "#7C3AED",
          }}
        />
      ),
    },

    {
      text: "دسته‌بندی‌ها",
      path: "/category",
      icon: (
        <CategoryOutlinedIcon
          sx={{
            color: "#7C3AED",
          }}
        />
      ),
    },

    {
      text: "کتابدار هوشمند",
      path: "/chatbot",
      icon: (
        <SmartToyOutlinedIcon
          sx={{
            color: "#7C3AED",
          }}
        />
      ),
    },
  ];

  // =========================
  // منوی دوم
  // =========================

  const otherItems = [
    {
      text: "علاقه‌مندی‌ها",
      path: "/favorites",

      icon: (
        <FavoriteBorderOutlinedIcon
          sx={{
            color: "#7C3AED",
          }}
        />
      ),

      count: favoriteCount,
    },

    {
      text: "سبد خرید",
      path: "/cardshop",

      icon: (
        <ShoppingCartOutlinedIcon
          sx={{
            color: "#7C3AED",
          }}
        />
      ),

      count: cartCount,
    },

    {
      text: "تماس با ما",

      icon: (
        <ContactSupportOutlinedIcon
          sx={{
            color: "#7C3AED",
          }}
        />
      ),
    },
  ];

  // =========================
  // Drawer List
  // =========================

  const DrawerList = (
    <Box
      sx={{
        width: {
          xs: 230,
          sm: 250,
        },
      }}
      role="presentation"
    >
      {/* =========================
          منوی اصلی
      ========================= */}

      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
          >
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={toggleDrawer(false)}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontFamily:
                      "vazir",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* =========================
          منوی دوم
      ========================= */}

      <List>
        {otherItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
          >
            {item.path ? (
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={toggleDrawer(false)}
                sx={{
                  position:
                    "relative",
                }}
              >
                {/* آیکون */}

                <ListItemIcon
                  sx={{
                    position:
                      "relative",
                  }}
                >
                  {item.icon}

                  {/* Badge */}

                  {item.count !==
                    undefined && (
                    <CountBadge
                      count={
                        item.count
                      }
                    />
                  )}
                </ListItemIcon>

                {/* متن */}

                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontFamily:
                        "vazir",
                    },
                  }}
                />
              </ListItemButton>
            ) : (
              <ListItemButton
                onClick={toggleDrawer(false)}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontFamily:
                        "vazir",
                    },
                  }}
                />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // =========================
  // JSX
  // =========================

  return (
    <Box
      sx={{
        width: "100%",

        height: {
          xs: 65,
          sm: 75,
          md: 85,
        },
      }}
    >
      {/* =========================
          NAVBAR
      ========================= */}

      <Box
        component="nav"
        sx={{
          position: "fixed",

          top: 0,
          left: 0,

          width: "100%",

          height: {
            xs: 65,
            sm: 75,
            md: 85,
          },

          zIndex: 1200,

          backgroundColor:
            "#fff",

          boxShadow:
            "0 2px 15px rgba(0,0,0,0.08)",

          display: "flex",

          alignItems: "center",

          px: {
            xs: 1,
            sm: 2,
            md: 3,
          },

          boxSizing:
            "border-box",

          fontFamily:
            "vazir",
        }}
      >
        {/* =========================
            لوگو
        ========================= */}

        <Box
          sx={{
            display: "flex",

            alignItems:
              "center",

            flexShrink: 0,

            mr: {
              xs: 0.5,
              sm: 1,
              md: 2,
            },
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: {
                xs: 85,
                sm: 125,
                md: 180,
              },

              height: "auto",

              display: "block",
            }}
          />
        </Box>

        {/* =========================
            فضای خالی
        ========================= */}

        <Box
          sx={{
            flexGrow: 1,
          }}
        />

        {/* =========================
            سه دکمه
        ========================= */}

        <Box
          sx={{
            display: "flex",

            alignItems:
              "center",

            flexShrink: 0,

            gap: 0,

            "& > *": {
              marginLeft:
                "0 !important",

              marginRight:
                "0 !important",
            },
          }}
        >
          {/* =========================
              ورود
          ========================= */}

          <Box
            sx={{
              display: "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              flexShrink: 0,

              width: {
                xs: 45,
                sm: 55,
                md: 70,
              },

              height: {
                xs: 45,
                sm: 55,
                md: 65,
              },
            }}
          >
            <Login
              sx={{
                color:
                  "#7C3AED",
              }}
            />
          </Box>

          {/* =========================
              سرچ
          ========================= */}

          <Box
            sx={{
              display: "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              flexShrink: 0,

              width: {
                xs: 45,
                sm: 55,
                md: 70,
              },

              height: {
                xs: 45,
                sm: 55,
                md: 65,
              },

              overflow:
                "hidden",
            }}
          >
            <SearchBar />
          </Box>

          {/* =========================
              منو
          ========================= */}

          <Button
            onClick={toggleDrawer(
              true
            )}
            sx={{
              minWidth:
                "auto",

              width: {
                xs: 45,
                sm: 55,
                md: 70,
              },

              height: {
                xs: 45,
                sm: 55,
                md: 65,
              },

              p: 0,

              flexShrink: 0,

              borderRadius: 0,

              "&:hover": {
                backgroundColor:
                  "#F3E8FF",
              },
            }}
          >
            <AppsIcon
              sx={{
                color:
                  "#7C3AED",

                fontSize: {
                  xs: 25,
                  sm: 29,
                  md: 32,
                },
              }}
            />
          </Button>
        </Box>

        {/* =========================
            Drawer
        ========================= */}

        <Drawer
          anchor="left"
          open={open}
          onClose={toggleDrawer(
            false
          )}
        >
          {DrawerList}
        </Drawer>
      </Box>
    </Box>
  );
}