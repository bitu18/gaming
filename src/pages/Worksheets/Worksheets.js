import Button from '~/component/Button';
import TitlePage from '~/component/TitlePage';
import classNames from 'classnames/bind';
import styles from './Worksheets.module.scss';

const cx = classNames.bind(styles);

function Worksheets() {
    return (
        <div className={cx('wrapper')}>
            <TitlePage title="Worksheets" />

            {/* Tabs */}
            <ul className={cx('filter', 'd-flex justify-content-end nav nav-tabs mb-4 me-5 mt-5')}>
                <li className="nav-item">
                    <Button className={cx('btn', 'nav-link active')}>Upcoming</Button>
                </li>
                <li className="nav-item">
                    <Button className="nav-link">Active</Button>
                </li>
                <li className="nav-item">
                    <Button className="nav-link">Ended</Button>
                </li>
                <li className="nav-item">
                    <Button className="nav-link">All</Button>
                </li>
            </ul>

            {/* Search + Filters */}
            <div className="d-flex justify-content-end mb-5 me-5 gap-2">
                <input
                    type="text"
                    className={cx('input', 'form-control')}
                    placeholder="Search by title, subject or keyword"
                />
                <select className={cx('select-form', 'form-select w-auto')}>
                    <option>Sort by: Date</option>
                </select>
            </div>

            {/* <!-- Table --> */}
            <div className={cx('table-wrapper')}>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Homework Papper</th>
                            <th scope="col">Total Users</th>
                            <th scope="col">Author</th>
                            <th scope="col">Date Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Week 1: Use Multiplication to Sol</td>
                            <td>
                                <i className="bi bi-people"></i> 3
                            </td>
                            <td>Bi</td>
                            <td>Nov 11, 2025</td>
                        </tr>
                        <tr>
                            <td>Week 2: Multiplication Facts HW</td>
                            <td>
                                <i className="bi bi-people"></i> 8
                            </td>
                            <td>Nicky</td>
                            <td>Oct 23, 2024</td>
                        </tr>
                        <tr>
                            <td>Animal Sounds (With Audio 🎧)</td>
                            <td>
                                <i className="bi bi-people"></i> 1
                            </td>
                            <td>Alex</td>
                            <td>Sep 21, 2025</td>
                        </tr>
                        <tr>
                            <td>Multiplication Tables - 1 HW</td>
                            <td>
                                <i className="bi bi-people"></i> 2
                            </td>
                            <td>Thomas</td>
                            <td>Aug 01, 2025</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Worksheets;
