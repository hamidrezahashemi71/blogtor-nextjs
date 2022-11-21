import {useEffect, useState} from "react";
import {postComment, getComments} from "../lib/apis";
import {Comment} from "../lib/interfaces";
import {toast} from "react-toastify";

const Comments = ({blogId}: any) => {
  const [commentText, setCommentText] = useState<string>("");
  const [allComments, setAllComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const data = await getComments(blogId);
    setAllComments(data);
    if (data.msg === "bad request: no such blog exists")
      toast.error("This blog has been deleted!", {theme: "dark"});
  };

  const submitComment = async () => {
    const data = await postComment(commentText, blogId);
    setCommentText(" ");
    fetchComments();
    if (data.msg === "bad request: bad inputs")
      toast.error("Comment field can not be empty!", {theme: "dark"});
    if (data.msg === "Unauthorized")
      toast.error("You have to login for commenting!", {theme: "dark"});
    if (data.msg === "bad request: no such blog found")
      toast.error("This blog has been deleted!", {theme: "dark"});
  };

  return (
    <>
      <button onClick={submitComment}>Comment</button>
      <input
        type='text'
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <div>
        <ul>
          {allComments.map((comment) => {
            return <li key={comment._id}>{comment.text}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default Comments;
