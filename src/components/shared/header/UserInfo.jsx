import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import sortDown from "@/static/icons/sort-down.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import css from "./Header.module.scss";
import { useAuth } from "@/hooks";
const UserInfo = ({ userData }) => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        sx={{ cursor: "pointer", ":hover": { color: "#01a7ff" } }}
        ref={anchorRef}
        onClick={handleToggle}
      >
        <AccountCircleIcon sx={{ marginRight: "5px" }} />
        <Tooltip title={userData.username}>
          <p className={css["user__info"]}>{userData.username}</p>
        </Tooltip>
        <Image
          className={css.sort_down}
          id="dropbtn"
          src={sortDown}
          alt="arrow"
        />
      </Stack>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        //   disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper sx={{ mt: "30px" }}>
              <ClickAwayListener onClickAway={handleClose}>
                <Box sx={{ padding: "10px", width: "10rem" }}>
                  <Stack alignItems="center">
                    <AccountCircleIcon
                      sx={{
                        fontSize: "3rem",
                        color: "gray",
                      }}
                    />
                  </Stack>
                  <h3 style={{ textAlign: "center" }}>{userData.username}</h3>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>
                      <Stack
                        direction="row"
                        gap={0.5}
                        alignItems="center"
                        onClick={logout}
                      >
                        <LogoutIcon
                          sx={{ fontWeight: "bold", fontSize: "1.3rem" }}
                        />
                        <Typography>Đăng xuất</Typography>
                      </Stack>
                    </MenuItem>
                  </MenuList>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default UserInfo;
