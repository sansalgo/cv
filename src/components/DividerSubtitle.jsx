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
    marginRight: 2
  }
})

const DividerSubtitle = ({ beforeText, afterText }) => (
  <View style={styles.container}>
    <Text>{beforeText}</Text>
    <Text style={styles.divider}>|</Text>
    <Text>{afterText}</Text>
  </View>
)

export default DividerSubtitle
