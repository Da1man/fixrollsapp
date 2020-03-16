import React, {PureComponent, Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {THEME} from '../common/variables';
import {connect} from 'react-redux';
import {selectTag, setIsFetching} from '../redux/catalogReducer';
import {ApiConnect} from '../common/WooCommerceApi';

class TagComponent extends Component {

  fetchProductsByTag = (tagId) => {
    // setIsFetching(true);
    console.log(tagId.toString());
    ApiConnect.get(`products`, {
      per_page: 100,
      tag: tagId,
    })
      .then((response) => {
        console.log('products tag response',response)
        // let list = [];
        // response.map(product => list.push({
        //   id: product.id,
        //   name: product.name,
        //   price: product.regular_price,
        //   discountPrice: product.sale_price === '' ? null : product.sale_price,
        //   count: 1,
        //   image: product.images[0].src,
        //   isX2: product.attributes.length === 0 ? false : product.attributes[0].name === 'x2' ? true : false
        // }));
        //
        // this.props.setProducts(list);
        // this.props.setIsFetching(false);
        //console.log(this.props.products)
      });
  }

  render() {
    const {id, name, slug, count, checked,  selectTag, selectedTag} = this.props;
    const onPressHendler = (name, tagId) => {
      selectTag(name)
      this.fetchProductsByTag(tagId)
    }
    return (
      <TouchableOpacity
        activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
        style={{...styles.tagItem, borderColor: selectedTag === name ? THEME.COLOR.GRAY : THEME.COLOR.ACCENT}}
        onPress={() => onPressHendler(name, id)}
      >
        <Text style={{...styles.tagNameText, color: selectedTag === name ? THEME.COLOR.GRAY : THEME.COLOR.ACCENT}}>{name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  tagItem: {
    marginTop: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: THEME.COLOR.ACCENT,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  tagNameText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.TAGS,
    color: THEME.COLOR.ACCENT,
  },
});

let mapStateToProps = state => {
  return {
    tags: state.catalog.tags,
    selectedTag: state.catalog.selectedTag,
    isFetching: state.catalog.isFetching,
  };
};

export default connect(mapStateToProps, {
  selectTag,
}) (TagComponent);

