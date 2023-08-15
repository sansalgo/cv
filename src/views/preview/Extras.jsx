import { StyleSheet, View, Text } from '@react-pdf/renderer'
import { Fragment } from 'react'
import ConditionalRender from '@/components/ConditionalRender'
import SSContainer from '@/components/SSContainer'
import PointText from '@/components/PointText'
import Section from '@/components/Section'
import SectionTitle from '@/components/SectionTitle'
import { useFormData } from './FormDataContext'

const styles = StyleSheet.create({})

const Extras = () => {
  const data = useFormData()
  return (
    <Section>
      <SectionTitle title='EXTRAS' />
      <SSContainer>
        <ConditionalRender condition={data.extras}>
          {data.extras.map((value, index) => (
            <Fragment key={index}>{value.value && <PointText>{value.value}</PointText>}</Fragment>
          ))}
        </ConditionalRender>
      </SSContainer>
    </Section>
  )
}

export default Extras
