import { useTranslation } from 'react-i18next';
import './SliderQuiz.scss';
import Carousel from 'react-bootstrap/Carousel';

function SliderQuiz() {
    const { t } = useTranslation();
    const data = [
        {
            image: 'https://media.istockphoto.com/id/1152410679/vi/anh/kh%C3%A1i-ni%E1%BB%87m-ki%E1%BB%83m-tra-tr%C6%B0%E1%BB%9Dng-gi%C3%A1o-d%E1%BB%A5c-tay-h%E1%BB%8Dc-sinh-c%E1%BA%A7m-b%C3%BAt-ch%C3%AC-%C4%91%E1%BB%83-thi-vi%E1%BA%BFt-phi%E1%BA%BFu-tr%E1%BA%A3-l%E1%BB%9Di-ho%E1%BA%B7c-b%C3%A0i.webp?b=1&s=612x612&w=0&k=20&c=pDdVnnyuA4ancLbmF81M3Jjtdr_m9r5x1WM7Qjfy9x8=',
            title: t('homepage.carousel.title1'),
            description: t('homepage.carousel.description1'),
        },
        {
            image: 'https://cdn.pixabay.com/photo/2017/01/24/01/13/quiz-2004350_1280.png',
            title: t('homepage.carousel.title2'),
            description: t('homepage.carousel.description2'),
        },
        {
            image: 'https://cdn.pixabay.com/photo/2020/01/06/19/26/crossword-4746035_1280.jpg',
            title: t('homepage.carousel.title3'),
            description: t('homepage.carousel.description3'),
        },
        {
            image: 'https://cdn.pixabay.com/photo/2021/06/02/18/04/education-6305113_1280.jpg',
            title: t('homepage.carousel.title4'),
            description: t('homepage.carousel.description4'),
        },
        {
            image: 'https://media.istockphoto.com/id/1502704339/vi/anh/ng%C6%B0%E1%BB%9Di-%C4%91%C3%A0n-%C3%B4ng-tr%C6%B0%E1%BB%9Fng-th%C3%A0nh-s%E1%BB%AD-d%E1%BB%A5ng-m%C3%A1y-t%C3%ADnh-x%C3%A1ch-tay-%C4%91%C3%A1nh-d%E1%BA%A5u-%C4%91%C3%BAng-d%E1%BA%A5u-hi%E1%BB%87u-%C4%91%E1%BB%83-ph%C3%AA-duy%E1%BB%87t-t%C3%A0i.jpg?s=1024x1024&w=is&k=20&c=-UKA1rVXtYCdpC0daDhXKbR5_CmqWoKkUz9_Whg0tSU=',
            title: t('homepage.carousel.title5'),
            description: t('homepage.carousel.description5'),
        },
    ];

    return (
        <Carousel interval={3000} className="container slider-container">
            {data.map((item, index) => (
                <Carousel.Item key={index} className="slider-item">
                    <img className="slider-image" src={item.image} alt="4" />
                    <Carousel.Caption className="carousel-caption">
                        <h3 className="title-carousel">{item.title}</h3>
                        <p>{item.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default SliderQuiz;
