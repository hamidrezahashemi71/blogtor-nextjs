import Link from "next/link";
import {useSelector} from "react-redux";
import {selectUser} from "../State/Slices/CurrentUserSlice";

const Navbar = () => {
  const navigation = [
    {name: "Home", to: "/", current: true},
    {name: "Blogs", to: "/Blogs", current: false},
    {name: "Writers", to: "/Writers", current: false},
    {name: "About", to: "/About", current: false},
    {name: "Contact", to: "/Contact", current: false},
  ];

  const currentUser = useSelector(selectUser);
  console.log(currentUser);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className='navContainer'>
      <h1 className='logo'>Blogtor</h1>
      <div className='navItemsContainer'>
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.to}
            className={classNames(
              item.current
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "px-3 py-2 rounded-md text-sm font-medium"
            )}
            aria-current={item.current ? "page" : undefined}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
