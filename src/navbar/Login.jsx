import { useState } from "react";

import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Divider,
  Link,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import CloseIcon from "@mui/icons-material/Close";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import logo from "../image/logo.png";
import { Margin } from "@mui/icons-material";

export default function Login() {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box>
      <Button className="bg-light"
        onClick={() => setOpen(true)}
        sx={{
          color: "#7C3AED",
          px: 4,
          py: 1.3,
        
        }}
      >
        <PermIdentityIcon/>
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backdropFilter: "blur(8px)",
              backgroundColor: "rgba(0,0,0,.65)",
            },
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              width: {
                xs: "90%",
                sm: 430,
              },
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              borderRadius: 6,
              p: 5,
              color: "#fff",

              background: "rgba(255,255,255,.08)",

              backdropFilter: "blur(20px)",

              border: "1px solid rgba(255,255,255,.15)",

              boxShadow:
                "0 25px 60px rgba(0,0,0,.5)",
            }}
          >
            <IconButton
              onClick={() => setOpen(false)}
              sx={{
                position: "absolute",
                left: 16,
                top: 15,
                color: "#fff",
              }}
            >
              <CloseIcon />
            </IconButton>

            <Stack
              spacing={2}
              alignItems="center"
              mb={4}
            >
              <Box
                sx={{
                  width: 70,
                  height: 70,
                    textAlign:"center",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
              <img src={logo} alt="" width={140} />
            
       
              </Box>

            

            </Stack>

            <Stack spacing={3}>
              <TextField
                fullWidth
                label="نام کاربری"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon
                        sx={{
                          color: "#B388FF",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyle}
              />

              <TextField
                fullWidth
                label="رمز عبور"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <LockIcon
                        sx={{
                          color: "#9c8abb",
                        }}
                      />
                    </InputAdornment>
                  ),

                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                      >
                        {showPassword ? (
                          <VisibilityOff
                            sx={{
                              color: "#fff",
                            }}
                          />
                        ) : (
                          <Visibility
                            sx={{
                              color: "#fff",
                            }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyle}
              />

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: "#b791f7",
                      }}
                    />
                  }
                  label="ذخیره رمز عبور"
                />

             
              </Stack>

              <Button
                fullWidth
                size="large"
                sx={{
                  py: 1.5,
                  color: "#fff",
                  borderRadius: 4,

                  fontSize: 18,

                  textTransform: "none",

                  background:
                    "linear-gradient(45deg,#7C3AED,#2563EB)",

                  transition: ".3s",

                  "&:hover": {
                    transform:
                      "translateY(-3px)",

                    background:
                      "linear-gradient(45deg,#6D28D9,#1D4ED8)",

                    boxShadow:
                      "0 15px 35px rgba(124,58,237,.45)",
                  },
                }}
              >
                ورود
              </Button>

              <p>حساب کاربری نداری ؟  <a href="" className="text-decoration-none text-info">ثبت نام</a></p>
             

              <Divider
                sx={{
                  color:
                    "rgba(255,255,255,.5)",

                  "&::before,&::after": {
                    borderColor:
                      "rgba(255,255,255,.2)",
                  },
                }}
              >
                یا
              </Divider>

              <Button
                fullWidth
                startIcon={<GoogleIcon   className="ms-2"/>}
                variant="outlined"
                sx={socialButton}
               
              >
                  ادامه با گوگل    
              </Button>

          

           
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",

    borderRadius: 3,

    background:
      "rgba(255, 255, 255, 0.06)",

    "& fieldset": {
      borderColor:
        "rgba(255,255,255,.2)",
    },

    "&:hover fieldset": {
      borderColor: "#3d1d74",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#ffffff",
      borderWidth: 2,
    },
  },

  "& .MuiInputLabel-root": {
    color: "#d4d4d4",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#fceeff",
  },
};

const socialButton = {
  color: "#fff",

  py: 1.4,

  borderRadius: 3,

  textTransform: "none",

  borderColor:
    "rgba(255,255,255,.2)",

  background:
    "rgba(255,255,255,.05)",

  "&:hover": {
    borderColor: "#7C3AED",

 
  },
};