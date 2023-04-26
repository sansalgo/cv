import { StyleSheet, View, Text } from '@react-pdf/renderer'
import { Fragment } from 'react'
import ConditionalRender from './components/ConditionalRender'
import Container from './components/Container'
import PointText from './components/PointText'
import Section from './components/Section'
import SectionTitle from './components/SectionTitle'
import { useFormData } from './FormDataContext'

const styles = StyleSheet.create({})

export default () => {
  const data = useFormData()
  return (
    <Section>
      <SectionTitle title='PROJECTS' />
      <Container>
        <ConditionalRender value={data.projects}>
          {data.projects.map((value, index) => (
            <Fragment key={index}>{value.value && <PointText>{value.value}</PointText>}</Fragment>
          ))}
        </ConditionalRender>
      </Container>
    </Section>
  )
}
