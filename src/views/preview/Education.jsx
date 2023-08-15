import { StyleSheet, View, Text } from '@react-pdf/renderer'
import DatePlaceRow from '@/components/DatePlaceRow'
import DividerSubtitle from '@/components/DividerSubtitle'
import PointText from '@/components/PointText'
import SectionTitle from '@/components/SectionTitle'
import DashedDivider from '@/components/DashedDivider'
import Section from '@/components/Section'
import SSContainer from '@/components/SSContainer'
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
      <ConditionalRender condition={data.education}>
        {data.education.map((value, index) => (
          <Fragment key={index}>
            <SSContainer>
              <ConditionalRender condition={value.course}>
                <ConditionalRender condition={value.institution}>
                  <DividerSubtitle beforeText={value.course} afterText={value.institution} />
                </ConditionalRender>
              </ConditionalRender>
              <ConditionalRender condition={value.startDate}>
                <ConditionalRender condition={value.endDate}>
                  <ConditionalRender condition={value.location}>
                    <DatePlaceRow
                      style={styles.datePlaceRow}
                      date={`${value.startDate} - ${value.endDate}`}
                      place={value.location}
                    />
                  </ConditionalRender>
                </ConditionalRender>
              </ConditionalRender>
              <ConditionalRender condition={value.percentage}>
                <PointText>Percentage : {value.percentage}</PointText>
              </ConditionalRender>
            </SSContainer>
            {index !== data.education.length - 1 && <DashedDivider />}
          </Fragment>
        ))}
      </ConditionalRender>
    </Section>
  )
}

export default Education
