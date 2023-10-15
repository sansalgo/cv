import { StyleSheet, View, Text } from '@react-pdf/renderer'
import Container from './components/Container'
import PointText from './components/PointText'
import Section from './components/Section'
import SectionTitle from './components/SectionTitle'
import { usePDFData } from './PDFDataContext'

const styles = StyleSheet.create({})

const Languages = () => {
  const { languages } = usePDFData()
  return (
    <Section>
      <SectionTitle title='LANGUAGES' />
      <Container>
        {languages.map((l, i) => (
          <PointText key={i} text={l} />
        ))}
      </Container>
    </Section>
  )
}

export default Languages
