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
    TAGS: 18,
    DESCRIPTION: 18,
  },
  COLOR: {
    ACCENT: '#FB5520',
    GRAY_BACKGROUND: '#F6F7F7',
    WHITE_BACKGROUND: '#FCFCFD',
    GRAY: '#C1C2C2',
    GRAY_DARK: '#A4A4A5',
    BLACK: '#343535',
    WHITE: '#FCFCFD',
    RED_ICON: '#FC5B5B',
  },
  SETTINGS: {
    ACTIVE_OPACITY: 0.3,
  },
}
