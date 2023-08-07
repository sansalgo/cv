import Preview from '@/views/preview'

export default Preview

// export const getServerSideProps = async ({ req }) => {
//   const { data } = await axios.get(`http://localhost:3000/api/pdf`, {
//     headers: {
//       cookie: req.headers.cookie
//     }
//   })

//   // // const arrayPdf = data.arrayBuffer()

//   // const pdfBlob = new Blob([new Uint8Array(data)], { type: 'application/pdf' })

//   // const pdfBlobURL = URL.createObjectURL(pdfBlob)

//   // console.log(pdfBlobURL)

//   return {
//     props: { data }
//   }
// }
