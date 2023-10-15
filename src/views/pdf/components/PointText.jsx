import { StyleSheet, Text, View } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    fontSize: 10,
    marginTop: 2
  },
  point: {
    marginRight: 5
  },
  textContainer: {
    flex: 1
  }
})

export default ({ text, style = {} }) => (
  <View style={{ ...styles.container, ...style }}>
    <Text style={styles.point}>•</Text>
    <View style={styles.textContainer}>
      <Text>{text}</Text>
    </View>
  </View>
)
