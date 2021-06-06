import classnames from 'classnames'
import Avatar from '@components/avatar'
import { TrendingUp, Send, Globe, Layout } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Media } from 'reactstrap'

const StatsCard = ({ cols, props }) => {
  console.log(props)
  const data = [
    {
      title: props.depCount,
      subtitle: 'Departments',
      color: 'light-primary',
      icon: <Layout size={24} />
    },
    {
      title: props.dirCount,
      subtitle: 'Directions',
      color: 'light-info',
      icon: <Send size={24} />
    },
    {
      title: props.divCount,
      subtitle: 'Diviisons',
      color: 'light-danger',
      icon: <TrendingUp size={24} />
    },
    {
      title: props.serCount,
      subtitle: 'Services',
      color: 'light-success',
      icon: <Globe size={24} />
    }
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const margin = Object.keys(cols)
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin[0]}-0`]: index !== data.length - 1
          })}
        >
          <Media>
            <Avatar color={item.color} icon={item.icon} className='mr-2' />
            <Media className='my-auto' body>
              <h4 className='font-weight-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </Media>
          </Media>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'>Nombre totale</CardTitle>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
