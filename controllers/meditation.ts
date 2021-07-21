import firestore from '@react-native-firebase/firestore';

const medRef = firestore().collection('meditations');

// export async function getMeditation(zodiacId: string): Promise<DBResult<User>> {
//     try {
//       const user = await usersRef.doc(userId).get();
//       return {
//         status: 'success',
//         message: `Successfully returned user with id ${user.id}`,
//         data: user.data() as User,
//       };
//     } catch (e) {
//       console.error(e);
//       return {
//         status: 'error',
//         message: `Failed to get user with id ${userId}: ${e}`,
//       };
//     }
//   }
