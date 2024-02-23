import React from "react";
import { Route, Routes } from "react-router-dom";
import BlogPost from "./blogposts/BlogPost";
import EditBlogPost from "./blogposts/EditBlogPost";
import NewBlogPost from "./blogposts/NewBlogPost";
import NavBar from "./common/NavBar";
import Home from "./Home";
import Login from "./Login";
import NotFound from "./NotFound";
import Registration from "./Registration";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="posts">
            <Route path="new" element={<NewBlogPost />} />
            <Route path=":postId">
              <Route index element={<BlogPost />} />
              <Route path="edit" element={<EditBlogPost />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
