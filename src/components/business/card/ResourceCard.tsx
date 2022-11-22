import React from 'react'

import { Card, Col, Row } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { useNavigate } from 'react-router-dom'

interface PropsTypes {
  title: string
  count?: React.ReactNode
  icon: IconProp
  to: string
}

export const ResourceCard: React.FC<PropsTypes> = ({ title, count, icon, to }) => {
  let navigate = useNavigate()
  return (
    <Card
      hoverable
      style={{
        width: 200,
        marginTop: 10,
        marginLeft: 10,
      }}
      onClick={() => navigate(to)}
    >
      <Row justify='center' align='middle'>
        <Col flex={4}>
          <FontAwesomeIcon
            style={{
              fontSize: '2.0em',
              color: 'rgb(36, 66, 164)',
            }}
            icon={icon}
          />
        </Col>
        <Col flex={20}>
          <Row justify='center' align='middle'>
            <h4>{title}</h4>
          </Row>
          <Row justify='center' align='middle'>
            <h3>{count}</h3>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}
