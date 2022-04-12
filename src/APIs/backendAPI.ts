// import axios from 'axios';

// type responseData = {
//   id: number;
//   transcription: string;
//   code_modification: [];
// };

// type GetDataResponse = {
//   data: responseData[];
// };

// export async function getData() {
//   try {
//     //const data: GetUsersResponse
//     const { data, status } = await axios.get<GetDataResponse>(
//       'http://localhost:8080/begin-pipeline',
//       {
//         headers: {
//           Accept: 'application/json',
//         },
//       },
//     );

//     console.log(JSON.stringify(data, null, 4));

//     //response status is: 200
//     console.log('response status is: ', status);

//     return data;

//   } catch (error) {

//     if (axios.isAxiosError(error)) {
//       console.log('error message: ', error.message);
//       return error.message;

//     } else {
//       console.log('unexpected error: ', error);
//       return 'An unexpected error occurred';
//     }
//   }
// }
