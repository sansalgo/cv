import { StyleSheet, View } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  section: {
    marginTop: 5
  }
})

export default ({ children }) => <View style={styles.section}>{children}</View>
