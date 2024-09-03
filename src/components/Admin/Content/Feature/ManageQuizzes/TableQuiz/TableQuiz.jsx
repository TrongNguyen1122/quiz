import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import './TableQuiz.scss';

import Tippy from '@tippyjs/react';
import ModalQuiz from '../ModalQuiz';
import { useState } from 'react';
import ModalDeleteQuiz from '../ModalDeleteQuiz';
import { useTranslation } from 'react-i18next';

function TableQuiz({ listQuiz, fetchApiQuizAll }) {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [data, setData] = useState({});
    const { t } = useTranslation();
    const handleEdit = (item) => {
        setData(item);
        setShowModal(true);
    };
    const handleDelete = (item) => {
        setData(item);
        setShowDeleteModal(true);
    };
    return (
        <>
            <div className="wrapper-table">
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">{t('admin.quizzes.quizzes.table.name')}</th>
                            <th scope="col">{t('admin.quizzes.quizzes.table.description')}</th>
                            <th scope="col">{t('admin.quizzes.quizzes.table.type')}</th>
                            <th scope="col">{t('admin.quizzes.quizzes.table.action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listQuiz &&
                            listQuiz.length > 0 &&
                            listQuiz.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{item.id}</th>
                                        <td>
                                            <span>{item.name}</span>
                                        </td>
                                        <td>
                                            <span>{item.description}</span>
                                        </td>
                                        <td>
                                            <span>{item.difficulty}</span>
                                        </td>
                                        <td>
                                            <PhotoProvider maskOpacity={'0.5'}>
                                                <PhotoView src={`data:image;base64,${item.image}`}>
                                                    <button className="btn-action btn text-white btn-info">
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
                                                    className="btn text-white btn-warning mx-2"
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    <i>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </i>
                                                </button>
                                            </Tippy>
                                            <Tippy content={t('admin.tippy.delete')}>
                                                <button
                                                    className="btn text-white btn-danger"
                                                    onClick={() => handleDelete(item)}
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

                        {listQuiz && listQuiz.length === 0 && (
                            <tr>
                                <td colSpan="4">{t('admin.quizzes.quizzes.table.notFoundQuiz')}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <ModalQuiz
                show={showModal}
                setShow={setShowModal}
                fetchApiQuizAll={fetchApiQuizAll}
                data={data}
                setData={setData}
            />
            <ModalDeleteQuiz
                data={data}
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                fetchApiQuizAll={fetchApiQuizAll}
            />
        </>
    );
}

export default TableQuiz;
