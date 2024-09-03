import ModalUser from './ModalUser';
import './ManageUsers.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TableUser from './TableUser';

import { useEffect, useState } from 'react';
import * as userServices from '../../../../../services/userServices';
import ModalDeleteUser from './ModalDeleteUser';
import { useTranslation } from 'react-i18next';

function ManageUsers() {
    const LIMIT_USER = 6;
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setcurrentPage] = useState(1);

    const { t } = useTranslation();

    const [showModalUser, setShowModalUser] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const [listUsers, setListUsers] = useState([]);
    const [edit, setEdit] = useState(false);
    const [infoUser, setInfoUser] = useState(undefined);

    useEffect(() => {
        fetchApiListUsers();
    }, [currentPage]);

    const fetchApiListUsers = async () => {
        const data = await userServices.getUserPaginate(currentPage, LIMIT_USER);
        if (data.EC === 0) {
            setPageCount(data.DT.totalPages);

            setListUsers(data.DT.users);
        }
    };

    const handleSetInfo = (item) => {
        setShowModalUser(true);
        setInfoUser(item);
        setEdit(true);
    };

    const handleSetInfoDelete = (item) => {
        setShowModalDelete(true);
        setInfoUser(item);
    };

    return (
        <div className="manage-user-container">
            <h3 className="title">{t('admin.users.title')}</h3>
            <div className="manage-user-content">
                <button className="btn btn-primary my-2" onClick={() => setShowModalUser(true)}>
                    <i className="pe-2">
                        <FontAwesomeIcon icon={faPlus} />
                    </i>
                    {t('admin.users.btnAddUser')}
                </button>
            </div>
            <div className="table-user-container">
                <TableUser
                    listUsers={listUsers}
                    handleSetInfo={handleSetInfo}
                    handleSetInfoDelete={handleSetInfoDelete}
                    setShowModalDelete={setShowModalDelete}
                    setcurrentPage={setcurrentPage}
                    pageCount={pageCount}
                    currentPage={currentPage}
                />
            </div>
            <ModalUser
                edit={edit}
                setEdit={setEdit}
                show={showModalUser}
                setShow={setShowModalUser}
                fetchApiListUsers={fetchApiListUsers}
                infoUser={infoUser}
                setInfoUser={setInfoUser}
                setcurrentPage={setcurrentPage}
            />
            <ModalDeleteUser
                show={showModalDelete}
                setShow={setShowModalDelete}
                infoUser={infoUser}
                fetchApiListUsers={fetchApiListUsers}
            />
        </div>
    );
}

export default ManageUsers;
