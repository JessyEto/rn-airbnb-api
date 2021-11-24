import { Ionicons } from '@expo/vector-icons';

export default function ratingCalcul(num) {
  let result = '';

  for (let i = 0; i < Number(num); i++) {
    result = result + '★';
  }
  if (result.length < 5) {
    for (let j = 0; j < 5 - result.length; j++) {
      result = result + '☆';
    }
  }
  return result;
}
