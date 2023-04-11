import { Page, StyleSheet, View, Document, PDFViewer, Font } from '@react-pdf/renderer'
import Info from './Info'
import RobotoSlabBold from '../../../public/fonts/roboto-slab/RobotoSlab-Bold.ttf'
import LatoRegular from '../../../public/fonts/lato/Lato-Regular.ttf'
import LatoBold from '../../../public/fonts/lato/Lato-Bold.ttf'
import LatoItalic from '../../../public/fonts/lato/Lato-Italic.ttf'
import FontAwesomeBrandsRegular from '../../../public/fonts/font-awesome/Font-Awesome-6-Brands-Regular-400.otf'
import FontAwesomeSolid from '../../../public/fonts/font-awesome/Font-Awesome-6-Free-Solid-900.otf'
import ProfileSummary from './ProfileSummary'
import EmploymentHistory from './EmploymentHistory'
import Education from './Education'
import Extras from './Extras'
import Skills from './Skills'
import Projects from './Projects'
import Languages from './Languages'
import Achievement from './Achievement'

Font.register({
  family: 'RobotoSlab',
  fonts: [{ src: RobotoSlabBold, fontStyle: 'bold' }]
})

Font.register({
  family: 'Lato',
  fonts: [
    { src: LatoRegular, fontStyle: 'normal' },
    { src: LatoBold, fontStyle: 'bold' },
    { src: LatoItalic, fontStyle: 'italic' }
  ]
})

Font.register({
  family: 'FontAwesome',
  fonts: [
    { src: FontAwesomeSolid, fontStyle: 'solid' },
    { src: FontAwesomeBrandsRegular, fontStyle: 'brand' }
  ]
})

const styles = StyleSheet.create({
  page: {
    padding: 30
  },
  container: {
    flexDirection: 'row'
  },
  columnLeft: {
    flexDirection: 'column',
    width: '30%',
    paddingRight: 15
  },
  columnRight: {
    width: '70%',
    flexDirection: 'column'
  }
})

export default () => (
  <PDFViewer width={900} height={900}>
    <Document>
      <Page size='A4' style={styles.page}>
        <Info />
        <View style={styles.container}>
          <View style={styles.columnLeft}>
            <Skills />
            <Projects />
            <Languages />
            <Achievement />
          </View>
          <View style={styles.columnRight}>
            <ProfileSummary />
            <EmploymentHistory />
            <Education />
            <Extras />
          </View>
        </View>
      </Page>
    </Document>
  </PDFViewer>
)
