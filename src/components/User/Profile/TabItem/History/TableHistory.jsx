import moment from 'moment';

function TableHistory({ data }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Time</th>
                    <th scope="col">ID Quiz</th>
                    <th scope="col">Name Quiz</th>
                    <th scope="col">Total Questions</th>
                    <th scope="col">Total Correct</th>
                </tr>
            </thead>
            <tbody>
                {data?.length > 0 &&
                    data.map((item) => (
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{moment(item.createdAt).utc().format('DD/MM/YYYY hh:mm:ss A')}</td>
                            <td>{item.quiz_id}</td>
                            <td>{item.quizHistory.name}</td>
                            <td>{item.total_questions}</td>
                            <td>{item.total_correct}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
}

export default TableHistory;
