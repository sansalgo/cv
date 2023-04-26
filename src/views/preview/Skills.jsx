import { StyleSheet, View, Text } from '@react-pdf/renderer'
import { Fragment } from 'react'
import ConditionalRender from './components/ConditionalRender'
import Container from './components/Container'
import Section from './components/Section'
import SectionTitle from './components/SectionTitle'
import { useFormData } from './FormDataContext'

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
    borderColor: 'black',
    borderRadius: 4,
    margin: 1
  }
})

export default () => {
  const data = useFormData()
  return (
    <Section>
      <SectionTitle title='SKILLS' />
      <Container>
        <View style={styles.container}>
          <ConditionalRender value={data.skills}>
            {data.skills.map((value, index) => (
              <Fragment key={index}>{value.value && <Text style={styles.roundedLabel}>{value.value}</Text>}</Fragment>
            ))}
          </ConditionalRender>
        </View>
      </Container>
    </Section>
  )
}
