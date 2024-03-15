import Navigation from '../../components/Navigation/Navigation';
import logo from '../../assets/logo.png';
import callIcon from '../../assets/call_icon.png';
import classes from './Header.module.scss';
import MenuIcon from '../../assets/menu.svg?react';

const Header = () => {
	return (
		<header>
			<div className='wrapper'>
				<div className={classes.headerCont}>
					<div className={classes.logo}>
						<img src={logo} alt='' />
					</div>
					<Navigation />

					<div className={classes.contact}>
						<button className={classes.menuBtn}>
							<MenuIcon />
						</button>
						<img src={callIcon} alt='' />
						<p>8-345-123-34-45</p>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
