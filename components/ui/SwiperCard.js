import React from 'react';
import Swiper from 'react-native-deck-swiper';
import CardMascota from './CardMascota';

const SwiperCard = ({
  navigation,
  onSwiped,
  codeindex,
  mascotasDisp,
  colors,
  props,
}) => {
  return (
    <Swiper
      cards={mascotasDisp}
      cardIndex={0}
      renderCard={(card) => (
        <CardMascota mascota={card} navigation={navigation} {...props} />
      )}
      keyExtractor={(card) => JSON.stringify(card.id)}
      onSwiper={onSwiped}
      //infinite
      backgroundColor="#FFFFFF"
      onTapCard={() => onSwiped()}
      marginTop={60}
      stackSize={10}
      stackScale={10}
      stackSeparation={14}
    />
  );
};
export default SwiperCard;
