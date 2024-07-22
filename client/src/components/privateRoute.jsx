import { observer } from "mobx-react-lite";
import userStore from "../store/userStore";
import { Loading } from "./Loading";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  if (userStore.isLoading) {
    return <Loading />;
  }
  if (userStore.isAuth) {
    return <>{props.children}</>;
  } else {
    <Navigate to="/auth" />;
  }
};

export default observer(PrivateRoute);
