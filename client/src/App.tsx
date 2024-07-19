import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SingIn } from "./pages/SingIn";
import userStore from "./store/userStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import PaintBoard from "./pages/PaintBoard";
import { SingUp } from "./pages/SingUp";
import { Header } from "./pages/Header";
import { Loading } from "./components/Loading";

function App() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      userStore.checkAuth();
    }
  }, []);
  if (userStore.isLoading) {
    return <Loading />;
  }
  return (
    <div className="app">
      {userStore.isAuth ? <Header /> : null}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              userStore.isAuth ? (
                <>HELLO I AM HOME PAGE</>
              ) : (
                <Navigate to={`/auth`} replace={false} />
              )
            }
          />
          <Route
            path="/auth"
            element={
              !userStore.isAuth ? (
                <SingIn />
              ) : (
                <Navigate to={`/`} replace={false} />
              )
            }
          ></Route>
          <Route
            path="/registration"
            element={
              !userStore.isAuth ? (
                <SingUp />
              ) : (
                <Navigate to={`/`} replace={false} />
              )
            }
          ></Route>
          <Route
            path="/print/:id"
            element={userStore.isAuth ? <PaintBoard /> : null}
          ></Route>
        </Routes>{" "}
      </BrowserRouter>
    </div>
  );
}

export default observer(App);
