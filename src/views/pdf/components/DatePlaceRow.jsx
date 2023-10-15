import { StyleSheet, View, Text } from '@react-pdf/renderer'
import IconText from './IconText'
import palette from '@/theme/palette'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 2
  },
  date: {
    width: '45%',
    color: palette.gray.dark
  },
  place: {
    color: palette.gray.dark
  }
})

export default ({ date, place, style = {} }) => (
  <View style={{ ...styles.container, ...style }}>
    <IconText style={styles.date} icon='calendar' text={date} />
    <IconText style={styles.place} icon='location-pin' text={place} />
  </View>
)
