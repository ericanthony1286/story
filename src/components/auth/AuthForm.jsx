import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { FormInputField } from "../form";
import css from "../shared/header/Header.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { authApi } from "@/api-client";
import { toast } from "react-toastify";
import { AppContext, useAuth } from "@/hooks";
const AuthForm = ({ isSignUp, setOpen, setIsSignUp }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { login } = useAuth();
  const loginSchema = yup
    .object()
    .shape({
      username: yup.string().required("* Vui lòng nhập tên tài khoản của bạn"),

      password: yup.string().required("* Vui lòng nhập mật khẩu"),
    })
    .required();

  const registerSchema = yup
    .object()
    .shape({
      username: yup
        .string()
        .required("* Vui lòng nhập tên tài khoản của bạn")
        .min(6, "* Tên đăng nhập tối thiểu 4 ký tự"),
      email: yup
        .string()
        .required("* Vui lòng điền địa chỉ email")
        .email("Vui lòng điền địa chỉ email hợp lệ"),

      password: yup
        .string()
        .required("* Vui lòng nhập mật khẩu")
        .min(4, "* Mật khẩu tối thiểu 4 ký tự"),
      confirmPassword: yup
        .string()
        .required("* Vui lòng nhập mật khẩu xác nhận")
        .oneOf([yup.ref("password")], "* Chưa trùng khớp với mật khẩu trên"),
    })
    .required();
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      username: "",
      email: isSignUp ? "" : null,
      password: "",
      confirmPassword: isSignUp ? "" : null,
    },
    resolver: yupResolver(isSignUp ? registerSchema : loginSchema),
  });

  const handleLoginSubmit = async (payload) => {
    if (isSignUp) {
      setIsLoading(true);
      try {
        const response = await authApi.register(payload);
        setOpen(false);
        setIsSignUp(false);
        toast.success("Bạn đã đăng ký thành công!");
      } catch (err) {
        setErrMsg(err?.response?.data?.error?.message);
        setValue("password", "");
        setValue("confirmPassword", "");
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        await login(payload);
        setOpen(false);
        setIsSignUp(false);
      } catch (err) {
        setErrMsg(err?.response?.data?.error?.message);
        setValue("password", "");
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleLoginSubmit)}
      className={css["input__field"]}
    >
      {Boolean(errMsg) && (
        <Box mb={1}>
          <Typography sx={{ color: "red" }}>{errMsg}</Typography>
        </Box>
      )}
      <Box
        sx={{
          fontWeight: "bold",
          marginBottom: "15px",
        }}
      >
        <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
          Tên đăng nhập
        </Typography>
        <FormInputField
          placeholder="Tên đăng nhập"
          name="username"
          control={control}
          type="text"
        />
      </Box>

      {isSignUp && (
        <Box
          sx={{
            fontWeight: "bold",
            marginBottom: "15px",
          }}
        >
          <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
            Email
          </Typography>
          <FormInputField
            placeholder="Email"
            type="email"
            name="email"
            control={control}
          />
        </Box>
      )}
      <Box
        sx={{
          fontWeight: "bold",
          marginBottom: "15px",
        }}
      >
        <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
          Mật khẩu
        </Typography>
        <FormInputField
          placeholder="******"
          type="password"
          name="password"
          control={control}
        />
      </Box>

      {isSignUp && (
        <Box
          sx={{
            fontWeight: "bold",
            marginBottom: "15px",
          }}
        >
          <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
            Nhập lại mật khẩu
          </Typography>
          <FormInputField
            placeholder="******"
            type="password"
            name="confirmPassword"
            control={control}
          />
        </Box>
      )}
      {isSignUp ? (
        <Button
          disabled={isLoading}
          startIcon={
            isLoading ? <CircularProgress color="inherit" size="1em" /> : null
          }
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, borderRadius: "20px" }}
        >
          Đăng ký
        </Button>
      ) : (
        <Button
          disabled={isLoading}
          startIcon={
            isLoading ? <CircularProgress color="inherit" size="1em" /> : null
          }
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, borderRadius: "20px" }}
        >
          Đăng nhập
        </Button>
      )}
    </Box>
  );
};

export default AuthForm;
