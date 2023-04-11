import { View, Text, StyleSheet } from '@react-pdf/renderer'
import DividerSubtitle from './components/DividerSubtitle'
import SectionTitle from './components/SectionTitle'
import DatePlaceRow from './components/DatePlaceRow'
import DashedDivider from './components/DashedDivider'
import Section from './components/Section'
import Container from './components/Container'

const styles = StyleSheet.create({
  description: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontSize: 10
  },
  datePlaceRow: {
    marginTop: 4
  }
})

export default () => (
  <Section>
    <SectionTitle title='EMPLOYMENT HISTORY' />
    <Container>
      <DividerSubtitle beforeText='MEAN/MERN Stack Developer' afterText='Phicode' />
      <DatePlaceRow style={styles.datePlaceRow} date='Nov 2021 – Present' place='Coimbatore, Tamilnadu' />
      <View style={styles.description}>
        <Text>Description:</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem autem molestiae voluptate adipisci inventore
          maiores, tenetur cupiditate natus quis sapiente, soluta delectus minima nemo totam eligendi atque. Minima,
          assumenda quidem
        </Text>
      </View>
    </Container>
    <Container>
      <DashedDivider />
      <DividerSubtitle beforeText='MEAN/MERN Stack Developer' afterText='Phicode' />
      <DatePlaceRow style={styles.datePlaceRow} date='Nov 2021 – Present' place='Coimbatore, Tamilnadu' />
      <View style={styles.description}>
        <Text>Description:</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem autem molestiae voluptate adipisci inventore
          maiores, tenetur cupiditate natus quis sapiente, soluta delectus minima nemo totam eligendi atque. Minima,
          assumenda quidem
        </Text>
      </View>
    </Container>
  </Section>
)
