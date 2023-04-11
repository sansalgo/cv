import { StyleSheet, View, Text } from '@react-pdf/renderer'
import Container from './components/Container'
import PointText from './components/PointText'
import Section from './components/Section'
import SectionTitle from './components/SectionTitle'

const styles = StyleSheet.create({})

export default () => (
  <Section>
    <SectionTitle title='PROJECTS' />
    <Container>
      <PointText>IssueTracker using react, redux, bootstrap and firebase</PointText>
      <PointText>GoogleTasks clone using react and redux</PointText>
      <PointText>CovidTracker using react, redux, axios and chart.js</PointText>
      <PointText>E-commerce website using react, contextApi</PointText>
      <PointText>kindly check my above mentioned github for more projects and code structure</PointText>
    </Container>
  </Section>
)
