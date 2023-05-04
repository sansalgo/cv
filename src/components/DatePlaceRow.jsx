import { StyleSheet, View, Text } from '@react-pdf/renderer'
import IconText from './IconText'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  date: {
    width: '45%'
  }
})

const DatePlaceRow = ({ date, place, style = {} }) => (
  <View style={{ ...styles.container, ...style }}>
    <IconText style={styles.date} icon='calendar' text={date} />
    <IconText icon='location-pin' text={place} />
  </View>
)

export default DatePlaceRow
