import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import {THEME, w} from '../common/variables';
import {connect} from 'react-redux';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFire} from '@fortawesome/pro-light-svg-icons';
import {faLeaf} from '@fortawesome/pro-light-svg-icons';
import {faPlusCircle} from '@fortawesome/pro-light-svg-icons';
import {toggleNeedClose, toggleNeedOpen} from '../redux/catalogReducer';

class ProductItem extends PureComponent {

  render() {
    const {
      item,
      addToCart,
      cartTotal,
      cartNeedOpen,
      cartNeedClose,
      toggleNeedOpen,
      toggleNeedClose,
      navigation,
    } = this.props;

    const addToCartHandler = () => {
      // Alert.alert(
      //   'Добавить в корзину?',
      //   'Добавить ролл Нежный угорь 1 шт. в корзину?',
      //   [
      //     {
      //       text: 'Отменить',
      //       onPress: () => console.log('Cancel Pressed'),
      //       style: 'cancel',
      //     },
      //     {text: 'Добавить', onPress: () => {
      //       addToCart(item)
      //         if (!cartTotal) {
      //           toggleNeedOpen()
      //         }
      //       }},
      //   ],
      //   {cancelable: false},
      // );
      addToCart(item)
      if (!cartTotal) {
        toggleNeedOpen()
      }
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.imageSection}
          activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
          onPress={() => navigation.navigate('Product')}
        >
          <Image style={styles.productImage}
                 source={{uri: item.image}}
                 resizeMode={'cover'}
          />
          <View style={styles.iconSection}>
            {item.isHot &&
            <TouchableOpacity style={styles.icon}>
              <FontAwesomeIcon icon={faFire} size={THEME.FONT_SIZE.TITLE} color={THEME.COLOR.RED_ICON}/>
            </TouchableOpacity>
            }
            {item.isVegetarian &&
            <TouchableOpacity style={styles.icon}>
              <FontAwesomeIcon icon={faLeaf} size={THEME.FONT_SIZE.TITLE} color={THEME.COLOR.GREEN_ICON}/>
            </TouchableOpacity>
            }
            {item.isX2 &&
            <TouchableOpacity style={styles.x2iconSection}>
              <Text style={styles.x2icon}>x2</Text>
            </TouchableOpacity>
            }

          </View>
        </TouchableOpacity>
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>{item.name}</Text>
        </View>
        <View style={styles.priceSection}>
          <View>
            <Text style={styles.priceText}>{item.price} ₽</Text>
          </View>
          <TouchableOpacity activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY} onPress={addToCartHandler}>
            <FontAwesomeIcon icon={faPlusCircle} size={THEME.FONT_SIZE.BUTTON_PLUS} color={THEME.COLOR.ACCENT}/>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLOR.WHITE_BACKGROUND,
    width: w * 0.46,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 6,
  },
  imageSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: w / 2.6,
    borderRadius: 20,
  },
  iconSection: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
  },
  x2iconSection: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
  },
  x2icon: {
    fontSize: THEME.FONT_SIZE.TITLE,
    color: THEME.COLOR.BLACK,
  },
  titleSection: {},
  titleText: {
    fontSize: THEME.FONT_SIZE.MAIN,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    color: THEME.COLOR.BLACK,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  priceText: {
    fontSize: THEME.FONT_SIZE.TITLE,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    color: THEME.COLOR.BLACK,
  },
});

let mapStateToProps = state => {
  return {
    cartNeedOpen: state.catalog.cartNeedOpen,
    cartNeedClose: state.catalog.cartNeedClose,
    cartTotal: state.catalog.cartTotal,
  };
};

export default connect(mapStateToProps, {
  toggleNeedOpen,
  toggleNeedClose,
}) (ProductItem);

