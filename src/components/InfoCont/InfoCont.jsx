import classes from './InfoCont.module.scss';

const InfoCont = ({ title, text, mobileText }) => {
	return (
		<div className={classes.infoCont}>
			<h2>{title}</h2>
			<p>{text}</p>
            <p>{mobileText}</p>
		</div>
	);
};

export default InfoCont;
