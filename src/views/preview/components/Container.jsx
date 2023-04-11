import { StyleSheet, View } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  container: {
    marginTop: 4
  }
})

export default ({ children }) => <View style={styles.container}>{children}</View>
