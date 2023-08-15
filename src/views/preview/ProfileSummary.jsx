import { View, Text, StyleSheet } from '@react-pdf/renderer'
import ConditionalRender from '@/components/ConditionalRender'
import SSContainer from '@/components/SSContainer'
import Section from '@/components/Section'
import SectionTitle from '@/components/SectionTitle'
import { useFormData } from './FormDataContext'

const styles = StyleSheet.create({
  summary: {
    fontFamily: 'Lato',
    fontStyle: 'italic',
    fontSize: 12
  }
})

const ProfileSummary = () => {
  const data = useFormData()
  return (
    <Section>
      <SectionTitle title='PROFILE SUMMARY' />
      <SSContainer>
        <ConditionalRender condition={data.profileSummary}>
          <Text style={styles.summary}>{data.profileSummary}</Text>
        </ConditionalRender>
      </SSContainer>
    </Section>
  )
}

export default ProfileSummary
