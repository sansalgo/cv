import { StyleSheet, View, Text } from '@react-pdf/renderer'
import Container from './components/Container'
import PointText from './components/PointText'
import Section from './components/Section'
import SectionTitle from './components/SectionTitle'
import { usePDFData } from './PDFDataContext'

const Extras = () => {
  const { extras } = usePDFData()
  return (
    <Section>
      <SectionTitle title='EXTRAS' />
      <Container>
        {extras.map((e, i) => (
          <PointText key={i} text={e} />
        ))}
      </Container>
    </Section>
  )
}

export default Extras
