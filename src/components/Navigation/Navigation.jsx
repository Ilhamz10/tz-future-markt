import classes from './Navigation.module.scss'

const Navigation = () => {
	return (
		<nav className={classes.navigation}>
			<ul>
				<li>
					<a href='#'>Обо мне</a>
				</li>
				<li>
					<a href='#'>Наставничество</a>
				</li>
				<li>
					<a href='#'>Мероприятия</a>
				</li>
				<li>
					<a href='#'>Кейсы</a>
				</li>
				<li>
					<a href='#'>Отзывы</a>
				</li>
				<li>
					<a href='#'>Контакты</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
