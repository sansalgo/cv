import { StyleSheet, View, Text } from '@react-pdf/renderer'
import DatePlaceRow from './components/DatePlaceRow'
import DividerSubtitle from './components/DividerSubtitle'
import PointText from './components/PointText'
import SectionTitle from './components/SectionTitle'
import DashedDivider from './components/DashedDivider'
import Section from './components/Section'
import Container from './components/Container'

const styles = StyleSheet.create({
  datePlaceRow: {
    marginTop: 4
  }
})

export default () => (
  <Section>
    <SectionTitle title='EDUCATION' />
    <Container>
      <DividerSubtitle beforeText='B.Sc(Mathematics)' afterText='Park’s College' />
      <DatePlaceRow style={styles.datePlaceRow} date='Jun 2019 – Present' place='Tiruppur, Tamilnadu' />
      <PointText>Percentage : 80</PointText>
    </Container>
    <Container>
      <DashedDivider />
      <DividerSubtitle beforeText='BE(CSE)' afterText='Karpagam College of Engineering' />
      <DatePlaceRow style={styles.datePlaceRow} date='Jun 2019 – Present' place='Tiruppur, Tamilnadu' />
      <PointText>Percentage : 80</PointText>
    </Container>
    <Container>
      <DashedDivider />
      <DividerSubtitle beforeText='HSC ' afterText='Sasurie vidhya bhavan matriculation higher secondary school' />
      <DatePlaceRow style={styles.datePlaceRow} date='Jun 2019 – Present' place='Tiruppur, Tamilnadu' />
      <PointText>Percentage : 80</PointText>
    </Container>
    <Container>
      <DashedDivider />
      <DividerSubtitle beforeText='B.Sc(Mathematics) ' afterText=' Park’s College' />
      <DatePlaceRow style={styles.datePlaceRow} date='Jun 2019 – Present' place='Tiruppur, Tamilnadu' />
      <PointText>Percentage : 80</PointText>
    </Container>
  </Section>
)
