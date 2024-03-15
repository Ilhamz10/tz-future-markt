import ArrowIcon from '../../../assets/Vector.svg?react';
import classes from './Button.module.scss';

const Button = ({ children, type, mobileText, ...props }) => {
	return (
		<button className={classes[type]} {...props}>
			<span>{children}</span>
			<span>{mobileText}</span>
			<div className={classes.iconCont}>
				<ArrowIcon stroke={type === 'outline' ? 'white' : '#0B3461'} />
			</div>
		</button>
	);
};

export default Button;
