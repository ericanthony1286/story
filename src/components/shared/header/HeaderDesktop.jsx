import { Search } from "@mui/icons-material";
import {
  Box,
  Container,
  Stack,
  Link as MuiLink,
  Grid,
  debounce,
  CircularProgress,
  ClickAwayListener,
  Typography,
  Modal,
  Button,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import css from "./Header.module.scss";

// import logo from "@/static/images/logo.svg";
import logoNew from "@/static/images/logo_new.svg";
import sortDown from "@/static/icons/sort-down.svg";
import searchIcon from "@/static/icons/searchIcon.svg";
import hotFire from "@/static/icons/HOT_Fire.svg";
import newTag from "@/static/icons/new_tag.svg";
import updateFull from "@/static/icons/updateFull_icon.svg";
import React, { useContext, useEffect, useState } from "react";
import { AppContext, useCategoryList, useSearchStory } from "@/hooks";
import { FormInputField, InputField } from "@/components/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AuthForm from "@/components/auth/AuthForm";
import UserInfo from "./UserInfo";
export const HeaderDesktop = () => {
  const [keyWords, setKeyWords] = useState("");
  const [isActicve, setIsActicve] = useState(true);
  const { theme, toggleTheme, userData } = useContext(AppContext);

  const [open, setOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsSignUp(false);
  };

  const router = useRouter();

  const { data } = useCategoryList();

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      search: "",
    },
  });

  /////
  useEffect(() => {
    router?.query?.searchText
      ? setValue("search", router?.query?.searchText)
      : setValue("search", "");
    setIsActicve(false);
  }, [router?.query, setValue]);
  const handleSearchChange = (payload) => {
    setKeyWords(payload.search);
    setIsActicve(true);
  };
  const { data: searchData, isLoading } = useSearchStory({
    params: { searchText: keyWords },
  });
  const debounceSearchChange = debounce(handleSubmit(handleSearchChange), 600);
  const submitHandler = (payload) => {
    router.push({ pathname: "/search", query: { searchText: payload.search } });
    setIsActicve(false);
  };

  const switchForm = () => {
    setIsSignUp((prev) => !prev);
  };
  const bgr =
    theme === "light"
      ? css["light__theme"]
      : theme === "dark"
      ? css["dark__theme"]
      : "";
  const style = {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    padding: 2,
    borderRadius: "5px",
  };
  return (
    <Box
      component="header"
      display={{ xs: "none", md: "block" }}
      className={bgr}
    >
      <Container>
        <Stack direction="row" alignItems="center" py={2}>
          <Box className={css.logo}>
            <Link href="/">
              <MuiLink sx={{ "&:hover": { cursor: "pointer" } }}>
                <Image src={logoNew} alt="logo" />
              </MuiLink>
            </Link>
          </Box>
          <Box ml={4}>
            <Stack direction="row" spacing={2}>
              <div className={css.dropdown}>
                <button className={css.btn} id="dropbtn">
                  Danh sách
                  <Image
                    className={css.sort_down}
                    id="dropbtn"
                    src={sortDown}
                    alt="arrow"
                  />
                  <div className={css.dropdown__content} id="myDropdown">
                    <div className={css["dropdown__content-list"]}>
                      <div className={css.link__icon}>
                        <Link href="/list/truyen-moi">Truyện mới cập nhật</Link>
                        <Image src={newTag} alt="" width={28} height={13} />
                      </div>
                      <div className={css.link__icon}>
                        <Link href="/list/truyen-hot">Truyện hot</Link>
                        <Image src={hotFire} alt="" width={10} height={10} />
                      </div>
                      <div className={css.link__icon}>
                        <Link href="/list/truyen-full">Truyện full</Link>
                        <Image src={updateFull} alt="" />
                      </div>
                      <Link href="/list/tien-hiep-hay">Tiên hiệp hay</Link>
                      {/* <Link href="#">Ngôn tình sắc</Link> */}
                      <Link href="/list/ngon-tinh&sung">Ngôn tình sủng</Link>
                    </div>
                    <div className={css["dropdown__content-list"]}>
                      <Link href="/list/ngon-tinh&nguoc">Ngôn tình ngược</Link>
                      <Link href="/list/ngon-tinh&hai-huoc">Ngôn tình hài</Link>
                      <Link href="/list/dam-my&hai-huoc">Đam mỹ hài</Link>
                      <Link href="/list/dam-my-hay">Đam mỹ hay</Link>
                      {/* <Link href="#">Đam mỹ H Văn</Link> */}
                    </div>
                  </div>
                </button>
              </div>

              <div className={css.dropdown}>
                <button className={css.dropbtn} id="dropbtn">
                  Thể loại
                  <Image
                    className={css.sort_down}
                    id="dropbtn"
                    src={sortDown}
                    alt="arrow"
                  />
                  <div className={css.dropdown__content}>
                    <Grid container width="400px">
                      {data?.data?.map((cate) => (
                        <Grid
                          item
                          key={cate.id}
                          md={4}
                          sx={{ textAlign: "initial" }}
                        >
                          <Link href={`/category/${cate.categoryCode}`}>
                            {cate.categoryName}
                          </Link>
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </button>
              </div>

              <div className={css.dropdown}>
                <button className={css.dropbtn} id="dropbtn">
                  Tuỳ chỉnh
                  <Image
                    className={css.sort_down}
                    id="dropbtn"
                    src={sortDown}
                    alt="arrow"
                  />
                  <div className={css.dropdown__content}>
                    <div className={css["dropdown__content-setting"]}>
                      <label>Màu nền</label>
                      <select onChange={toggleTheme}>
                        <option value="light">Xám nhạt</option>
                        <option value="dark">Màu tối</option>
                      </select>
                    </div>
                  </div>
                </button>
              </div>
            </Stack>
          </Box>
          <Box sx={{ position: "relative", marginLeft: "auto" }}>
            <form className={css.form} onSubmit={handleSubmit(submitHandler)}>
              <InputField
                name="search"
                placeholder="Tìm kiếm"
                control={control}
                onChange={(event) => debounceSearchChange()}
              />
              {/* <Search
                sx={{
                  color: "#01a7ff",
                  marginLeft: "auto",
                  ":hover": { cursor: "pointer" },
                }}
                onClick={handleSubmit(submitHandler)}
              /> */}
              <Image
                src={searchIcon}
                alt=""
                onClick={handleSubmit(submitHandler)}
                width={18}
                height={18}
              />
            </form>

            {searchData && isActicve && (
              <ClickAwayListener onClickAway={() => setIsActicve(false)}>
                <div className={css.result}>
                  {isLoading ? (
                    <div className={css.loading}>
                      <CircularProgress
                        style={{ width: "15px", height: "15px", color: "#ccc" }}
                      />
                    </div>
                  ) : searchData?.data?.content?.length > 0 ? (
                    <Stack>
                      {searchData?.data?.content?.slice(0, 5).map((story) => (
                        <Link href={`/story/${story.storyCode}`} key={story.id}>
                          <div className={css.link}>{story.storyName}</div>
                        </Link>
                      ))}
                      {searchData?.data?.content?.length > 5 ? (
                        <Link href={`/search?searchText=${keyWords}`}>
                          <div className={css["link__main"]}>
                            Xem thêm kết quả khác
                            <Search sx={{ marginLeft: "3px" }} />
                          </div>
                        </Link>
                      ) : null}
                    </Stack>
                  ) : (
                    <div style={{ padding: "5px 10px", width: "220px" }}>
                      Không tìm thấy
                    </div>
                  )}
                </div>
              </ClickAwayListener>
            )}
          </Box>
          <Box sx={{ ml: "10px", color: "#fff" }}>
            {Boolean(userData.username) ? (
              <UserInfo userData={userData} />
            ) : (
              <Typography
                onClick={handleOpen}
                sx={{
                  cursor: "pointer",
                  ":hover": { color: "#01a7ff" },
                }}
              >
                Đăng nhập
              </Typography>
            )}

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  marginBottom={4}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                  >
                    {isSignUp ? "Đăng ký" : "Đăng nhập"}
                  </Typography>
                  <CloseIcon
                    onClick={() => setOpen(false)}
                    sx={{
                      fontSize: "16px",
                      fontWeight: "700",
                      opacity: "0.4",
                      cursor: "pointer",
                      "&:hover": { opacity: "1" },
                    }}
                  />
                </Stack>

                <AuthForm
                  isSignUp={isSignUp}
                  setOpen={setOpen}
                  setIsSignUp={setIsSignUp}
                />
                <Box textAlign="center" marginTop={2}>
                  <span>
                    {isSignUp ? (
                      <>
                        Bạn đã có tài khoản?{" "}
                        <span
                          onClick={switchForm}
                          className={css["info__text"]}
                        >{` Đăng nhập`}</span>
                      </>
                    ) : (
                      <>
                        Bạn chưa có tài khoản?
                        <span
                          onClick={switchForm}
                          className={css["info__text"]}
                        >{` Đăng ký`}</span>
                      </>
                    )}
                  </span>
                </Box>
              </Box>
            </Modal>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
