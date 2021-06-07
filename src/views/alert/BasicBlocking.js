import { useState } from 'react'
import UILoader from '@components/ui-loader'
import { Card, CardHeader, CardTitle, CardText, CardBody, Button } from 'reactstrap'

const BasicBlocking = ({ props }) => {
  const [block, setBlock] = useState(false)

  const handleBlock = () => {
    setBlock(true)

    setTimeout(() => {
      setBlock(false)
    }, 2000)
  }

  return (
    <UILoader blocking={block}>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>{props.by}</CardTitle>

        </CardHeader>
        <CardBody>
          <CardText>
            {props.content}
          </CardText>

        </CardBody>
      </Card>
    </UILoader>
  )
}

export default BasicBlocking
