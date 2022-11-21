import Cookies from "universal-cookie";

export default function useToken() {
  const token = new Cookies().get("ut");
  return token ? token : null;
}
