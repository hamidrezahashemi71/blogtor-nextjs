import {NextPageWithLayout} from "../_app";
import {ReactElement, useEffect, useState} from "react";
import Panel from "../../layout/Panel";
import {editWriter, getSingleWriter, updateAvatar} from "../../lib/apis";
import {selectUser} from "../../State/Slices/CurrentUserSlice";
import {useSelector} from "react-redux";
import {CurrentUser} from "../../lib/interfaces";
import {useRouter} from "next/router";
import {toast} from "react-toastify";

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
      router.push("/Dashboard/");
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
    console.log(data);
  };

  const editProfile = () => {
    editWriterInfo();
    submitAvatar();
  };

  if (!eidtedWriter) return <h1>Loading...</h1>;
  return (
    <div>
      <input type='file' onChange={(e) => setFile(e.target.files![0])} />
      <img src={eidtedWriter.avatar} alt='Avatar' />
      <input
        type='text'
        value={eidtedWriter?.name}
        onChange={(e) =>
          setEditedWriter({...eidtedWriter, name: e.target.value})
        }
      />
      <input
        type='text'
        value={eidtedWriter?.bio}
        onChange={(e) =>
          setEditedWriter({...eidtedWriter, bio: e.target.value})
        }
      />
      <button onClick={editProfile}>Edit User</button>
    </div>
  );
};

EditProfile.getLayout = function getLayout(page: ReactElement) {
  return <Panel>{page}</Panel>;
};

export default EditProfile;
