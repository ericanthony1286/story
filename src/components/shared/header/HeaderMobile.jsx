import {
  Box,
  Container,
  Stack,
  Link as MuiLink,
  MenuItem,
  Menu,
  Button,
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Divider,
  CircularProgress,
  debounce,
  ClickAwayListener,
  Typography,
  Modal,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  ExpandLess,
  ExpandMore,
  Search,
  StarBorder,
} from "@mui/icons-material";
import sortDown from "@/static/icons/sort-down.svg";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import css from "./Header.module.scss";
import Image from "next/image";
// import logo from "@/static/images/logo.svg";
import logoNew from "@/static/images/logo_new.svg";
import { InputField } from "@/components/form";
import { AppContext, useAuth, useCategoryList, useSearchStory } from "@/hooks";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import AuthForm from "@/components/auth/AuthForm";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const list = [
  { code: "truyen-moi", title: "Truyện mới cập nhật" },
  { code: "truyen-hot", title: "Truyện hot" },
  { code: "truyen-fullt", title: "Truyện full" },
  { code: "tien-hiep-hay", title: "Tiên hiệp hay" },
  { code: "ngon-tinh&sung", title: "Ngôn tình sủng" },
  { code: "ngon-tinh&nguoc", title: "Ngôn tình ngược" },
  { code: "ngon-tinh&hai-huoc", title: "Ngôn tình hài" },
  { code: "dam-my&hai-huoc", title: "Đam mỹ hài" },
  { code: "ngon-tinh&hai-huoc", title: "Đam mỹ hay" },
  { code: "dam-my-hay", title: "Ngôn tình hài" },
];
export const HeaderMobile = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { theme, toggleTheme, userData } = useContext(AppContext);
  const [clickedBtn, setClickedBtn] = useState({
    btn1: false,
    btn2: false,
    btn3: false,
    btn4: false,
  });
  const [keyWords, setKeyWords] = useState("");
  const [isActicve, setIsActicve] = useState(true);

  const [open, setOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const { logout } = useAuth();
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
    width: 350,
    bgcolor: "background.paper",
    boxShadow: 24,
    padding: 2,
    borderRadius: "5px",
  };
  /////
  useEffect(() => {
    router?.query?.searchText
      ? setValue("search", router?.query?.searchText)
      : setValue("search", "");
    setShowMenu(false);
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
  const handleClick = (index) => {
    if (index === "1") {
      setClickedBtn((prev) => ({
        btn1: !prev.btn1,
        btn2: false,
        btn3: false,
        btn4: false,
      }));
    } else if (index === "2") {
      setClickedBtn((prev) => ({
        btn1: false,
        btn2: !prev.btn2,
        btn3: false,
        btn4: false,
      }));
    } else if (index === "3") {
      setClickedBtn((prev) => ({
        btn1: false,
        btn3: !prev.btn3,
        btn2: false,
        btn4: false,
      }));
    } else if (index === "4") {
      setClickedBtn((prev) => ({
        btn1: false,
        btn3: false,
        btn2: false,
        btn4: !prev.btn4,
      }));
    }
  };
  const showMenuHandler = () => {
    setShowMenu((prev) => !prev);
    setClickedBtn({ btn1: false, btn2: false, btn3: false, btn4: false });
  };

  const switchForm = () => {
    setIsSignUp((prev) => !prev);
  };

  const logoutHandler = () => {
    logout();
    setOpen(false);
  };

  return (
    <>
      <Box
        component="header"
        display={{ xs: "block", md: "none" }}
        className={bgr}
      >
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            paddingY={2}
          >
            <Box>
              <Link href="/">
                <Box
                  sx={{
                    display: "flex",

                    "&:hover": { cursor: "pointer" },
                  }}
                  className={css["img__container"]}
                >
                  <Image src={logoNew} alt="logo" />
                </Box>
              </Link>
            </Box>
            <Box>
              <MenuIcon
                sx={{
                  color: "white",
                  ":hover": { cursor: "pointer" },
                  fontSize: "2rem",
                }}
                onClick={showMenuHandler}
              />
            </Box>
          </Stack>
        </Container>
        {showMenu && (
          <Box>
            <Divider sx={{ background: "#fff" }} />
            <Container>
              <List>
                <ListItemButton
                  onClick={() => handleClick("1")}
                  className={css.menu}
                >
                  <span className={css.white}>Danh sách</span>
                  <Image src={sortDown} alt="img" />
                </ListItemButton>
                <Collapse in={clickedBtn.btn1} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {list.map((x, index) => (
                      <ListItemButton sx={{ pl: 4 }} key={index}>
                        <Link href={`/list/${x.code}`}>
                          <span className={css.white}>{x.title}</span>
                        </Link>
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
                <ListItemButton
                  onClick={() => handleClick("2")}
                  className={css.menu}
                >
                  <span className={css.white}> Thể loại</span>

                  <Image src={sortDown} alt="img" />
                </ListItemButton>
                <Collapse in={clickedBtn.btn2} timeout="auto" unmountOnExit>
                  {data?.data.map((cate, index) => (
                    <List key={index} component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} className={css.white}>
                        <Link href={`/category/${cate.categoryCode}`}>
                          <span className={css.white}>{cate.categoryName}</span>
                        </Link>
                      </ListItemButton>
                    </List>
                  ))}
                </Collapse>
                <ListItemButton
                  onClick={() => handleClick("3")}
                  className={css.menu}
                >
                  <span className={css.white}> Tùy chỉnh</span>

                  <Image src={sortDown} alt="img" />
                </ListItemButton>
                <Collapse in={clickedBtn.btn3} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} className={css.white}>
                      <div className={css["dropdown__content-setting"]}>
                        <label>Màu nền</label>
                        <select onChange={toggleTheme}>
                          <option value="light">Xám nhạt</option>
                          <option value="dark">Màu tối</option>
                        </select>
                      </div>
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
            </Container>
            <Divider sx={{ background: "#fff", marginBottom: "0.5rem" }} />
            <Container>
              <Box sx={{ position: "relative", marginLeft: "auto" }}>
                <form
                  className={css["form__mobile"]}
                  onSubmit={handleSubmit(submitHandler)}
                >
                  <InputField
                    name="search"
                    placeholder="Tìm kiếm"
                    control={control}
                    onChange={(event) => debounceSearchChange()}
                    // onBlur={() => setIsActicve(false)}
                  />
                  <Search
                    sx={{
                      color: "#01a7ff",
                      marginLeft: "auto",
                      ":hover": { cursor: "pointer" },
                    }}
                    onClick={handleSubmit(submitHandler)}
                  />
                </form>

                {searchData && isActicve && (
                  <ClickAwayListener onClickAway={() => setIsActicve(false)}>
                    <div className={css.result}>
                      {isLoading ? (
                        <div className={css.loading}>
                          <CircularProgress
                            style={{
                              width: "15px",
                              height: "15px",
                              color: "#ccc",
                            }}
                          />
                        </div>
                      ) : searchData?.data?.content?.length > 0 ? (
                        <Stack>
                          {searchData?.data?.content
                            ?.slice(0, 5)
                            .map((story) => (
                              <Link
                                href={`/story/${story.storyCode}`}
                                key={story.id}
                              >
                                <div className={css.link}>
                                  {story.storyName}
                                </div>
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
                        <div
                          style={{
                            padding: "5px 10px",
                            width: "220px",
                            fontSize: "14px",
                          }}
                        >
                          Không tìm thấy
                        </div>
                      )}
                    </div>
                  </ClickAwayListener>
                )}
              </Box>
            </Container>
            <Divider
              sx={{
                background: "#fff",
                marginBottom: "0.5rem",
                marginTop: "0.75rem",
              }}
            />
            <Container>
              {Boolean(userData.username) ? (
                <Box>
                  <List>
                    <ListItemButton onClick={() => handleClick("4")}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                          cursor: "pointer",
                          ":hover": { color: "#01a7ff" },
                        }}
                        className={css.white}
                      >
                        <AccountCircleIcon sx={{ marginRight: "5px" }} />

                        <p
                          style={{
                            marginRight: "5px",
                          }}
                        >
                          {userData.username}
                        </p>

                        <Image
                          className={css.sort_down}
                          id="dropbtn"
                          src={sortDown}
                          alt="arrow"
                        />
                      </Stack>
                    </ListItemButton>
                    <Collapse in={clickedBtn.btn4} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton
                          sx={{ ml: 2.5 }}
                          className={css.white}
                          onClick={logoutHandler}
                        >
                          <Stack direction="row" gap={0.5} alignItems="center">
                            <LogoutIcon
                              sx={{
                                fontWeight: "bold",
                                fontSize: "1.3rem",
                              }}
                            />
                            <Typography>Đăng xuất</Typography>
                          </Stack>
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </List>
                </Box>
              ) : (
                <Box
                  sx={{
                    marginLeft: "1rem",
                    marginBottom: "1rem",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    onClick={handleOpen}
                    sx={{
                      color: "#fff",
                      ":hover": { color: "#01a7ff" },
                    }}
                  >
                    Đăng nhập
                  </Typography>
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

                      <AuthForm isSignUp={isSignUp} />
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
              )}
            </Container>
          </Box>
        )}
      </Box>
    </>
  );
};
