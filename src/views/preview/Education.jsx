import { StyleSheet, View, Text } from '@react-pdf/renderer'
import DatePlaceRow from '@/components/DatePlaceRow'
import DividerSubtitle from '@/components/DividerSubtitle'
import PointText from '@/components/PointText'
import SectionTitle from '@/components/SectionTitle'
import DashedDivider from '@/components/DashedDivider'
import Section from '@/components/Section'
import Container from '@/components/Container'
import { useFormData } from './FormDataContext'
import { Fragment } from 'react'
import ConditionalRender from '@/components/ConditionalRender'

const styles = StyleSheet.create({
  datePlaceRow: {
    marginTop: 4
  }
})

const Education = () => {
  const data = useFormData()
  return (
    <Section>
      <SectionTitle title='EDUCATION' />
      <ConditionalRender value={data.education}>
        {data.education.map((value, index) => (
          <Fragment key={index}>
            <Container>
              <ConditionalRender value={value.course}>
                <ConditionalRender value={value.institution}>
                  <DividerSubtitle beforeText={value.course} afterText={value.institution} />
                </ConditionalRender>
              </ConditionalRender>
              <ConditionalRender value={value.startDate}>
                <ConditionalRender value={value.endDate}>
                  <ConditionalRender value={value.location}>
                    <DatePlaceRow
                      style={styles.datePlaceRow}
                      date={`${value.startDate} - ${value.endDate}`}
                      place={value.location}
                    />
                  </ConditionalRender>
                </ConditionalRender>
              </ConditionalRender>
              <ConditionalRender value={value.percentage}>
                <PointText>Percentage : {value.percentage}</PointText>
              </ConditionalRender>
            </Container>
            {index !== data.education.length - 1 && <DashedDivider />}
          </Fragment>
        ))}
      </ConditionalRender>
    </Section>
  )
}

export default Education
