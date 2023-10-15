import palette from '@/theme/palette'
import { StyleSheet, View, Text } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1,
    borderBottomStyle: 'dashed',
    marginTop: 2,
    marginBottom: 5,
    borderColor: palette.gray.main
  }
})

export default () => <View style={styles.divider} />
