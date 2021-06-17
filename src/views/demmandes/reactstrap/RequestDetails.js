import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Timeline from '@components/timeline'
import { List, MoreVertical } from 'react-feather'
import moment from 'moment'
import { TabContent, TabPane, Nav, NavItem, NavLink, ListGroup, ListGroupItem, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'

const avatarGroupArr = [
    {
        title: 'Billy Hopkins',
        img: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default,
        placement: 'bottom',
        imgHeight: 33,
        imgWidth: 33
    },
    {
        title: 'Amy Carson',
        img: require('@src/assets/images/portrait/small/avatar-s-6.jpg').default,
        placement: 'bottom',
        imgHeight: 33,
        imgWidth: 33
    },
    {
        title: 'Brandon Miles',
        img: require('@src/assets/images/portrait/small/avatar-s-8.jpg').default,
        placement: 'bottom',
        imgHeight: 33,
        imgWidth: 33
    },
    {
        title: 'Daisy Weber',
        img: require('@src/assets/images/portrait/small/avatar-s-7.jpg').default,
        placement: 'bottom',
        imgHeight: 33,
        imgWidth: 33
    },
    {
        title: 'Jenny Looper',
        img: require('@src/assets/images/portrait/small/avatar-s-20.jpg').default,
        placement: 'bottom',
        imgHeight: 33,
        imgWidth: 33
    }
]

const data = [
    // {
    //     title: '12 Invoices have been paid',
    //     content: 'Invoices have been paid to the company.',
    //     meta: '12 min ago',
    //     metaClassName: 'mr-1',
    //     customContent: (
    //         <Media>
    //             <img className='mr-1' src={jsonImg} alt='data.json' height='23' />
    //             <Media className='mb-0' body>
    //                 data.json
    //       </Media>
    //         </Media>
    //     )
    // },

    {
        title: 'Create a new project for client',
        content: 'Add files to new design folder',
        color: 'danger',
        meta: '5 days ago',
        metaClassName: 'mr-1'
    }
]

const RequestDetails = () => {
    const [historydata, setHistorydata] = useState([])
    // var historyData = []
    const { id } = useParams()
    const [active, setActive] = useState('1')
    const [request, setRequest] = useState()
    const [isLoading, setIsLoading] = useState(true)

    async function loadRequest() {

        await axios.get(`https://pfe-cims.herokuapp.com/request/${id}`)
            .then(res => {
                setRequest(res.data)
                res.data.history.slice(0).reverse().map(hi => {
                    setHistorydata(arr => {
                        return [
                            ...arr,
                            {
                                id: hi._id,
                                title: hi.title,
                                content: hi.message,
                                color: 'danger',
                                meta: moment(hi.writedAt).fromNow(),
                                metaClassName: 'mr-1'
                            }
                        ]
                    }
                    )
                }
                )
                setIsLoading(false)
            }).catch(error => alert(`errror ==> ${error.message}`))
    }

    useEffect(() => {
        loadRequest()
    }, [])

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    if (isLoading) {
        return <span></span>
    }

    return (
        <React.Fragment >
            <Nav tabs >
                <NavItem>
                    <NavLink
                        active={active === '1'}
                        onClick={() => {
                            toggle('1')
                        }} >
                        Details
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={active === '2'}
                        onClick={() => {
                            toggle('2')
                        }}
                    >
                        History
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent className='py-50' activeTab={active} >
                <TabPane tabId='1'>

                    <ListGroup flush>
                        <ListGroupItem>Nom : {request.nomDem}</ListGroupItem>
                        <ListGroupItem>Prenom: {request.prenomDem}</ListGroupItem>
                        <ListGroupItem>Email: {request.emailDem}</ListGroupItem>
                        <ListGroupItem>Theme: {request.themeDem}</ListGroupItem>
                        <ListGroupItem>Status: {request.name}</ListGroupItem>
                        <ListGroupItem>Date: {request.dateDem}</ListGroupItem>
                        <ListGroupItem>Department: {request.dep_name}</ListGroupItem>
                        <ListGroupItem>Direction: {request.dir_name}</ListGroupItem>
                        <ListGroupItem>Dividion: {request.div_name}</ListGroupItem>
                        <ListGroupItem>Service: {request.ser_name}</ListGroupItem>
                    </ListGroup>

                </TabPane>
                <TabPane tabId='2'>
                    <Card className='card-user-timeline'>
                        <CardHeader>
                            <div className='d-flex align-items-center'>
                                <List className='user-timeline-title-icon' />
                                <CardTitle tag='h4'>Historique</CardTitle>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Timeline className='ml-50 mb-0' data={historydata} />
                        </CardBody>
                    </Card>
                </TabPane>
            </TabContent>
        </React.Fragment>
    )
}
export default RequestDetails