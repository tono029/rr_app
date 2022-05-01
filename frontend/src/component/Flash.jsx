import * as React from 'react';
import { Snackbar, Slide} from '@mui/material';
import { AuthContext, GeneralControl } from '../App';

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

export default function Flash(props) {
  const [open, setOpen] = React.useState(false)
  const {setFlash} = React.useContext(AuthContext)
  const {setMainSlide} = React.useContext(GeneralControl)
  

  React.useEffect(() => {
    if (props.flash !== "") {
      props.setChartAni(false)
      setMainSlide({dire: "right", in: true, appear: false})
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [props.flash])
  
  const handleClose = () => {
    
    setMainSlide({dire: "right", in: true, appear: false})
    props.setChartAni(false)
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
