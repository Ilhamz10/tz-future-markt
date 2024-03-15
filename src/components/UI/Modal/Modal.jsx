import { forwardRef } from 'react';
import classes from './Modal.module.scss';

const Modal = forwardRef(({ children }, ref) => {
	return <dialog className={classes.modal} ref={ref}>{children}</dialog>;
});

export default Modal;
