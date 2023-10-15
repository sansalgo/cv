import { StyleSheet, View, Text } from '@react-pdf/renderer'
import Container from './components/Container'
import Section from './components/Section'
import SectionTitle from './components/SectionTitle'
import palette from '@/theme/palette'
import { usePDFData } from './PDFDataContext'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  roundedLabel: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontSize: 10,
    padding: 3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: palette.gray.main,
    borderRadius: 4,
    margin: 1
  }
})

const Skills = () => {
  const { skills } = usePDFData()
  return (
    <Section>
      <SectionTitle title='SKILLS' />
      <Container>
        <View style={styles.container}>
          {skills.map((s, i) => (
            <Text key={i} style={styles.roundedLabel}>
              {s}
            </Text>
          ))}
        </View>
      </Container>
    </Section>
  )
}

export default Skills
