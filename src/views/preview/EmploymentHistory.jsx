import { View, Text, StyleSheet } from '@react-pdf/renderer'
import DividerSubtitle from '@/components/DividerSubtitle'
import SectionTitle from '@/components/SectionTitle'
import DatePlaceRow from '@/components/DatePlaceRow'
import DashedDivider from '@/components/DashedDivider'
import Section from '@/components/Section'
import SSContainer from '@/components/SSContainer'
import { Fragment } from 'react'
import { useFormData } from './FormDataContext'
import ConditionalRender from '@/components/ConditionalRender'

const styles = StyleSheet.create({
  description: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontSize: 10
  },
  datePlaceRow: {
    marginTop: 4
  }
})

const EmploymentHistory = () => {
  const data = useFormData()
  return (
    <Section>
      <SectionTitle title='EMPLOYMENT HISTORY' />
      {data.employmentHistory.map((value, index) => (
        <Fragment key={index}>
          <SSContainer>
            <ConditionalRender condition={value.position}>
              <ConditionalRender condition={value.companyName}>
                <DividerSubtitle beforeText={value.position} afterText={value.companyName} />
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
            <ConditionalRender condition={value.description}>
              <View style={styles.description}>
                <Text>Description:</Text>
                <Text>{value.description}</Text>
              </View>
            </ConditionalRender>
          </SSContainer>
          {index !== data.employmentHistory.length - 1 && <DashedDivider />}
        </Fragment>
      ))}
    </Section>
  )
}

export default EmploymentHistory
