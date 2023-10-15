import palette from '@/theme/palette'
import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { usePDFData } from './PDFDataContext'
import IconText from './components/IconText'

const styles = StyleSheet.create({
  name: {
    fontFamily: 'RobotoSlab',
    fontStyle: 'bold',
    fontSize: 24.5,
    color: palette.primary.main,
    textTransform: 'uppercase'
  },
  position: {
    fontFamily: 'Lato',
    fontStyle: 'bold',
    fontSize: 12,
    color: palette.primary.main,
    textTransform: 'uppercase'
  },
  contact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5
  }
})

const Intro = () => {
  const { intro } = usePDFData()

  return (
    <View>
      <Text style={styles.name}>
        {intro.firstName} {intro.lastName}
      </Text>
      <Text style={styles.position}>{intro.position}</Text>
      <View style={styles.contact}>
        <IconText icon='@' text={intro.email} />
        <IconText icon='phone-flip' text={intro.phone} />
        <IconText icon='location-pin' text={intro.city} />
        <IconText icon='linkedin' text={intro.linkedin} fontStyle='brand' />
        <IconText icon='github' text={intro.github} fontStyle='brand' />
      </View>
    </View>
  )
}

export default Intro
