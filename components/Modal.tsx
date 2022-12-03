import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {signOut} from "../State/Slices/CurrentUserSlice";
import {Container} from "@mui/system";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalBox = ({
  type,
  deleteBlogFunc,
  handleClose,
  deleteconfirm,
  logoutconfirm,
}: any) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const logout = () => {
    handleClose();
    dispatch(signOut());
    router.push("/");
  };

  return (
    <div>
      <Modal
        open={type === "delete" ? deleteconfirm : logoutconfirm}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {`Are you sure you want to ${
              type === "delete" ? "delete this item?" : "exit?"
            }`}
          </Typography>
          <Container
            disableGutters
            maxWidth={false}
            sx={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
            }}>
            <Button onClick={handleClose} variant='outlineButtons'>
              Cancel
            </Button>
            <Button
              onClick={type === "delete" ? deleteBlogFunc : logout}
              variant='normalButtons'>
              Yes
            </Button>
          </Container>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalBox;
