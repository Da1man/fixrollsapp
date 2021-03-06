import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import {THEME, w} from '../common/variables';
import {connect} from 'react-redux';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMinus, faPlus} from '@fortawesome/pro-regular-svg-icons';
import {incCountCart, decCountCart} from '../redux/catalogReducer';

class CartProductItem extends PureComponent {
  render() {
    const {item, incCountCart, decCountCart} = this.props;

    const onDecCountHandler = (item) => {
      if (item.count === 1) {
        Alert.alert(
          'Удалить товар?',
          `Удалить ${item.name} из корзины?`,
          [
            {
              text: 'Отмена',
              onPress: () => console.log('Отмена удаления из корзины'),
              style: 'cancel',
            },
            {
              text: 'ОК', onPress: () => {
                decCountCart(item);
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        decCountCart(item);
      }
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
          style={styles.decSection}
          onPress={() => onDecCountHandler(item)}
        >
          <FontAwesomeIcon icon={faMinus} size={THEME.FONT_SIZE.TITLE} color={THEME.COLOR.WHITE}/>
        </TouchableOpacity>
        <View style={styles.contentSection}>
          <View style={styles.nameSection}>
            <Text style={styles.nameText}>{item.name}</Text>
          </View>
          <View style={styles.countSection}>
            <Text
              style={styles.countText}>{`${item.discountPrice ? item.discountPrice : item.price}x${item.count} ₽`}</Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
          style={styles.incSection}
          onPress={() => incCountCart(item)}
        >
          <FontAwesomeIcon icon={faPlus} size={THEME.FONT_SIZE.TITLE} color={THEME.COLOR.WHITE}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  decSection: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
  },
  contentSection: {
    width: w * 0.75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  nameSection: {},
  nameText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MAIN,
    color: THEME.COLOR.WHITE,
  },
  countSection: {},
  countText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MAIN,
    color: THEME.COLOR.WHITE,
  },
  incSection: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
  },
});

let mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {
  incCountCart,
  decCountCart,
})(CartProductItem);

