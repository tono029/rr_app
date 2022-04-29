import * as React from 'react';
import { Snackbar, Slide} from '@mui/material';
import { AuthContext } from '../App';

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

export default function Flash(props) {
  const [open, setOpen] = React.useState(false)
  const {setFlash} = React.useContext(AuthContext)

  React.useEffect(() => {
    props.flash !== "" ? setOpen(true) : setOpen(false)
  }, [props.flash])
  
  const handleClose = () => {
    setOpen(false)

    setFlash("")
  };

  return (
    // !! flashの内容によってbackgroundColorを変える。
    <Snackbar
      open={open}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      autoHideDuration={3300}
      anchorOrigin={{vertical: "top", horizontal: "center"}}
      message={props.flash}
      key={SlideTransition.name}
    />
  );
}
