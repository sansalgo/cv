import { StyleSheet, View, Text } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    fontFamily: 'Lato',
    fontSize: 10
  },
  point: {
    marginRight: 4,
    fontSize: 8
  }
})

const PointText = ({ children }) => (
  <View style={styles.container}>
    <Text style={styles.point}>•</Text>
    <Text>{children}</Text>
  </View>
)

export default PointText
