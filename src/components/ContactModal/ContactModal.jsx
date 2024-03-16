import { forwardRef, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../UI/Input/Input';
import Modal from '../UI/Modal/Modal';

import classes from './ContactModal.module.scss';
import CloseIcon from '../../assets/close.svg?react';
import logo from '../../assets/logo.png';
import Button from '../UI/Button/Button';

const variants = {
	open: { y: 20 },
	closed: { y: '-110%' },
};

const modalVariants = {
	open: {
		minHeight: '100vh',
		height: '100%',
	},
	closed: {
		minHeight: '0px',
		height: '0px',
	},
};

const ContactModal = forwardRef(({ isSend, setIsSend, closeModal }, ref) => {
	const privacyInputRef = useRef();
	const [nameValue, setNameValue] = useState('');
	const [phoneValue, setPhoneValue] = useState('');
	const [isError, setIsError] = useState(false);

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
		<Modal ref={ref}>
			<motion.form
				variants={modalVariants}
				animate={!isSend ? 'open' : 'closed'}
				className={`${classes.modalForm} ${!isSend ? classes.active : ''}`}
				onSubmit={formSubmitHandler}>
				<div className={classes.formHead}>
					<button type='button' onClick={closeModal}>
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
					<div className={classes.inputCont}>
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
					</div>
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
					<button type='button' onClick={closeModal}>
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
	);
});

export default ContactModal;
