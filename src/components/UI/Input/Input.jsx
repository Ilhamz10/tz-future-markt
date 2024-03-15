import classes from './Input.module.scss';

const Input = ({ ...props }) => {
	return <input className={classes.myInput} type='text' {...props} />;
};

export default Input;
