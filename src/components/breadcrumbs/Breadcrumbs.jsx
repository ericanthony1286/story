import { useRouter } from "next/router";
import React from "react";

const Breadcrumbs = () => {
  const router = useRouter();
  const pathSnippets = router.pathname.split("/").filter((i) => i);
  return <div>Breadcrumbs</div>;
};

export default Breadcrumbs;
