import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {THEME, w} from '../common/variables';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFire} from '@fortawesome/pro-light-svg-icons';
import {faLeaf} from '@fortawesome/pro-light-svg-icons';
import {faPlusCircle} from '@fortawesome/pro-light-svg-icons';

export default class ProductItem extends PureComponent {
  render() {
    const {} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.imageSection} activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}>
          <Image style={styles.productImage}
                 source={{uri:'https://fixrolls.ru/wp-content/uploads/2019/10/Set-Love2-1-1-1.jpg'}}
                 resizeMode={'cover'}
          />
          <View style={styles.iconSection}>
            <TouchableOpacity style={styles.icon}>
              <FontAwesomeIcon icon={faFire} size={THEME.FONT_SIZE.TITLE} color={THEME.COLOR.RED_ICON}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesomeIcon icon={faLeaf} size={THEME.FONT_SIZE.TITLE} color={THEME.COLOR.GREEN_ICON}/>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Нежный угорь</Text>
        </View>
        <View style={styles.priceSection}>
          <View>
            <Text style={styles.priceText}>437 ₽</Text>
          </View>
          <TouchableOpacity>
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
  }
});
