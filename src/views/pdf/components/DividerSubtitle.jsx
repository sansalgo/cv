import palette from '@/theme/palette'
import { View, Text, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontSize: 12,
    alignItems: 'center'
  },
  divider: {
    marginLeft: 2,
    marginRight: 2,
    color: palette.blue
  },
  beforeText: {
    color: palette.gray.dark
  },
  afterText: {
    color: palette.blue
  }
})

export default ({ beforeText, afterText }) => (
  <View style={styles.container}>
    <Text style={styles.beforeText}>{beforeText}</Text>
    <Text style={styles.divider}>|</Text>
    <Text style={styles.afterText}>{afterText}</Text>
  </View>
)
