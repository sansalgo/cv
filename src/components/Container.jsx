import { StyleSheet, View } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  container: {
    marginTop: 4
  }
})

const Container = ({ children }) => <View style={styles.container}>{children}</View>

export default Container
