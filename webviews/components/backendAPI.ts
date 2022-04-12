import axios from 'axios';
import { AdaptorFileCreator } from './adaptorFileCreator';

export async function getData() {

type responseData = {
  id: number;
  transcription: string;
  code_modification: [];
};

type GetDataResponse = {
  data: responseData[];
};
  try {
    //const data: GetUsersResponse
    const { data, status } = await axios.get<GetDataResponse>(
      'http://localhost:8080/begin-pipeline',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

  //  let URI = "Users/hirush/desktop/hospital/hospital/MainClass.java";
  //  const adapter = new AdaptorFileCreator(URI);
    console.log(JSON.stringify(data, null, 4));

    //response status is: 200
    console.log('response status is: ', status);

    return data;

  } catch (error) {

    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;

    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}
