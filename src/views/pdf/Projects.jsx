import { StyleSheet, View, Text } from '@react-pdf/renderer'
import Container from './components/Container'
import PointText from './components/PointText'
import Section from './components/Section'
import SectionTitle from './components/SectionTitle'
import { usePDFData } from './PDFDataContext'

const styles = StyleSheet.create({})

const Projects = () => {
  const { projects } = usePDFData()
  return (
    <Section>
      <SectionTitle title='PROJECTS' />
      <Container>
        {projects.map((p, i) => (
          <PointText key={i} text={p} />
        ))}
      </Container>
    </Section>
  )
}

export default Projects
