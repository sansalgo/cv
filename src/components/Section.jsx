import { StyleSheet, View } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  section: {
    marginTop: 4
  }
})

const Section = ({ children }) => <View style={styles.section}>{children}</View>

export default Section
