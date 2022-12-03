import {NextPageWithLayout} from "../_app";
import {ReactElement, useEffect, useState} from "react";
import Panel from "../../layout/Panel";
import {editWriter, getSingleWriter, updateAvatar} from "../../lib/apis";
import {selectUser} from "../../State/Slices/CurrentUserSlice";
import {useSelector} from "react-redux";
import {CurrentUser} from "../../lib/interfaces";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import Loading from "../../components/Loading";
import Image from "next/image";
import {Container} from "@mui/system";
import {Button, Grid, TextField, Tooltip} from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const EditProfile: NextPageWithLayout = () => {
  const currentUser: CurrentUser | null = useSelector(selectUser);
  const router = useRouter();
  const [eidtedWriter, setEditedWriter] = useState<CurrentUser | null>(null);
  const [file, setFile] = useState<null | File>(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        setEditedWriter({...eidtedWriter, avatar: e.target!.result});
      };
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  async function fetchCurrentUser() {
    await getSingleWriter(currentUser?._id);
    if (currentUser)
      setEditedWriter({
        _id: currentUser._id,
        name: currentUser.name,
        avatar: `${process.env.DOMAIN}${currentUser.avatar}`,
        bio: currentUser.bio,
      });
  }

  const editWriterInfo = async () => {
    const editWriterData = await editWriter(
      eidtedWriter?.name,
      eidtedWriter?.bio
    );
    if (editWriterData.msg === "ok") {
      window.location.assign("/Dashboard/MyBlogs");
      toast.success("Profile Edited Successfully!", {theme: "dark"});
    }
    if (editWriterData.msg === "bad input")
      toast.error("Please fill all fields!", {theme: "dark"});
    if (editWriterData.msg === "unathorized")
      toast.error("Something went wrong! Try again", {theme: "dark"});
  };

  const submitAvatar = async () => {
    if (!file) return;
    const data = await updateAvatar(file);
  };

  const editProfile = () => {
    editWriterInfo();
    submitAvatar();
  };

  if (!eidtedWriter) return <Loading />;
  return (
    <>
      <Grid
        container
        spacing={5}
        sx={{display: "flex", justifyContent: "space-between"}}>
        <Grid item md={3} xs={12}>
          <Container
            disableGutters
            maxWidth={false}
            sx={{
              mr: "50px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}>
            <Tooltip title='Click to choose avatar'>
              <label htmlFor='file-upload' style={{cursor: "pointer"}}>
                <TextField
                  type={"file"}
                  id={"file-upload"}
                  sx={{display: "none"}}
                  onChange={(e) =>
                    setFile((e.target as HTMLInputElement).files![0])
                  }
                />
                <Image
                  src={eidtedWriter.avatar}
                  width={120}
                  height={120}
                  alt='avatar-picture'
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src =
                      "/assets/images/default-blog.png";
                  }}
                  style={{borderRadius: "7px", objectFit: "cover"}}
                />
              </label>
            </Tooltip>
          </Container>
        </Grid>
        <Grid
          item
          md={9}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "10px",
          }}>
          <TextField
            type={"text"}
            variant='standard'
            sx={{
              width: "300px",
              bgcolor: "primary.veryLight",
              px: "10px",
              borderRadius: "6px",
            }}
            value={eidtedWriter?.name}
            onChange={(e) =>
              setEditedWriter({...eidtedWriter, name: e.target.value})
            }
          />
          <TextareaAutosize
            aria-label='bio textarea'
            minRows={5}
            placeholder='Biography'
            style={{
              width: 300,
              padding: "10px",
              borderRadius: "6px",
              fontSize: "14px",
            }}
            onChange={(e) =>
              setEditedWriter({...eidtedWriter, bio: e.target.value})
            }
          />
        </Grid>
      </Grid>
      <Button
        variant='outlineButtons'
        sx={{mt: "30px", width: {md: "100%", xs: "300px"}}}
        onClick={editProfile}>
        Edit Profile
      </Button>
    </>
  );
};


export default EditProfile;
