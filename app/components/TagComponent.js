import React, {PureComponent, Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {THEME} from '../common/variables';
import {connect} from 'react-redux';
import {selectTag, setIsFetching, setProducts} from '../redux/catalogReducer';
import {ApiConnect, fetchProductsFromApi} from '../common/WooCommerceApi';

class TagComponent extends Component {

  render() {
    const {id, name, slug, count, checked, selectTag, selectedTag} = this.props;

    const onPressHendler = (tagId) => {
      selectTag(tagId);
      fetchProductsFromApi(tagId);
    };

    return (
      <TouchableOpacity
        activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
        style={{...styles.tagItem, borderColor: selectedTag === id ? THEME.COLOR.GRAY : THEME.COLOR.ACCENT}}
        onPress={() => onPressHendler(id)}
      >
        <Text style={{
          ...styles.tagNameText,
          color: selectedTag === id ? THEME.COLOR.GRAY : THEME.COLOR.ACCENT,
        }}>{name}</Text>
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
  setIsFetching,
  setProducts,
})(TagComponent);

