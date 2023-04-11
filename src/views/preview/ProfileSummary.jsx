import { View, Text, StyleSheet } from '@react-pdf/renderer'
import Container from './components/Container'
import Section from './components/Section'
import SectionTitle from './components/SectionTitle'

const styles = StyleSheet.create({
  summary: {
    fontFamily: 'Lato',
    fontStyle: 'italic',
    fontSize: 12
  }
})

export default () => (
  <Section>
    <SectionTitle title='PROFILE SUMMARY' />
    <Container>
      <Text style={styles.summary}>
        I am a self taught MERN/MEAN stack developer with two years of hands-on experience and one year of industrial
        experience of designing, development and implementing applications and solutions using a range of technologies
        and programming languages
      </Text>
    </Container>
  </Section>
)
