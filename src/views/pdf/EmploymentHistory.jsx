import { View, Text, StyleSheet } from '@react-pdf/renderer'
import DividerSubtitle from './components/DividerSubtitle'
import SectionTitle from './components/SectionTitle'
import DatePlaceRow from './components/DatePlaceRow'
import DashedDivider from './components/DashedDivider'
import Section from './components/Section'
import Container from './components/Container'
import { usePDFData } from './PDFDataContext'
import { formatMonthYear } from './utils'

const styles = StyleSheet.create({
  description: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontSize: 10
  }
})

const EmploymentHistory = () => {
  const { employmentHistory } = usePDFData()
  return (
    <Section>
      <SectionTitle title='EMPLOYMENT HISTORY' />
      {employmentHistory.map(eh => (
        <Container key={eh._id}>
          <DividerSubtitle beforeText={eh.position} afterText={eh.companyName} />
          <DatePlaceRow
            style={styles.datePlaceRow}
            date={`${formatMonthYear(eh.startDate)} - ${formatMonthYear(eh.endDate)}`}
            place={eh.location}
          />
          <View style={styles.description}>
            <Text>Description:</Text>
            <Text>{eh.description}</Text>
          </View>
        </Container>
      ))}
    </Section>
  )
}

export default EmploymentHistory
