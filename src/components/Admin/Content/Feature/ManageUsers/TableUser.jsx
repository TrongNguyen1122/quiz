import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';

import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import Tippy from '@tippyjs/react';
import ReactPaginate from 'react-paginate';
import 'tippy.js/dist/tippy.css';
import { useTranslation } from 'react-i18next';
function TableUser({ listUsers, handleSetInfo, handleSetInfoDelete, pageCount, setcurrentPage, currentPage }) {
    const { t } = useTranslation();
    const handlePageChange = (event) => {
        setcurrentPage(+event.selected + 1);
    };

    return (
        <>
            <div className="wrapper-table">
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col"> {t('admin.users.table.username')}</th>
                            <th scope="col">Email</th>
                            <th scope="col">{t('admin.users.table.role')}</th>
                            <th scope="col">{t('admin.users.table.action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers &&
                            listUsers.length > 0 &&
                            listUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                        <td>{item.role}</td>
                                        <td>
                                            <PhotoProvider maskOpacity={'0.5'}>
                                                <PhotoView src={`data:image;base64,${item.image}`}>
                                                    <button className="btn-action btn mx-1 text-white btn-info">
                                                        <Tippy content={t('admin.tippy.previewImage')}>
                                                            <i>
                                                                <FontAwesomeIcon icon={faEye} />
                                                            </i>
                                                        </Tippy>
                                                    </button>
                                                </PhotoView>
                                            </PhotoProvider>

                                            <Tippy content={t('admin.tippy.edit')}>
                                                <button
                                                    className="btn mx-1 text-white btn-warning "
                                                    onClick={() => handleSetInfo(item)}
                                                >
                                                    <i>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </i>
                                                </button>
                                            </Tippy>
                                            <Tippy content={t('admin.tippy.delete')}>
                                                <button
                                                    className="btn mx-1 text-white btn-danger"
                                                    onClick={() => handleSetInfoDelete(item)}
                                                >
                                                    <i>
                                                        <FontAwesomeIcon icon={faDeleteLeft} />
                                                    </i>
                                                </button>
                                            </Tippy>
                                        </td>
                                    </tr>
                                );
                            })}
                        {listUsers && listUsers.length === 0 && (
                            <tr>
                                <td colSpan="4">{t('admin.users.table.notFoundUser')}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="paginate">
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
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName="pagination"
                    activeClassName="active"
                    forcePage={currentPage - 1}
                />
            </div>
        </>
    );
}

export default TableUser;
