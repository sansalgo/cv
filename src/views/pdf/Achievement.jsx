import { StyleSheet, View, Text } from '@react-pdf/renderer'
import Container from './components/Container'
import PointText from './components/PointText'
import Section from './components/Section'
import SectionTitle from './components/SectionTitle'
import { usePDFData } from './PDFDataContext'

const styles = StyleSheet.create({})

const Achievement = () => {
  const { achievement } = usePDFData()
  return (
    <Section>
      <SectionTitle title='ACHIEVEMENT' />
      <Container>
        {achievement.map((a, i) => (
          <PointText key={i} text={a} />
        ))}
      </Container>
    </Section>
  )
}

export default Achievement
