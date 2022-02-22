import React from 'react';
import Swiper from 'react-native-deck-swiper';
import CardMascota from './CardMascota';

const SwiperCard = ({navigation, onSwiped, codeindex, mascotasDisp, colors, props}) => {
  return (
    <Swiper
      cards={mascotasDisp}
      cardIndex={codeindex}
      renderCard={(card) => (
        <CardMascota mascota={card} navigation={navigation} {...props} />
      )}
      onSwiper={onSwiped}
      infinite
      backgroundColor="#FFFFFF"
      onTapCard={() => onSwiped()}
      marginTop={60}
      stackSize={10}
      stackScale={10}
      stackSeparation={14}
      animateOverlayLabelsOpacity
      animateCardOpacity
      disableTopSwipe
      disableBottomSwipe
      overlayLabels={{
        left: {
          title: 'NOPE',
          style: {
            label: {
              backgroundColor: colors.red,
              borderColor: colors.red,
              color: colors.red,
              borderWidth: 1,
              fontSize: 24
            },
            wrapper: {
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'flex-start',
              marginTop: 20,
              marginLeft: -20
            }
          }
        },
        right: {
          title: 'LIKE',
          style: {
            label: {
              backgroundColor: colors.blue,
              borderColor: colors.blue,
              color: colors.blue,
              borderWidth: 1,
              fontSize: 24
            },
            wrapper: {
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              marginTop: 20,
              marginLeft: 20
            }
          }
        }
      }}
    />
    );
  }
export default SwiperCard;