import { View, Text, StyleSheet } from '@react-pdf/renderer'
import ConditionalRender from './components/ConditionalRender'
import Container from './components/Container'
import Section from './components/Section'
import SectionTitle from './components/SectionTitle'
import { useFormData } from './FormDataContext'

const styles = StyleSheet.create({
  summary: {
    fontFamily: 'Lato',
    fontStyle: 'italic',
    fontSize: 12
  }
})

export default () => {
  const data = useFormData()
  return (
    <Section>
      <SectionTitle title='PROFILE SUMMARY' />
      <Container>
        <ConditionalRender value={data.profileSummary}>
          <Text style={styles.summary}>{data.profileSummary}</Text>
        </ConditionalRender>
      </Container>
    </Section>
  )
}
