import { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm(props) {
  const oldPasswordref = useRef();
  const newPasswordref = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const enterOldpasword = oldPasswordref.current.value;
    const enterNewpassword = newPasswordref.current.value;

    props.onChangePassword({
      oldPassword: enterOldpasword,
      newPassword: enterNewpassword,
    });
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordref} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordref} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
