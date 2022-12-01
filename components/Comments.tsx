import {useEffect, useState} from "react";
import {postComment, getComments} from "../lib/apis";
import {Comment} from "../lib/interfaces";
import {toast} from "react-toastify";
import * as React from "react";
import {
  Avatar,
  Button,
  Divider,
  List,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import {selectUser} from "../State/Slices/CurrentUserSlice";
import {useSelector, useDispatch} from "react-redux";
import {Container} from "@mui/system";

const Comments = ({blogId, submitRate}: any) => {
  const [commentText, setCommentText] = useState<string>("");
  const [allComments, setAllComments] = useState<Comment[]>([]);

  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();

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

  // console.log("COMMENTS", allComments);
  // console.log(currentUser);

  return (
    <>
      <Typography variant='title'>{allComments.length} Comments</Typography>
      <Divider sx={{mb: "20px"}}></Divider>
      {currentUser ? (
        <>
          <Container
            disableGutters
            maxWidth={false}
            sx={{display: "flex", alignItems: "center", gap: "5px"}}>
            <Avatar
              alt='user-avatar'
              sx={{objectFit: "cover"}}
              src={`${process.env.DOMAIN}${
                currentUser ? currentUser.avatar : null
              }`}>
              <img
                width={"40px"}
                height={"40px"}
                style={{
                  objectFit: "cover",
                }}
                src={"/assets/images/default-avatar.png"}
                alt='fallback-avatar'
              />
            </Avatar>
            <Container
              disableGutters
              maxWidth={false}
              sx={{display: "flex", alignItems: "center", gap: "6px"}}>
              <TextField
                fullWidth
                placeholder='Write your comment....'
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button
                variant='normalButtons'
                onClick={() => {
                  submitComment();
                  submitRate();
                }}>
                Comment
              </Button>
            </Container>
          </Container>
        </>
      ) : (
        <>
          <Divider sx={{mb: "20px"}}></Divider>
          <Typography variant='fadeText'>
            Login to post comments on this blog.
          </Typography>
        </>
      )}

      {allComments.length ? (
        allComments.map((comment) => {
          return (
            <Container
              disableGutters
              maxWidth={false}
              sx={{display: "flex", justifyContent: "center"}}>
              <List
                key={comment._id}
                sx={{
                  borderRadius: "7px",
                  width: "80%",
                  bgcolor: "primary.veryLight",
                  mt: "10px",
                  px: "20px",
                }}>
                <ListItemAvatar>
                  <Avatar
                    alt='user-avatar'
                    sx={{objectFit: "cover"}}
                    src={`${process.env.DOMAIN}${comment.user?.avatar}`}>
                    <img
                      width={"40px"}
                      height={"40px"}
                      style={{
                        objectFit: "cover",
                      }}
                      src={"/assets/images/default-avatar.png"}
                      alt='fallback-avatar'
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{display: "inline", mr: "20px"}}
                        component='span'
                        variant='body2'
                        color='text.primary'>
                        {comment.user?.name}
                      </Typography>
                      {comment.text}
                    </React.Fragment>
                  }
                />
              </List>
            </Container>
          );
        })
      ) : (
        <>
          <Divider sx={{my: "20px"}}></Divider>
          <Typography variant='fadeText' sx={{textAlign: "center", mt: "50px"}}>
            Be first one to comment
          </Typography>
        </>
      )}
    </>
  );
};

export default Comments;
