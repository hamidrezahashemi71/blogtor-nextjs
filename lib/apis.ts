import Cookies from "universal-cookie";
const cookies = new Cookies();

// GET DATA ************************************************************************
// home page
export const getTopWriters = async () => {
  const res = await fetch(`${process.env.DOMAIN}user/top-users`);
  const data = await res.json();
  return data;
};

export const getTopBlogs = async () => {
  const res = await fetch(`${process.env.DOMAIN}blog/top-blogs`);
  const data = await res.json();
  return data;
};

// writers
export const getAllWriters = async () => {
  const res = await fetch(`${process.env.DOMAIN}user`);
  const data = await res.json();
  return data;
};

// single writer
export const getSingleWriter = async (_id: string | undefined) => {
  // const router = useRouter();
  const res = await fetch(`${process.env.DOMAIN}user/singleUser/${_id}`);
  const data = await res.json();
  return data;
};

export const getBlogsByWriter = async (_id: string | undefined) => {
  const res = await fetch(`${process.env.DOMAIN}blog/by-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id,
    }),
  });
  const data = await res.json();
  return data;
};

// blogs
export const getAllBlogs = async () => {
  const res = await fetch(`${process.env.DOMAIN}blog`);
  const data = await res.json();
  return data;
};

// single blog
export const getSingleBlog = async (_id: undefined | string | string[]) => {
  const res = await fetch(`${process.env.DOMAIN}blog/single-blog/${_id}`);
  const data = await res.json();
  return data;
};

// my blogs
export const getMyBlogs = async () => {
  const res = await fetch(`${process.env.DOMAIN}blog/my-blogs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${cookies.get("ut")}`,
    },
  });
  const data = await res.json();
  return data;
};

// comments
export const getComments = async (_id: string) => {
  const res = await fetch(`${process.env.DOMAIN}comment/by-blog/${_id}`);
  const data = await res.json();
  return data;
};

// POST DATA ************************************************************************
// dashboard layout
export const getCurrentUser = async () => {
  const res = await fetch(`${process.env.DOMAIN}user/me`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${cookies.get("ut")}`,
    },
    body: JSON.stringify({}),
  });
  const data = await res.json();
  return data;
};

// register page
export const postRegisterInfo = async (username: string, name: string) => {
  const res = await fetch(`${process.env.DOMAIN}user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      name: name,
    }),
  });
  const data = await res.json();
  cookies.set("ut", data.token);
  return data;
};

// login page
export const postLoginInfo = async (username: string, password: string) => {
  const res = await fetch(`${process.env.DOMAIN}user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const data = await res.json();
  cookies.set("ut", data.token, {path: "/"});
  return data;
};

// edit profile
export const editWriter = async (
  name: string | undefined,
  bio: string | undefined
) => {
  const res = await fetch(`${process.env.DOMAIN}user/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${cookies.get("ut")}`,
    },
    body: JSON.stringify({
      name,
      bio,
    }),
  });
  const data = await res.json();
  return data;
};

export const updateAvatar = async (file: any) => {
  const formData = new FormData();
  // اگه به رست ای پی آی بخوایم فایل بفرستیم باید از فرم دیتا استفاده کنیم
  // فرم دیتا میتونی چیزایی که فایلن توش ذخیره کنی. آواتار = کی فایل: ولیو
  formData.append("avatar", file);
  const res = await fetch(`${process.env.DOMAIN}user/update-avatar`, {
    method: "POST",
    headers: {
      auth: `ut ${cookies.get("ut")}`,
    },
    body: formData,
  });
  const data = await res.json();
  return data;
};

// post blog
export const postBlog = async (
  title: string,
  content: string,
  imgurl: string
) => {
  const res = await fetch(`${process.env.DOMAIN}blog/write`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${cookies.get("ut")}`,
    },
    body: JSON.stringify({
      title: title,
      content: content,
      imgurl: imgurl,
    }),
  });
  const data = res.json();
  return data;
};

// edit blog
export const editBlog = async (
  blogId: string | string[] | undefined,
  title: string | undefined,
  content: string | undefined,
  imgurl: string | undefined
) => {
  const res = await fetch(`${process.env.DOMAIN}blog/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${cookies.get("ut")}`,
    },
    body: JSON.stringify({
      blogId: blogId,
      data: {
        title: title,
        content: content,
        imgurl: imgurl,
      },
    }),
  });
  const data = res.json();
  return data;
};

export const deleteBlog = async (blogId: string | string[] | undefined) => {
  const res = await fetch(`${process.env.DOMAIN}blog/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${cookies.get("ut")}`,
    },
    body: JSON.stringify({
      blogId: blogId,
    }),
  });
  const data = res.json();
  return data;
};

// single blog
export const postRate = async (blogId: string | undefined, score: number) => {
  const res = await fetch(`${process.env.DOMAIN}blog/submit-rate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${cookies.get("ut")}`,
    },
    body: JSON.stringify({
      blogId,
      score,
    }),
  });
  const data = await res.json();
  return data;
};

// comments
export const postComment = async (text: string, blogId: string | undefined) => {
  const res = await fetch(`${process.env.DOMAIN}comment/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${cookies.get("ut")}`,
    },
    body: JSON.stringify({
      text,
      blogId,
    }),
  });
  const data = await res.json();
  return data;
};
