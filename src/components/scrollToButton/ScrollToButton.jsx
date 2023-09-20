import { KeyboardDoubleArrowUp } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

const ScrollToButton = () => {
  const [scrollOver, setScrollOver] = useState(false);

  useEffect(() => {
    // 👇️ scroll to top on page load
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setScrollOver(true);
      } else {
        setScrollOver(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {scrollOver && (
        <button
          className="btn"
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          <KeyboardDoubleArrowUp  color="secondary" />
        </button>
      )}
    </>
  );
};

export default ScrollToButton;
