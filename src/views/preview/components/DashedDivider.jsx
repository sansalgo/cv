import { StyleSheet, View, Text } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1,
    borderBottomStyle: 'dashed',
    marginTop: 8,
    marginBottom: 8
  }
})

export default () => <View style={styles.divider} />
