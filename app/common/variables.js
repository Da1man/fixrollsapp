import { Dimensions } from 'react-native';

export const win = Dimensions.get('window')
export const w = win.width
export const h = win.height

export const THEME = {
  FONT_FAMILY: {
    REGULAR: 'Proxima Nova Regular',
    BOLD: 'Proxima Nova Bold',
    LIGHT: 'Proxima Nova Light',
  },
  FONT_SIZE: {
    TITLE: 24,
    DESCRIPTION: 18,
  },
}
