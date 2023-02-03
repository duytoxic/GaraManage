import React, { Component } from 'react';
import { variables } from './Variables.js';

export class Department extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            modalTitle: "",
            name: "",
            dob: "",
            email: "",
            phone: "",
            address: "",
            DepartmentId: 0,

            DepartmentIdFilter: "",
            DepartmentNameFilter: "",
            departmentsWithoutFilter: []
        }
    }
    FilterFn() {
        var DepartmentIdFilter = this.state.DepartmentIdFilter;
        var DepartmentNameFilter = this.state.DepartmentNameFilter;

        var filteredData = this.state.departmentsWithoutFilter.filter(
            function (el) {
                return el.DepartmentId.toString().toLowerCase().includes(
                    DepartmentIdFilter.toString().trim().toLowerCase()
                ) &&
                    el.DepartmentName.toString().toLowerCase().includes(
                        DepartmentNameFilter.toString().trim().toLowerCase()
                    )
            }
        );
        this.setState({ departments: filteredData });
    }
    sortResult(prop, asc) {
        var sortedData = this.state.departmentsWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        this.setState({ departments: sortedData });
    }

    changeDepartmentIdFilter = (e) => {
        this.state.DepartmentIdFilter = e.target.value;
        this.FilterFn();
    }
    changeDepartmentNameFilter = (e) => {
        this.state.DepartmentNameFilter = e.target.value;
        this.FilterFn();
    }

    refreshList() {
        fetch(variables.API_URL + 'Customers')
            .then(response => response.json())
            .then(data => {
                this.setState({ departments: data.data, departmentsWithoutFilter: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeDepartmentName = (e) => {
        this.setState({ name: e.target.value });
    }

    changeDepartmentEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    changeDepartmentAddress = (e) => {
        this.setState({ address: e.target.value });
    }

    changeDepartmentPhone = (e) => {
        this.setState({ phone: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Thêm mới khách hàng",
            id: 0,
            name: "",
            dob: "",
            email: "",
            phone: "",
            address: "",
        });
    }
    editClick(dep) {
        this.setState({
            modalTitle: "Sửa thông tin khách hàng",
            id: dep.id,
            name: dep.name,
            dob: dep.dob,
            email: dep.email,
            phone: dep.phone,
            address: dep.address,
        });
        this.refreshList();
    }

    createClick() {
        fetch(variables.API_URL + 'Customers', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert('Thêm thành công');
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }
    updateClick(id) {
        fetch(variables.API_URL + 'Customers/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                phone: this.state.phone,
                email: this.state.email,
                address: this.state.address,
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert('Sửa thành công');
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }
    deleteClick(id) {
        if (window.confirm('Bạn có chắc muốn xóa?')) {
            fetch(variables.API_URL + 'Customers/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert('Xóa thành công');
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }

    render() {
        const {
            departments,
            modalTitle,
            id,
            name,
            phone,
            email,
            address
        } = this.state;

        return (
            <div>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Thêm khách hàng
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                STT
                            </th>
                            <th>
                                Họ và tên

                            </th>
                            <th>
                                Số điện thoại
                            </th>
                            <th>
                                Email
                            </th>
                            <th>
                                Địa chỉ
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((dep, key) =>
                            <tr key={key}>
                                <td>{key+=1}</td>
                                <td className='text-left'>{dep.name}</td>
                                <td>{dep.phone}</td>
                                <td>{dep.email}</td>
                                <td>{dep.address}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(dep)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(dep.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Tên khách hàng</span>
                                    <input type="text" className="form-control" required
                                        value={name}
                                        onChange={this.changeDepartmentName} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Email</span>
                                    <input type="email" className="form-control" required
                                        value={email}
                                        onChange={this.changeDepartmentEmail} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Phone</span>
                                    <input type="text" className="form-control" required
                                        value={phone}
                                        onChange={this.changeDepartmentPhone} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Địa chỉ</span>
                                    <input type="text" className="form-control" required
                                        value={address}
                                        onChange={this.changeDepartmentAddress} />
                                </div>

                                {id === 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Thêm mới</button>
                                    : null}

                                {id !== 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick(id)}
                                    >Cập nhật</button>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}