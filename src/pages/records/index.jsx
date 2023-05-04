import Record from "@/views/record";
import axios from "axios";

export default ({records}) => <Record records={records} />

export const getServerSideProps = async ({req, res}) => {
    const {data: records} = await axios.get(`http://localhost:3000/api/records`, {
      headers: {
        cookie: req.headers.cookie
      }
    })

    return {
      props: { records }
    }
}
