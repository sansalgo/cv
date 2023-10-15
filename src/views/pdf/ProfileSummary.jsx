import palette from '@/theme/palette'
import { StyleSheet, Text } from '@react-pdf/renderer'
import { usePDFData } from './PDFDataContext'
import Container from './components/Container'
import Section from './components/Section'
import SectionTitle from './components/SectionTitle'

const styles = StyleSheet.create({
  summary: {
    fontFamily: 'Lato',
    fontStyle: 'italic',
    fontSize: 12,
    color: palette.blue
  }
})

const ProfileSummary = () => {
  const { profileSummary } = usePDFData()
  return (
    <Section>
      <SectionTitle title='PROFILE SUMMARY' />
      <Container>
        <Text style={styles.summary}>{profileSummary}</Text>
      </Container>
    </Section>
  )
}

export default ProfileSummary
