import { StyleSheet, View, Text } from '@react-pdf/renderer'
import Container from './components/Container'
import Section from './components/Section'
import SectionTitle from './components/SectionTitle'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  roundedLabel: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontSize: 10,
    padding: 3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 4,
    margin: 1
  }
})

export default () => (
  <Section>
    <SectionTitle title='SKILLS' />
    <Container>
      <View style={styles.container}>
        <Text style={styles.roundedLabel}>HTML5</Text>
        <Text style={styles.roundedLabel}>CSS3</Text>
        <Text style={styles.roundedLabel}>REACTJS</Text>
        <Text style={styles.roundedLabel}>TYPESCRIPT</Text>
        <Text style={styles.roundedLabel}>JAVASCRIPT</Text>
        <Text style={styles.roundedLabel}>ANGULAR2+</Text>
        <Text style={styles.roundedLabel}>FIREBASE+</Text>
        <Text style={styles.roundedLabel}>NODEJS</Text>
        <Text style={styles.roundedLabel}>EXPRESSJS</Text>
        <Text style={styles.roundedLabel}>basics of Photoshop cs3</Text>
        <Text style={styles.roundedLabel}>MONGODB</Text>
      </View>
    </Container>
  </Section>
)
