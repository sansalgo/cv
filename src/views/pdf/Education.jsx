import { usePDFData } from './PDFDataContext'
import Container from './components/Container'
import DashedDivider from './components/DashedDivider'
import DatePlaceRow from './components/DatePlaceRow'
import DividerSubtitle from './components/DividerSubtitle'
import PointText from './components/PointText'
import Section from './components/Section'
import SectionTitle from './components/SectionTitle'
import { formatMonthYear } from './utils'

const Education = () => {
  const { education } = usePDFData()
  return (
    <Section>
      <SectionTitle title='EDUCATION' />
      {education.map(e => (
        <Container key={e._id}>
          <DividerSubtitle beforeText={e.course} afterText={e.institution} />
          <DatePlaceRow
            date={`${formatMonthYear(e.startDate)} - ${formatMonthYear(e.endDate)}`}
            place={`${e.location}`}
          />
          <PointText text={`Percentage : ${e.percentage}`} />
        </Container>
      ))}
    </Section>
  )
}

export default Education
