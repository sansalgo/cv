import { StyleSheet, View, Text } from '@react-pdf/renderer'
import Container from './components/Container'
import PointText from './components/PointText'
import Section from './components/Section'
import SectionTitle from './components/SectionTitle'

const styles = StyleSheet.create({})

export default () => (
  <Section>
    <SectionTitle title='LANGUAGES' />
    <Container>
      <PointText>Tamil</PointText>
      <PointText>English</PointText>
    </Container>
  </Section>
)
