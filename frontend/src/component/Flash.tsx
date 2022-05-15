/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Snackbar, Slide, SlideProps} from '@mui/material';
import { GeneralControl } from '../App';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

export default function Flash(props: {flash: string, setChartAni: SetStateType<boolean>, chartAni: boolean}) {
  const [open, setOpen] = React.useState(false)
  const {setMainSlide, setFlash} = React.useContext(GeneralControl)
  

  React.useEffect(() => {
    if (props.flash !== "") {
      props.setChartAni(false)
      setMainSlide({dire: "right", in: true, appear: false})
      setOpen(true)
    }
  }, [props.flash])

  React.useEffect(() => {
    if (open) {
      props.setChartAni(false)
    } else {
      props.setChartAni(true)
      setFlash("")
    }
  }, [open])
  
  const handleClose = () => {
    setMainSlide({dire: "right", in: true, appear: false})
    props.setChartAni(true)
    setOpen(false)
  };

  return (
    // !! flashの内容によってbackgroundColorを変える。
    <Snackbar
      open={open}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      autoHideDuration={3400}
      anchorOrigin={{vertical: "top", horizontal: "center"}}
      message={props.flash}
      key={SlideTransition.name}
    />
  );
}
