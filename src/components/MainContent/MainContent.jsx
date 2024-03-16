import classes from './MainContent.module.scss';
import mentorImg from '../../assets/mentor.png';
import Button from '../UI/Button/Button';
import InfoCont from '../InfoCont/InfoCont';
import { useEffect, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getData } from '../../utils/http';
import { calculateDateSum } from '../../utils/dateToSum';
import ContactModal from '../ContactModal/ContactModal';

const MainContent = () => {
	const modalRef = useRef();
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

	function closeModal() {
		modalRef.current.close();
	}

	useEffect(() => {
		const today = new Date();
		const day = String(today.getDate()).padStart(2, '0');
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const year = today.getFullYear();

		const dateString = `${day}.${month}.${year}`;

		setDateSum(calculateDateSum(dateString));
	}, []);

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
						title={dateSum + '+'}
						text='техник для достижения целей'
						mobileText='техники'
					/>
					<InfoCont
						title={isPending ? '0' : Math.round(data.Valute.GBP.Value) + '%'}
						text='увеличение личной продуктивности'
						mobileText='продуктивности'
					/>
				</div>
			</div>

			<div className={classes.mentorImgCont}>
				<img src={mentorImg} alt='' />
			</div>
			<ContactModal
				ref={modalRef}
				isSend={isSend}
				setIsSend={setIsSend}
				closeModal={closeModal}
			/>
		</div>
	);
};

export default MainContent;
