import classes from './MainContent.module.scss';
import mentorImg from '../../assets/mentor.png';
import Button from '../UI/Button/Button';
import InfoCont from '../InfoCont/InfoCont';
import Modal from '../UI/Modal/Modal';
import Input from '../UI/Input/Input';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import CloseIcon from '../../assets/close.svg?react';
import logo from '../../assets/logo.png';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../../utils/http';
import { calculateDateSum } from '../../utils/dateToSum';

const variants = {
	open: { y: 20 },
	closed: { y: '-110%' },
};

const modalVariants = {
	open: {
		clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
		minHeight: '100vh',
		height: '100%',
	},
	closed: {
		clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
		minHeight: '0px',
		height: '0px',
	},
};

const MainContent = () => {
	const modalRef = useRef();
	const privacyInputRef = useRef();
	const [nameValue, setNameValue] = useState('');
	const [phoneValue, setPhoneValue] = useState('');
	const [isError, setIsError] = useState(false);
	const [isSend, setIsSend] = useState(false);
	const [dateSum, setDateSum] = useState(0);

	const { data, isPending } = useQuery({
		queryKey: ['get-data'],
		queryFn: getData,
	});

	function showModal() {
		modalRef.current.showModal();
		setIsSend(false);
	}

	useEffect(() => {
		const today = new Date();
		const day = String(today.getDate()).padStart(2, '0');
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const year = today.getFullYear();

		const dateString = `${day}.${month}.${year}`;

		setDateSum(calculateDateSum(dateString));
	}, []);

	function formSubmitHandler(e) {
		e.preventDefault();

		if (
			nameValue.trim().length === 0 ||
			phoneValue.trim().length === 0 ||
			!privacyInputRef.current.checked
		) {
			setIsError((prev) => !prev);
			setTimeout(() => {
				setIsError((prev) => !prev);
			}, 1500);
			return;
		}

		localStorage.setItem(
			'userInfo',
			JSON.stringify({
				name: nameValue,
				phone: phoneValue,
			})
		);
		setIsSend(true);
	}

	return (
		<div className={classes.mainContent}>
			<div className={classes.mainTextCont}>
				<h1>Создаю условия для вашего успеха</h1>
				<p className={classes.mainText}>
					Когда ваше время и энергия лучше сфокусированы, стремление к новым
					возможностям становится реальностью, ваш успех зависит от ваших
					действий
				</p>
				<p className={classes.mainText}>Ваш успех зависит от ваших действий</p>
				<div className={classes.mainBtnCont}>
					<Button mobileText='Записаться' type={'fill'} onClick={showModal}>
						Записаться на консультацию
					</Button>
					<Button
						mobileText='Заказать звонок'
						type={'outline'}
						onClick={showModal}>
						Бесплатная консультация
					</Button>
				</div>
				<div className={classes.mainInfoCont}>
					<InfoCont
						title={dateSum}
						text='техник для достижения целей'
						mobileText='техники'
					/>
					<InfoCont
						title={isPending ? '0' : Math.round(data.Valute.GBP.Value)}
						text='увеличение личной продуктивности'
						mobileText='продуктивности'
					/>
				</div>
			</div>

			<div className={classes.mentorImgCont}>
				<img src={mentorImg} alt='' />
			</div>
			<Modal ref={modalRef}>
				<motion.form
					variants={modalVariants}
					animate={!isSend ? 'open' : 'closed'}
					className={`${classes.modalForm} ${!isSend ? classes.active : ''}`}
					onSubmit={formSubmitHandler}>
					<div className={classes.formHead}>
						<button type='button' onClick={() => modalRef.current.close()}>
							<CloseIcon />
						</button>
					</div>
					<motion.p
						variants={variants}
						animate={isError ? 'open' : 'closed'}
						className={classes.errorMessage}>
						Please fill all fields correctly!
					</motion.p>
					<div className={classes.formContent}>
						<h2>Закажите обратный звонок</h2>
						<Input
							placeholder='ИМЯ'
							value={nameValue}
							onChange={(e) => setNameValue(e.target.value)}
						/>
						<Input
							placeholder='ТЕЛЕФОН'
							value={phoneValue}
							onChange={(e) => setPhoneValue(e.target.value)}
						/>
						<div className={classes.privacyCont}>
							<input ref={privacyInputRef} type='checkbox' id='privacyPolicy' />
							<label htmlFor='privacyPolicy'>
								Согласен на сохранение и обработку персональных данных
							</label>
						</div>
						<div>
							<Button type={'outline'} mobileText='Заказать обратный звонок'>
								Заказать обратный звонок
							</Button>
						</div>
					</div>
				</motion.form>
				<motion.div
					variants={modalVariants}
					animate={isSend ? 'open' : 'closed'}
					className={classes.modalContent}>
					<div className={classes.modalHead}>
						<button type='button' onClick={() => modalRef.current.close()}>
							<CloseIcon />
						</button>
					</div>
					<div className={classes.modalMain}>
						<h2>
							Спасибо <br /> за заявку
						</h2>
						<h3>
							Я обязательно <br /> свяжусь с вами <br /> в ближайшее время.
						</h3>
					</div>
					<div className={classes.logo}>
						<img src={logo} alt='Logo' />
					</div>
				</motion.div>
			</Modal>
		</div>
	);
};

export default MainContent;
