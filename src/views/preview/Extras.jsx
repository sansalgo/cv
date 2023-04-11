import { StyleSheet, View, Text } from '@react-pdf/renderer'
import Container from './components/Container'
import PointText from './components/PointText'
import Section from './components/Section'
import SectionTitle from './components/SectionTitle'

const styles = StyleSheet.create({})

export default () => (
  <Section>
    <SectionTitle title='EXTRAS' />
    <Container>
      <PointText>Smart working</PointText>
      <PointText>Team managemen</PointText>
      <PointText>Team work</PointText>
      <PointText>Self Confidence</PointText>
      <PointText>Soft skills</PointText>
    </Container>
  </Section>
)
