import videoHomepage from '../../assets/video-homepage.mp4';

function HomePage({ props }) {
    return (
        <div className="homepage-container container">
            <div className="homepage-header">
                <video autoPlay muted loop>
                    <source src={videoHomepage} type="video/mp4" />
                </video>
                <div className="homepage-content">
                    <h2>Khám phá bản thân với những câu hỏi thú vị</h2>
                    <p>
                        Những bài quiz được thiết kế để mang đến những trải nghiệm độc đáo, giúp bạn tìm hiểu và hiểu rõ
                        hơn về chính mình - từ những sở thích, tính cách cho đến những khía cạnh cảm xúc sâu sắc bên
                        trong.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
