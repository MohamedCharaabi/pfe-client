// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import moment from 'moment'
import { handleError, handleSuccess } from '../../exports/SweetAlerts'


// ** Table Data & Columns
import { data, columns, propositionsColumns } from './data'

// ** Add New Modal Component
import AddNewModal from './AddNewModal'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { Trash, Check, ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'
import {
    Card,
    CardHeader,
    CardTitle,
    Button,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Input,
    Label,
    Row,
    Col
} from 'reactstrap'
import axios from 'axios'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
    <div className='custom-control custom-checkbox'>
        <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
        <label className='custom-control-label' onClick={onClick} />
    </div>
))

async function deleteThemeRequest(id) {
    await axios.delete(`https://pfe-cims.herokuapp.com/requesttheme/${id}`)
        .then(res => {
            if (res.status === 200) {
                // loadThemes()
                return handleSuccess({ props: { title: 'Proposition Supprimer' } })
            }
        })
        .catch(error => handleError({ props: { title: 'Error while deleting theme', text: error.message } }))
}

export const columnsTable = [
    {
        name: 'Name',
        selector: 'theme',
        sortable: true,
        minWidth: '250px',
        cell: row => (
            <div className='d-flex align-items-center'>
                {/* {row.avatar === '' ? (
            <Avatar color={`light-${states[row.status]}`} content={row.full_name} initials />
          ) : (
            <Avatar img={require(`@src/assets/images/portrait/small/avatar-s-${row.avatar}`).default} />
          )} */}
                <div className='user-info text-truncate ml-1'>
                    <span className='d-block font-weight-bold text-truncate'>{row.theme}</span>
                    {/* <small>{row.post}</small> */}
                </div>
            </div>
        )
    },
    {
        name: 'Creator',
        selector: 'creator',
        sortable: true,
        minWidth: '250px'
    },
    {
        name: 'Date',
        selector: 'createdAt',
        sortable: true,
        minWidth: '150px',
        cell: row => (moment(row.createdAt).format('MMMM Do YYYY, h:mm'))
    },
    {
        name: 'Actions',
        allowOverflow: true,
        cell: row => {
            return (
                <div className='d-flex'>

                    <Check size={20} color={'green'} className='mr-50' onClick={e => {
                        e.preventDefault()
                        //   addTheme({ theme: row.theme, creator: row.creator }, row._id)
                    }} />


                    <Trash size={20} color={'red'} onClick={e => {
                        e.preventDefault()
                        deleteThemeRequest(row._id)
                    }} />
                </div>
            )
        }
    }
]
const PropositionTable = () => {
    // ** States
    const [modal, setModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [themes, setThemes] = useState([])

    async function loadThemes() {

        await axios.get('https://pfe-cims.herokuapp.com/requesttheme')
            .then(res => setThemes(res.data))
            .catch(error => alert(`errror ==> ${error.message}`))
    }

    useEffect(() => {
        loadThemes()
    }, [])

    // loadThme
    const load = () => loadThemes()
    // ** Function to handle Modal toggle
    const handleModal = () => setModal(!modal)

    // ** Function to handle filter
    const handleFilter = e => {
        const value = e.target.value
        let updatedData = []
        setSearchValue(value)

        const status = {
            1: { title: 'Current', color: 'light-primary' },
            2: { title: 'Professional', color: 'light-success' },
            3: { title: 'Rejected', color: 'light-danger' },
            4: { title: 'Resigned', color: 'light-warning' },
            5: { title: 'Applied', color: 'light-info' }
        }

        if (value.length) {
            updatedData = themes.filter(item => {
                const startsWith =
                    // item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.theme.toLowerCase().startsWith(value.toLowerCase())

                // item.post.toLowerCase().startsWith(value.toLowerCase()) ||
                // item.email.toLowerCase().startsWith(value.toLowerCase()) ||
                // item.age.toLowerCase().startsWith(value.toLowerCase()) ||
                // item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
                // item.start_date.toLowerCase().startsWith(value.toLowerCase()) ||
                // status[item.status].title.toLowerCase().startsWith(value.toLowerCase())

                const includes =
                    // item.full_name.toLowerCase().includes(value.toLowerCase()) ||
                    item.theme.toLowerCase().includes(value.toLowerCase())

                // item.post.toLowerCase().includes(value.toLowerCase()) ||
                // item.email.toLowerCase().includes(value.toLowerCase()) ||
                // item.age.toLowerCase().includes(value.toLowerCase()) ||
                // item.salary.toLowerCase().includes(value.toLowerCase()) ||
                // item.start_date.toLowerCase().includes(value.toLowerCase()) ||
                // status[item.status].title.toLowerCase().includes(value.toLowerCase())

                if (startsWith) {
                    return startsWith
                } else if (!startsWith && includes) {
                    return includes
                } else return null
            })
            setFilteredData(updatedData)
            setSearchValue(value)
        }
    }

    // ** Function to handle Pagination
    const handlePagination = page => {
        setCurrentPage(page.selected)
    }

    // ** Custom Pagination
    const CustomPagination = () => (
        <ReactPaginate
            previousLabel=''
            nextLabel=''
            forcePage={currentPage}
            onPageChange={page => handlePagination(page)}
            pageCount={searchValue.length ? filteredData.length / 7 : data.length / 7 || 1}
            breakLabel='...'
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName='active'
            pageClassName='page-item'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            nextLinkClassName='page-link'
            nextClassName='page-item next'
            previousClassName='page-item prev'
            previousLinkClassName='page-link'
            pageLinkClassName='page-link'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
        />
    )

    // ** Converts table to CSV
    function convertArrayOfObjectsToCSV(array) {
        let result

        const columnDelimiter = ','
        const lineDelimiter = '\n'
        const keys = Object.keys(data[0])

        result = ''
        result += keys.join(columnDelimiter)
        result += lineDelimiter

        array.forEach(item => {
            let ctr = 0
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter

                result += item[key]

                ctr++
            })
            result += lineDelimiter
        })

        return result
    }

    // ** Downloads CSV
    function downloadCSV(array) {
        const link = document.createElement('a')
        let csv = convertArrayOfObjectsToCSV(array)
        if (csv === null) return

        const filename = 'export.csv'

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`
        }

        link.setAttribute('href', encodeURI(csv))
        link.setAttribute('download', filename)
        link.click()
    }

    return (
        <Fragment>
            <Card>


                <Row className='justify-content-between mx-0'>
                    <Col className='d-flex align-items-center justify-content-start mt-1' md='6' sm='12'>
                        <Label className='mr-1' for='search-input'>
                            Recherche
                        </Label>
                        <Input
                            className='dataTable-filter mb-50'
                            type='text'
                            bsSize='sm'
                            id='search-input'
                            value={searchValue}
                            onChange={handleFilter}
                        />
                    </Col>

                </Row>
                <DataTable
                    noHeader
                    pagination
                    // actions = {}
                    // selectableRows
                    columns={columns}
                    paginationPerPage={5}
                    className='react-dataTable'
                    sortIcon={<ChevronDown size={10} />}
                    paginationDefaultPage={currentPage + 1}
                    paginationComponent={CustomPagination}
                    data={searchValue.length ? filteredData : themes}
                    selectableRowsComponent={BootstrapCheckbox}
                />
            </Card>
            <AddNewModal open={modal} handleModal={handleModal} load={load} />
        </Fragment>
    )
}

export default PropositionTable
