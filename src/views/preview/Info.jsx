import { View, Text, StyleSheet } from '@react-pdf/renderer'
import IconText from './components/IconText'

const styles = StyleSheet.create({
  name: {
    fontFamily: 'RobotoSlab',
    fontStyle: 'bold',
    fontSize: 25
  },
  subtitle: {
    fontFamily: 'Lato',
    fontStyle: 'bold',
    fontSize: 12
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4
  }
})

export default () => (
  <View>
    <Text style={styles.name}>RAJKUMAR</Text>
    <Text style={styles.subtitle}>MERN/MEAN STACK DEVELOPER</Text>
    <View style={styles.list}>
      <IconText icon='@' text='rajkumarpandiaraj@gmail.com' />
      <IconText icon='phone-flip' text='8610111861' />
      <IconText icon='location-pin' text='Tiruppur, Tamilnadu' />
      <IconText icon='linkedin' text='https://www.linkedin.com/in/rajkumar-pandiaraj-0b55931a7' fontStyle='brand' />
      <IconText icon='github' text='https://github.com/rajkumarpandiaraj' fontStyle='brand' />
    </View>
  </View>
)
