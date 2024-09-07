import { useEffect, useState } from 'react';

function CountDown({ timeQuiz, onTimeUp }) {
    const [count, setCount] = useState(10);

    useEffect(() => {
        // Cập nhật count khi timeQuiz thay đổi

        setCount(timeQuiz);
    }, [timeQuiz]);

    useEffect(() => {
        if (count === 0 || timeQuiz === 0) {
            return;
        }
        const time = setInterval(() => {
            setCount((prev) => prev - 1);
            if (count === 0 || timeQuiz === 0) {
                onTimeUp();
            }
        }, 1000);

        return () => {
            clearInterval(time);
        };
    }, [count]);

    const toHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10);
        const hours = Math.floor(sec_num / 3600);
        const minutes = Math.floor(sec_num / 60) % 60;
        const seconds = sec_num % 60;

        return [hours, minutes, seconds]
            .map((v) => (v < 10 ? '0' + v : v))
            .filter((v, i) => v !== '00' || i > 0)
            .join(':');
    };

    return <h4 className="qus-header__timer text-success">{toHHMMSS(count)}</h4>;
}

export default CountDown;
