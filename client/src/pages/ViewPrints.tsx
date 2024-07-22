import { useEffect } from "react";
import userStore from "../store/userStore";
import UserService from "../services/UserService";

export const ViewPrints = () => {
  async function getUsers() {
    try {
      let response = await UserService.getUsers();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    let timer = setTimeout(() => {
      getUsers();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (userStore.user.isActivated) {
    return <>test</>;
  }

  return <>User not activated</>;
};
