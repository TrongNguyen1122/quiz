import ReactPaginate from 'react-paginate';
import './History.scss';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getHistory } from '../../../../../services/userServices';
import TableHistory from './TableHistory';
function History() {
    const { t } = useTranslation();
    const [data, setData] = useState([]);
    const [dataPaginate, setDataPaginate] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            let res = await getHistory();
            if (res && res.EC === 0) {
                setData(res.DT.data);
                if (res.DT.data.length > 8) {
                    let lengthArr = Math.ceil(res.DT.data.length / 8);
                    let newArray = [];
                    for (let i = 0; i < lengthArr; i++) {
                        newArray[i] = res.DT.data.slice(i * 8, i * 8 + 8);
                        setDataPaginate(newArray);
                    }
                } else {
                    setDataPaginate(res.DT.data);
                }
            }
        } catch (error) {}
    };

    const handlePageChange = (event) => {
        setCurrentPage(+event.selected);
    };
    return (
        <div className="history-container">
            <TableHistory data={data?.length > 8 ? dataPaginate[currentPage] : data} />
            <ReactPaginate
                previousLabel={t('admin.users.table.btnPrev')}
                nextLabel={t('admin.users.table.btnNext')}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={data?.length > 8 ? dataPaginate.length : 1}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                activeClassName="active"
                forcePage={currentPage}
            />
        </div>
    );
}

export default History;
