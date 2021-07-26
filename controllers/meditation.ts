import firestore from '@react-native-firebase/firestore';
import {Meditation, DBResult} from '../models';

const medRef = firestore().collection('meditations');

export async function getMeditation(
  zodiacId: string,
  feeling: string,
  date: string,
): Promise<DBResult<Meditation>> {
  try {
    const meditation = await medRef
      .doc(zodiacId.toLowerCase())
      .collection('meditation-items')
      .where('date', '==', date)
      .where('feeling', '==', feeling)
      .get();
    if (meditation.size === 0) throw 'No meditations found.';
    return {
      status: 'success',
      message: `Successfully returned meditation for zodiac sign ${zodiacId}`,
      data: meditation.docs[0].data() as Meditation,
    };
  } catch (e) {
    console.error(e);
    return {
      status: 'error',
      message: `Failed to get meditation for zodiac sign ${zodiacId}: ${e}`,
    };
  }
}
