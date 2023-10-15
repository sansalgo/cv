import palette from '@/theme/palette'
import { Text, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  title: {
    fontFamily: 'RobotoSlab',
    fontStyle: 'bold',
    fontSize: 17,
    borderBottomWidth: 3,
    color: palette.primary.main,
    borderColor: palette.orange
  }
})

export default ({ title }) => <Text style={styles.title}>{title}</Text>
