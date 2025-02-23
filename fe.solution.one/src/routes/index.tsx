import { BrowserRouter, Routes, Route } from "react-router";

import Home from "src/pages/Home";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/address/:id/edit" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
