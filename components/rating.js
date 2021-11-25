import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

export default function ratingCalcul(num) {
  let result = [];

  for (let i = 0; i < Number(num); i++) {
    result.push(<FontAwesome name="star" size={20} color="orange" key={i} />);
  }
  if (result.length < 5) {
    for (let j = 0; j < 5 - result.length; j++) {
      result.push(
        <FontAwesome name="star" size={20} color="grey" key={`j${j}`} />
      );
    }
  }
  return result;
}
