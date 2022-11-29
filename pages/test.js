import Cookies from "universal-cookie";
// import {useSelector, useDispatch} from "react-redux";
// import {selectNumber} from "../State/Slices/NumberSlice";
// import {setAddNumber} from "../State/Slices/NumberSlice";
// import {useState} from "react";

const cookies = new Cookies();

// REGISTER
export function Test() {
  // const [num, setNum] = useState(0);
  // const number = useSelector(selectNumber);
  // const dispatch = useDispatch();
  async function clickMe() {
    const res = await fetch("http://localhost:4000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "hamidjoon",
        name: "hamid",
      }),
    }).then((res) => res);
    const data = await res.json();
    // console.log(data);
  }

  // const myFunc = () => {
  //   dispatch(setAddNumber(num));
  // };

  return (
    <div>
      <button onClick={clickMe}>SIGN UP!</button>
      {/* <h1>{number}</h1>
      <input type='number' onChange={(e) => setNum(Number(e.target.value))} />
      <button onClick={myFunc}>Add</button> */}
    </div>
  );
}

// LOGIN
export function Test2() {
  async function clickMe() {
    const res = await fetch("http://localhost:4000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
      body: JSON.stringify({
        username: "hamidjoon",
        password: "1111",
      }),
    });
    const data = await res.json();
    cookies.set("ut", data.token, {path: "/"});
  }

  return <button onClick={clickMe}>LOGIN ME!</button>;
}

// POST BLOG
export default function Test3() {
  async function clickMe() {
    const res = await fetch("http://localhost:4000/blog/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
      body: JSON.stringify({
        title: "hamidjoon",
        content: "hamid",
        imgurl: "hamoioii=ddsfzv",
      }),
    });
    // const data = await res.json();
    // console.log(data);
  }

  return <button onClick={clickMe}>POST BLOG!</button>;
}

// ALL BLOGS
export function Test4() {
  async function clickMe() {
    const res = await fetch("http://localhost:4000/blog", {
      method: `GET`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res);
    const data = await res.json();
    // console.log(typeof data[0].creator);
    // console.log(data);
  }

  return <button onClick={clickMe}>ALL BLOGS!</button>;
}

// ALL WRITERS
export function Test5() {
  async function clickMe() {
    const res = await fetch("http://localhost:4000/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res);
    const data = await res.json();
    // console.log(data);
  }

  return <button onClick={clickMe}>ALL USERS!</button>;
}

// ALL BLOGS
export function Test6() {
  async function clickMe() {
    const res = await fetch("http://localhost:4000/blog", {
      method: "GET",
      "Content-Type": "application/json",
    }).then((res) => res);
    const data = await res.json();
    // console.log(data);
  }
  return <button onClick={clickMe}>All Blogs!</button>;
}
