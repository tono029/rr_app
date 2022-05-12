import * as React from 'react';
import { Snackbar, Slide, SlideProps} from '@mui/material';
import { GeneralControl } from '../App';
import { SetStateType } from '../App';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

export default function Flash(props: {flash: string, setChartAni: SetStateType<boolean>}) {
  const [open, setOpen] = React.useState(false)
  const {setMainSlide, setFlash} = React.useContext(GeneralControl)
  

  React.useEffect(() => {
    if (props.flash !== "") {
      props.setChartAni(false)
      setMainSlide({dire: "right", in: true, appear: false})
      setOpen(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.flash])
  
  const handleClose = () => {
    setMainSlide({dire: "right", in: true, appear: false})
    props.setChartAni(false)
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
