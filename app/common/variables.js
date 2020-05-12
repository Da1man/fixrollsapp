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
    BUTTON_PLUS: 28,
    TITLE: 24,
    MAIN: 18,
    TAGS: 18,
    DESCRIPTION: 18,
    INFO: 16,
  },
  COLOR: {
    ACCENT: '#3D989D',
    // ACCENT: '#FB5520',
    // ACCENT: '#E4003D',
    GRAY_BACKGROUND: '#F6F7F7',
    WHITE_BACKGROUND: '#FCFCFD',
    GRAY: '#C1C2C2',
    GRAY_DARK: '#A4A4A5',
    GRAY_DISABLED: '#dbdbdc',
    BLACK: '#343535',
    WHITE: '#FCFCFD',
    RED_ICON: '#FC5B5B',
    GREEN_ICON: '#25D380',
  },
  SETTINGS: {
    ACTIVE_OPACITY: 0.3,
    MINIMAL_ORDER_PRICE_KIMRY: 500,
    MINIMAL_ORDER_PRICE_OTHER: 1000,
    LOADER_SIZE: 150,
  },
};
